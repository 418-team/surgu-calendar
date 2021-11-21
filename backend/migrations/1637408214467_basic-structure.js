/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        id: {type: 'id'},
        first_name: {type: 'varchar(32)', notNull: true},
        last_name: {type: 'varchar(64)', notNull: true},
        patronymic: {type: 'varchar(64)', notNull: false},
        email: {type: 'varchar(64)', notNull: true},
        phone: {type: 'varchar(64)', notNull: false},
        password: {type: 'text', notNull: true},
        avatar_url: {type: 'text', notNull: false},
        scopes: {type: 'text[]', default: '{}'}
    });

    pgm.createIndex('users', 'id', {unique: true});
    pgm.createIndex('users', 'email', {unique: true});

    pgm.createTable('groups', {
        id: {type: 'id'},
        title: {type: 'varchar(64)', notNull: true},
        description: {type: 'string', notNull: false},
        weight: {type: 'smallint', notNull: true, default: 1}
    });

    pgm.createTable('groups_users', {
        group_id: {
            type: 'integer',
            references: '"groups"',
            onDelete: 'cascade',
            notNull: true
        },
        user_id: {
            type: 'integer',
            references: '"users"',
            onDelete: 'cascade',
            notNull: true
        }
    });

    pgm.addConstraint(
        'groups_users',
        'groups_users_pk',
        {primaryKey: ['group_id', 'user_id']}
    );

    pgm.createIndex('groups_users', 'group_id');
    pgm.createIndex('groups_users', 'user_id');

    pgm.createTable('tags', {
        id: {type: 'id'},
        title: {type: 'varchar(128)'}
    });

    pgm.createIndex('tags', 'id');

    pgm.createTable('events', {
        id: {type: 'id'},
        title: {type: 'text', notNull: true},
        description: {type: 'text', notNull: true},
        start_date: {type: 'timestamptz'},
        end_date: {type: 'timestamptz'},
        picture_url: {type: 'text'},
        data: {type: 'text'}
    });

    pgm.createTable('events_groups', {
        event_id: {
            type: 'integer',
            references: '"events"',
            onDelete: 'cascade',
            notNull: true
        },
        group_id: {
            type: 'integer',
            references: '"groups"',
            onDelete: 'cascade',
            notNull: true
        }
    });

    pgm.addConstraint(
        'events_groups',
        'events_groups_pk',
        {primaryKey: ['event_id', 'group_id']}
    );

    pgm.createIndex('events_groups', 'event_id');
    pgm.createIndex('events_groups', 'group_id');

    pgm.createTable('events_tags', {
        event_id: {
            type: 'integer',
            references: '"events"',
            onDelete: 'cascade',
            notNull: true
        },
        tag_id: {
            type: 'integer',
            references: '"tags"',
            onDelete: 'cascade',
            notNull: true
        }
    });

    pgm.addConstraint(
        'events_tags',
        'events_tags_pk',
        {primaryKey: ['event_id', 'tag_id']}
    );

    pgm.createIndex('events_tags', 'event_id');
    pgm.createIndex('events_tags', 'tag_id');

    pgm.createTable('events_owners', {
        event_id: {
            type: 'integer',
            references: '"events"',
            onDelete: 'cascade',
            notNull: true
        },
        user_id: {
            type: 'integer',
            references: '"users"',
            onDelete: 'cascade',
            notNull: true
        }
    });

    pgm.addConstraint(
        'events_owners',
        'events_owners_pk',
        {primaryKey: ['event_id', 'user_id']}
    );

    pgm.createIndex('events_owners', 'event_id');
    pgm.createIndex('events_owners', 'user_id');
};

exports.down = pgm => {
};
