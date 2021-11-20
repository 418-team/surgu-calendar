async function handler(req, res) {
    const q = req.query;

    const limit = parseInt(q.limit) || 500;
    const offset = parseInt(q.offset) || 0;

    const SQL = `
        SELECT ${q.preview ? 'id, first_name, last_name, patronymic' :
                'id, first_name, last_name, patronymic, email, phone, avatar_url, scopes'}
        FROM users
        ORDER BY id DESC

        LIMIT ${limit} OFFSET ${offset}
    `;

    const SQL_COUNT = 'SELECT count(1)::int FROM users';

    const {rows} = await req.pg.query(SQL);

    const total = (await (req.pg.query(SQL_COUNT))).rows[0].count;
    const count = rows.length;

    return Promise.resolve({statusCode: 200, limit, offset, total, count, rows});
}

const params = {
    schema: {
        tags: ['users'],
        summary: 'Список пользователей',
        security: [{OAuth2: ['user']}],
        query: {
            type: 'object',
            properties: {
                preview: {
                    type: 'integer',
                    description: '1 - возвращаются данные для предпросмотра (удобно для select`ов)'
                },
                limit: {
                    type: 'integer',
                    description: 'Лимит на количество возвращаемых значений (для пагинации)',
                    default: 5000
                },
                offset: {
                    type: 'integer',
                    description: 'Смещение (для пагинации)',
                    default: 0
                }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    statusCode: {type: 'integer'},
                    limit: {type: 'integer'},
                    offset: {type: 'integer'},
                    total: {type: 'integer'},
                    count: {type: 'integer'},
                    rows: {
                        type: 'array',
                        additionalProperties: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer'},
                                first_name: {type: 'string'},
                                last_name: {type: 'string'},
                                patronymic: {type: 'string'},
                                email: {type: 'string'},
                                phone: {type: 'string'},
                                avatar_url: {type: 'string'},
                                scopes: {type: 'array'}
                            }
                        }
                    }
                },
                example: {
                    statusCode: 200,
                    limit: 5000,
                    offset: 0,
                    total: 4,
                    count: 4,
                    rows: [
                        {
                            id: 4,
                            first_name: 'Антон',
                            last_name: 'Осипов',
                            patronymic: null,
                            email: 'spasibo@418team.com',
                            phone: null,
                            avatar_url: null,
                            scopes: ['admin']
                        }
                    ]
                }
            }
        }
    }
};

module.exports = [params, handler];