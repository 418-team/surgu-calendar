const ERROR_404 = (message) => ({
    statusCode: 404,
    error: 'not_found',
    message
});

async function handler(req, res) {
    const group = (await req.pg.query('SELECT * FROM groups WHERE id=$1', [req.params.id])).rows[0];
    if (!group) return Promise.reject(ERROR_404('Не найдена группа с таким ID'));

    const user = (await req.pg.query('SELECT * FROM users WHERE id=$1', [req.params.user_id])).rows[0];
    if (!user) return Promise.reject(ERROR_404('Не найден пользователь с таким ID'));

    await req.pg.query(
        'DELETE FROM groups_users WHERE group_id=$1 AND user_id=$2',
        [req.params.id, req.params.user_id]
    );

    return Promise.resolve({statusCode: 200});
}

const params = {
    schema: {
        tags: ['groups'],
        security: [{OAuth2: ['admin']}],
        summary: 'Удалить пользователя из группы',
        params: {
            type: 'object',
            required: ['id', 'user_id'],
            properties: {
                id: {type: 'integer'},
                user_id: {type: 'integer'}
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
                example: ERROR_404('Не найдена группа/пользователь с таким ID')
            }
        }
    }
};

module.exports = [params, handler];