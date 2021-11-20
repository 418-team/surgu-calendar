const SQL = `
    UPDATE groups
    SET title=$1,
        description=$2
    WHERE id = $3
`;

const ERROR_404 = {
    statusCode: 404,
    error: 'not_found',
    message: 'Мероприятие с таким ID не найдено'
};

async function handler(req, res) {
    const b = req.body;

    const group = (await req.pg.query('SELECT * FROM groups WHERE id=$1', [req.params.id])).rows[0];
    if (!group) return Promise.reject(ERROR_404);

    const result = (await req.pg.query(SQL, [b.title, b.description, req.params.id])).rows[0];
    console.log('result', result);

    return Promise.resolve({statusCode: 200});
}

const params = {
    schema: {
        tags: ['groups'],
        security: [{OAuth2: ['admin']}],
        summary: 'Редактировать группу',
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
                description: {type: 'string'}
            },
            example: {
                title: 'test',
                description: 'test'
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