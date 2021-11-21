const {checkCalendarAccess, syncGoogleCalendar} = require('../../utils/google');

async function handler(req, res) {
    const result = await checkCalendarAccess(req.body.calendar_id);
    const userId = req.params.id;
    console.log(result);

    if (result.status) {
        await req.pg.query('UPDATE users SET google_calendar_id=$1 WHERE id=$2', [req.body.calendar_id, userId]);

        await syncGoogleCalendar(req, req.body.calendar_id, {name: 'user_full', userId});

        return Promise.resolve({statusCode: 200});
    } else {
        return Promise.reject({
            statusCode: 400,
            error: 'google_error',
            message: 'Не удалось получить доступ к календарю. Убедитесь, что вы выдали доступ'
        });
    }
}

const params = {
    schema: {
        tags: ['users'],
        summary: 'Прикрепить Google календарь к пользователю',
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: {type: 'integer'}
            }
        },
        body: {
            type: 'object',
            required: ['calendar_id'],
            properties: {
                calendar_id: {type: 'string'}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    statusCode: {type: 'integer', example: 200}
                }
            },
            400: {
                type: 'object',
                properties: {
                    statusCode: {type: 'integer', example: 400},
                    error: {type: 'string', example: 'google_error'},
                    message: {
                        type: 'string',
                        example: 'Не удалось получить доступ к календарю. Убедитесь, что вы выдали доступ'
                    }
                }
            }
        }
    }
};

module.exports = [params, handler];