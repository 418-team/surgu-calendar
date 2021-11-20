const {createHash, createSession} = require('../../utils/security');

const INCORRECT_CREDS_ERROR = {
    statusCode: 403,
    message: 'Неверный логин или пароль',
    error: 'incorrect_login_or_password'
};

async function handler(req, res) {
    const user = (await req.pg.query(
        'SELECT id, first_name, last_name, patronymic, email, phone, avatar_url, scopes FROM users WHERE email = $1 AND password = $2',
        [req.body.username, createHash(req.body.password)]
    )).rows[0];

    console.log(user);

    if (!user) await Promise.reject(INCORRECT_CREDS_ERROR);

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
        summary: 'Авторизация',
        body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username: {type: 'string'},
                password: {type: 'string'}
            }
        },
        response: {
            200: {
                type: 'object',
                description: 'Успешная авторизация',
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
            403: {
                type: 'object',
                description: 'Неверный логин или пароль',
                properties: {
                    statusCode: {type: 'integer'},
                    message: {type: 'string'},
                    error: {type: 'string'}
                },
                example: INCORRECT_CREDS_ERROR
            }
        }
    }
};

module.exports = [params, handler];