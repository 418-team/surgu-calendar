const SQL = `
    SELECT g.id,
           g.title,
           g.description,
           (
               SELECT coalesce(json_agg(u2), '[]'::json)
               FROM (SELECT u.id, u.first_name, u.last_name
                     FROM groups_users gu
                              JOIN users u on u.id = gu.user_id
                     WHERE gu.group_id = g.id) u2
           ) users
    FROM groups g
    WHERE id = $1
`;

const ERROR_404 = {
    statusCode: 404,
    error: 'not_found',
    message: 'Группа с таким ID не найдено'
};

async function handler(req, res) {
    const group = (await req.pg.query(SQL, [req.params.id])).rows[0];
    if (!group) return Promise.reject(ERROR_404);

    return Promise.resolve({statusCode: 200, group: {...group}});
}

const params = {
    schema: {
        tags: ['groups'],
        summary: 'Получить информацию о группе',
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
                    statusCode: {type: 'integer', example: 200},
                    group: {
                        type: 'object',
                        properties: {
                            id: {type: 'integer'},
                            title: {type: 'string'},
                            description: {type: 'string'},
                            users: {
                                type: 'array',
                                additionalProperties: {
                                    type: 'object',
                                    properties: {
                                        id: {type: 'integer'},
                                        first_name: {type: 'string'},
                                        last_name: {type: 'string'}
                                    }
                                }
                            }
                        }
                    }
                },
                example: {
                    'statusCode': 200,
                    'group': {
                        'id': 1,
                        'title': 'test',
                        'description': '',
                        'users': [
                            {
                                'id': 1,
                                'first_name': 'Администратор',
                                'last_name': ''
                            }
                        ]
                    }
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