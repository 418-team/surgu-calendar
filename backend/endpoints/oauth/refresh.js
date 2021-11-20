const {createSession, isCorrectJWT} = require('../../utils/security');

const INCORRECT_SESSION_ERROR = {
    statusCode: 403,
    message: 'Недействительная сессия',
    error: 'incorrect_session'
};

async function handler(req, res) {
    const jwt = isCorrectJWT(req.body.refresh_token);
    if (!jwt || !jwt.refresh) {
        res.status(401).send(INCORRECT_SESSION_ERROR);
        return;
    }

    const user = (await req.pg.query(
        'SELECT id, first_name, last_name, patronymic, email, phone, avatar_url, scopes FROM users WHERE id = $1',
        [jwt.uid]
    )).rows[0];

    console.log(user);

    if (!user) await Promise.reject(INCORRECT_SESSION_ERROR);

    const {accessToken, refreshToken} = createSession(user);
    return Promise.resolve({
        statusCode: 200,
        access_token: accessToken,
        refresh_token: refreshToken,
        token_type: 'bearer',
        expires_in: 300,
        user
    });
}

const params = {
    schema: {
        tags: ['oauth'],
        summary: 'Refresh Token',
        body: {
            type: 'object',
            required: ['refresh_token'],
            properties: {
                refresh_token: {type: 'string'}
            }
        },
        response: {
            200: {
                type: 'object',
                description: 'Токен успешно обновлен',
                properties: {
                    access_token: {type: 'string'},
                    refresh_token: {type: 'string'},
                    token_type: {type: 'string'},
                    expires_in: {type: 'integer'},
                    user: {
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
            401: {
                type: 'object',
                description: 'Недействительный JWT Refresh Token или сессия',
                properties: {
                    statusCode: {type: 'integer'},
                    error: {type: 'string'},
                    message: {type: 'string'}
                },
                example: INCORRECT_SESSION_ERROR
            }
        }
    }
};

module.exports = [params, handler];