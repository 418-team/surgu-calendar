const SQL = `
    SELECT e.id,
           e.title,
           e.description,
           e.start_date,
           e.end_date,
           e.picture_url,

           (SELECT json_agg(t)
            FROM events_tags et
                     JOIN tags t on t.id = et.tag_id
            WHERE et.event_id = e.id)           tags,

           (SELECT json_agg(g2)
            FROM (SELECT g.id, g.title
                  FROM events_groups eg
                           JOIN groups g on g.id = eg.group_id
                  WHERE eg.event_id = e.id) g2) "groups"

    FROM events e
    ORDER BY id DESC
`;

async function handler(req, res) {
    const {rows} = await req.pg.query(SQL);
    return Promise.resolve({statusCode: 200, rows});
}

const params = {
    schema: {
        tags: ['events'],
        summary: 'Получить список всех событий',
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
                                }
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
                            description: 'test',
                            start_date: '2021-11-20T09:23:01.323Z',
                            end_date: '2021-11-20T09:23:01.323Z',
                            picture_url: 'https://cdn.418.one/123123',
                            groups: [
                                {'id': 1, 'title': 'test'},
                                {'id': 2, 'title': 'test2'}
                            ],
                            tags: [
                                {'id': 1, 'title': 'test'},
                                {'id': 2, 'title': 'test2'}
                            ]
                        }
                    ]
                }
            }
        }
    }
};

module.exports = [params, handler];