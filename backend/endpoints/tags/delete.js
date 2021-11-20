const ERROR_404 = {
    statusCode: 404,
    error: 'not_found',
    message: 'Тег с таким ID не найден'
};

async function handler(req, res) {
    const tag = (await req.pg.query('SELECT * FROM tags WHERE id=$1', [req.params.id])).rows[0];
    if (!tag) return Promise.reject(ERROR_404);

    await req.pg.query('DELETE FROM tags WHERE id=$1', [req.params.id]);
    return Promise.resolve({statusCode: 200});
}

const params = {
    schema: {
        tags: ['tags'],
        summary: 'Удалить тег',
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: {type: 'integer'}
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