const crypto = require('crypto')
const jwt = require('jsonwebtoken');

function createHash(value) {
    return crypto
        .createHash('sha256')
        .update(value + process.env.CRYPTO_SALT)
        .digest('hex');
}

async function AuthCheck(request, reply) {
    const security = request.context?.schema?.security;
    if (!security || !security[0]?.OAuth2) return Promise.resolve();

    const scopes = security[0]?.OAuth2;
    console.log(1, scopes);

    if (!request.headers.authorization) {
        reply.status(403).send({statusCode: 403, error: 'access_denied', message: 'Необходима авторизация'});
    }

    const token = isCorrectJWT(request.headers.authorization.split(' ')[1] || ' ');
    if (!token || token.refresh) {
        reply.status(403).send({statusCode: 403, error: 'access_denied', message: 'Необходима авторизация'});
    }

    scopes.forEach(scope => {
        if (!token.scopes || token.scopes.filter((i) => i === scope).length === 0) {
            reply.status(403).send({
                statusCode: 403,
                error: 'not_enough_scopes',
                message: 'Для доступа к этому методу нужны отдельные права',
                scopes
            });
        }
    });

    request.jwt = token;
    request.jwt.isAdmin = token.scopes.includes('admin');
}

function isCorrectJWT(value) {
    try {
        return jwt.verify(value, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return false;
    }
}

module.exports = {createHash, AuthCheck, isCorrectJWT}