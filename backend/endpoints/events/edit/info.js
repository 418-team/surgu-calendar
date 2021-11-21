const SQL = `
    SELECT e.id,
           e.title,
           e.description,
           e.start_date,
           e.end_date,
           e.picture_url,
           e.data,
           (SELECT coalesce(json_agg(t), '[]'::json)
            FROM events_tags et
                     JOIN tags t on t.id = et.tag_id
            WHERE et.event_id = e.id)           tags,

           (SELECT coalesce(json_agg(g2), '[]'::json)
            FROM (SELECT g.id, g.title
                  FROM events_groups eg
                           JOIN groups g on g.id = eg.group_id
                  WHERE eg.event_id = e.id) g2) "groups"
    FROM events e
    WHERE id = $1
`;

const ERROR_404 = {
    statusCode: 404,
    error: 'not_found',
    message: 'Мероприятие с таким ID не найдено'
};

async function handler(req, res) {
    const event = (await req.pg.query(SQL, [req.params.id])).rows[0];
    if (!event) return Promise.reject(ERROR_404);

    return Promise.resolve({statusCode: 200, event});
}

const params = {
    schema: {
        tags: ['events'],
        security: [{OAuth2: ['admin']}],
        summary: 'Получить информацию о событии',
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
                    event: {
                        type: 'object',
                        properties: {
                            id: {type: 'integer'},
                            title: {type: 'string'},
                            description: {type: 'string'},
                            start_date: {type: 'string'},
                            end_date: {type: 'string'},
                            picture_url: {type: 'string'},
                            groups: {
                                type: 'array',
                                additionalProperties: {
                                    type: 'object',
                                    properties: {
                                        id: {type: 'integer'},
                                        title: {type: 'string'}
                                    }
                                }
                            },
                            tags: {
                                type: 'array',
                                additionalProperties: {
                                    type: 'object',
                                    properties: {
                                        id: {type: 'integer'},
                                        title: {type: 'string'}
                                    }
                                }
                            },
                            data: {type: 'string'}
                        }
                    }
                },
                example: {
                    'statusCode': 200,
                    'event': {
                        'id': 1,
                        'title': 'test',
                        'description': 'test',
                        'start_date': '2021-11-20T09:23:01.323Z',
                        'end_date': '2021-11-20T09:23:01.323Z',
                        'picture_url': '',
                        'groups': [
                            {'id': 1, 'title': 'test'},
                            {'id': 2, 'title': 'test2'}
                        ],
                        'tags': [
                            {'id': 1, 'title': 'test'},
                            {'id': 2, 'title': 'test2'}
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