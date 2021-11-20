module.exports = async (req, tableName, column1, column2, value1, arr) => {
    if (arr && arr.length > 0) {
        await (req.pg.query(`
                    DELETE
                    FROM ${tableName}
                    WHERE ${column1} = $1`,
            [value1]
        ));

        const SQL = `
            INSERT INTO ${tableName} (${column1}, ${column2})
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING
        `;

        arr.map(async (id) => {
            await req.pg.query(SQL, [value1, id]);
        });
    }
};