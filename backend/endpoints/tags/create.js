async function handler(req, res) {
    const result = (await req.pg.query('INSERT INTO tags (title) VALUES ($1) RETURNING id', [req.body.title])).rows[0];
    return Promise.resolve({statusCode: 200, id: result.id});
}

const params = {
    schema: {
        tags: ['tags'],
        security: [{OAuth2: ['admin']}],
        summary: 'Создать тег',
        body: {
            type: 'object',
            properties: {
                title: {type: 'string'}
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