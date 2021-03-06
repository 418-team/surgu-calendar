const format = require('pg-format');
const sqlArray = require('../../utils/sqlArray');
const {syncGoogleCalendar} = require('../../utils/google');

const SQL = `
    INSERT INTO events (title, description, start_date, end_date, picture_url, data)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
`;

async function handler(req, res) {
    const b = req.body;

    const result = (await req.pg.query(SQL, [
        b.title, b.description, b.start_date, b.end_date, b.picture_url, b.data
    ])).rows[0];

    await sqlArray(req, 'events_groups', 'event_id', 'group_id', result.id, b.groups);
    await sqlArray(req, 'events_tags', 'event_id', 'tag_id', result.id, b.tags);

    const usersToUpdate = (await req.pg.query(`
        SELECT u.id, u.google_calendar_id
        FROM events_groups eg
                 JOIN groups_users gu on eg.group_id = gu.group_id
                 JOIN users u on u.id = gu.user_id
        WHERE eg.event_id = $1
          AND u.google_calendar_id IS NOT NULL
        GROUP BY u.id
    `, [result.id])).rows;

    usersToUpdate.map(async (user) => {
        await syncGoogleCalendar(req, user.google_calendar_id, {name: 'user_full', userId: user.id});
    });

    console.log('result', result);

    return Promise.resolve({statusCode: 200, id: result.id});
}

const params = {
    schema: {
        tags: ['events'],
        security: [{OAuth2: ['admin']}],
        summary: 'Создать событие',
        body: {
            type: 'object',
            properties: {
                title: {type: 'string'},
                description: {type: 'string'},
                start_date: {type: 'string'},
                end_date: {type: 'string'},
                picture_url: {type: 'string'},
                groups: {type: 'array'},
                tags: {type: 'array'},
                data: {type: 'string'}
            },
            example: {
                title: 'test',
                description: 'test',
                start_date: '2021-11-20T09:23:01.323Z',
                end_date: '2021-11-20T09:23:01.323Z',
                picture_url: '',
                groups: [1],
                tags: [1],
                data: 'JSON CONTENT'
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    statusCode: {type: 'integer', example: 200},
                    id: {type: 'integer', example: 1}
                }
            }
        }
    }
};

module.exports = [params, handler];