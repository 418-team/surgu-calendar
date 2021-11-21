const {createHash} = require('./security');
const logger = require('./logger');

const CREATE_ADMIN = `
    INSERT INTO users (id, first_name, last_name, email, password, scopes)
    VALUES (1, 'Администратор', '', $1, $2, $3)
`;

async function checkAdmin(query) {
    const user = (await query('SELECT email FROM users WHERE id=1')).rows[0];
    if (!user) {
        logger.warn('Аккаунт администратора отсутствует. Создаём новый...');
        const adminLogin = process.env.ADMIN_DEFAULT_EMAIL || 'admin@418team.com';
        const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'admin';
        await query(CREATE_ADMIN, [adminLogin, createHash(adminPassword), ['user', 'admin']]);
        logger.info(`Создан аккаунт администратора с почтой ${adminLogin}`);
    }
}

module.exports = checkAdmin;