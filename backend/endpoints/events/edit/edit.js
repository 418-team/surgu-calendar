const format = require('pg-format');
const sqlArray = require('../../../utils/sqlArray');

const SQL = `
    UPDATE events
    SET title=$1,
        description=$2,
        start_date=$3,
        end_date=$4,
        picture_url=$5,
        data=$6
    WHERE id = $7
    RETURNING *
`;

const ERROR_404 = {
    statusCode: 404,
    error: 'not_found',
    message: 'Мероприятие с таким ID не найдено'
};

async function handler(req, res) {
    const b = req.body;

    const event = (await req.pg.query('SELECT * FROM events WHERE id=$1', [req.params.id])).rows[0];
    if (!event) return Promise.reject(ERROR_404);

    const result = (await req.pg.query(SQL, [
        b.title, b.description, b.start_date, b.end_date, b.picture_url, b.data, req.params.id
    ])).rows[0];

    await sqlArray(req, 'events_groups', 'event_id', 'group_id', result.id, b.groups);
    await sqlArray(req, 'events_tags', 'event_id', 'tag_id', result.id, b.tags);

    console.log('result', result);

    return Promise.resolve({statusCode: 200});
}

const params = {
    schema: {
        tags: ['events'],
        security: [{OAuth2: ['admin']}],
        summary: 'Редактировать событие',
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: {type: 'integer'}
            }
        },
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
                    statusCode: {type: 'integer', example: 200}
                }
            },
            404: {
                type: 'object',
                properties: {
                    statusCode: {type: 'integer'},
                    error: {type: 'string'},
                    message: {type: 'string'}
                },
                example: ERROR_404
            }
        }
    }
};

module.exports = [params, handler];