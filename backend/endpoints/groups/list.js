const SQL = `
    SELECT id, title, description
    FROM groups
    ORDER BY id DESC
`;

async function handler(req, res) {
    const {rows} = await req.pg.query(SQL);
    return Promise.resolve({statusCode: 200, rows});
}

const params = {
    schema: {
        tags: ['groups'],
        summary: 'Получить список всех групп',
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
                                title: {type: 'string'},
                                description: {type: 'string'}
                            }
                        }
                    }
                },
                example: {
                    statusCode: 200,
                    rows: [
                        {
                            id: 1,
                            title: 'test',
                            description: '123123123'
                        }
                    ]
                }
            }
        }
    }
};

module.exports = [params, handler];