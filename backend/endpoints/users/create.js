const {createHash, createSession} = require('../../utils/security');
const ERROR_EMAIL_EXISTS = {
    statusCode: 400,
    error: 'email_exists',
    message: 'Пользователь с таким Email уже существует'
};

const SQL = `
    INSERT INTO users (first_name, last_name, patronymic, email, phone, password, avatar_url, scopes)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
`;

async function handler(req, res) {
    const b = req.body;

    const exists = (await req.pg.query('SELECT id FROM users WHERE email=$1', [b.email])).rows[0];
    if (exists) return Promise.reject(ERROR_EMAIL_EXISTS);

    const user = (await req.pg.query(SQL, [
        b.first_name, b.last_name, b.patronymic, b.email, b.phone, createHash(b.password), b.avatar_url,
        b.is_admin ? ['user', 'admin'] : ['user']
    ])).rows[0];

    console.log(user);

    return Promise.resolve({
        statusCode: 200,
        user
    });
}

const params = {
    schema: {
        tags: ['users'],
        security: [{OAuth2: ['admin']}],
        summary: 'Регистрация пользователя',
        body: {
            type: 'object',
            properties: {
                first_name: {type: 'string'},
                last_name: {type: 'string'},
                patronymic: {type: 'string'},
                email: {type: 'string'},
                phone: {type: 'string'},
                password: {type: 'string'},
                avatar_url: {type: 'string'},
                is_admin: {type: 'integer'}
            }
        },
        response: {
            200: {
                type: 'object',
                description: 'Успешная регистрация',
                properties: {
                    statusCode: {type: 'integer'},
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
            400: {
                type: 'object',
                properties: {
                    statusCode: {type: 'integer'},
                    error: {type: 'string'},
                    message: {type: 'string'}
                },
                example: ERROR_EMAIL_EXISTS
            }
        }
    }
};

module.exports = [params, handler];