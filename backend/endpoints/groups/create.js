const SQL = `
    INSERT INTO groups (title, description, weight)
    VALUES ($1, $2, 1)
    RETURNING *
`;

async function handler(req, res) {
    const b = req.body;
    const result = (await req.pg.query(SQL, [b.title, b.description])).rows[0];

    console.log('result', result);

    return Promise.resolve({statusCode: 200, id: result.id});
}

const params = {
    schema: {
        tags: ['groups'],
        summary: 'Создать группу',
        body: {
            type: 'object',
            properties: {
                title: {type: 'string'},
                description: {type: 'string'}
            },
            example: {
                title: 'test',
                description: 'description test'
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