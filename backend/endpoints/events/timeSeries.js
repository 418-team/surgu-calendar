const TIMESERIES_SQL = `
    SELECT TO_CHAR(x, 'YYYY-MM-DD') "date",
           (SELECT coalesce(json_agg(agg), '[]'::json) "events"
            FROM (SELECT e.id,
                         e.title,
                         e.start_date,
                         e.end_date,
                         (SELECT coalesce(json_agg(t), '[]'::json)
                          FROM events_tags et
                                   JOIN tags t on t.id = et.tag_id
                          WHERE et.event_id = e.id) tags
                  FROM events e
                  WHERE x::date >= e.start_date::date
                    AND x::date <= e.end_date::date) agg)
    FROM generate_series(date_trunc('month', $1::date), date_trunc('month', $1::date) + '1 month'::interval,
                         '1 day'::interval) t(x)
`;

const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
};

async function handler(req, res) {
    let date = isValidDate(new Date(req.query.date)) ? new Date(req.query.date) : new Date();
    const {rows} = await req.pg.query(TIMESERIES_SQL, [date]);

    const data = rows.reduce((accumulator, currentValue) => {
        accumulator[currentValue.date] = currentValue.events;
        return accumulator;
    }, {});

    console.log(data);
    return Promise.resolve({statusCode: 200, data});
}

const params = {
    schema: {
        tags: ['events'],
        summary: 'Получить список событий с группировкой по дням (TimeSeries)',
        query: {
            type: 'object',
            properties: {
                date: {type: 'string'}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    statusCode: {type: 'integer'},
                    data: {
                        type: 'object',
                        additionalProperties: {
                            type: 'array',
                            additionalProperties: {
                                type: 'object',
                                properties: {
                                    id: {type: 'integer'},
                                    title: {type: 'string'},
                                    start_date: {type: 'string'},
                                    end_date: {type: 'string'},
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
                    }
                },
                example: {
                    'statusCode': 200,
                    'data': {
                        '2021-11-01': [],
                        '2021-11-02': [
                            {
                                'id': 5,
                                'title': 'test',
                                'start_date': '2021-11-02T19:00:00+00:00',
                                'end_date': '2021-11-25T19:00:00+00:00',
                                'tags': [
                                    {
                                        'id': 3,
                                        'title': 'Задание'
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        }
    }
};

module.exports = [params, handler];