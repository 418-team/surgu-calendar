/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('users', {
        google_calendar_id: {type: 'string', notNull: false}
    });
};

exports.down = pgm => {
};
