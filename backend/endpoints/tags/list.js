async function handler(req, res) {
    const {rows} = await req.pg.query('SELECT id, title FROM tags ORDER BY id DESC');
    return Promise.resolve({statusCode: 200, rows});
}

const params = {
    schema: {
        tags: ['tags'],
        summary: 'Список тегов',
        response: {
            200: {
                type: 'object',
                properties: {
                    statusCode: {type: 'integer'},
                    rows: {
                        type: 'array',
                        additionalProperties: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer'},
                                title: {type: 'string'}
                            }
                        }
                    }
                },
                example: {
                    statusCode: 200,
                    rows: [{id: 1, title: 'tag1'}]
                }
            }
        }
    }
};

module.exports = [params, handler];