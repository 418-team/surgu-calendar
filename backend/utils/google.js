const fs = require('fs');
const {google} = require('googleapis');

const KEYFILE = '/googlekey.json'; // path to JSON with private key been downloaded from Google

const SCOPE_CALENDAR = 'https://www.googleapis.com/auth/calendar'; // authorization scopes
const SCOPE_EVENTS = 'https://www.googleapis.com/auth/calendar.events';

// surent@team-418.iam.gserviceaccount.com
// 9j7f353ron36pmjrbvovmqgans@group.calendar.google.com

async function readPrivateKey() {
    const content = fs.readFileSync(KEYFILE);
    return JSON.parse(content.toString());
}

async function authenticate(key) {
    const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        [SCOPE_CALENDAR, SCOPE_EVENTS]
    );
    await jwtClient.authorize();
    return jwtClient;
}

async function createEvent(auth, calendarId, eventId, data) {
    const resource = {
        'summary': data.title,
        'id': eventId,
        'description': data.description,
        'start': {
            'dateTime': data.start_date
        },
        'end': {
            'dateTime': data.end_date
        }
    };

    let calendar = google.calendar('v3');

    try {
        const r = await calendar.events.update({auth, calendarId, eventId, resource});
        console.log('update', r);
    } catch (e) {
        const r = await calendar.events.insert({auth, calendarId, eventId, resource});
        console.log(r);
    }
}

async function syncGoogleCalendar(req, calendarId, syncFormat) {
    const events = syncFormat.name === 'user_full' ? (await req.pg.query(`
        SELECT e.id, e.title, e.description, e.start_date, e.end_date
        FROM groups_users gu
                 FULL JOIN groups g on g.id = gu.group_id
                 FULL JOIN events_groups eg on g.id = eg.group_id
                 FULL JOIN events e on e.id = eg.event_id
        WHERE gu.user_id = $1`, [syncFormat.userId])).rows : [];

    try {
        const key = await readPrivateKey();
        const auth = await authenticate(key);

        events.map(async (item) => {
            const eventId = '418aaaa0000' + item.id;
            console.log('DATA', item);
            try {
                await createEvent(auth, calendarId, eventId, item);
            } catch (e) {
                console.error(e);
            }
        });
    } catch (e) {
        console.log('Error: ' + e);
    }
}

async function checkCalendarAccess(calendarId) {
    try {
        const key = await readPrivateKey();
        const auth = await authenticate(key);

        let calendar = google.calendar('v3');

        const event = {
            'summary': 'access-check',
            'description': 'access check',
            'start': {
                'dateTime': '2015-11-22T07:00:00+00:00'
            },
            'end': {
                'dateTime': '2015-11-24T07:00:00+00:00'
            }
        };

        console.log(event);

        const r = await calendar.events.insert({
            auth,
            calendarId,
            resource: event
        });

        console.log(r);
        return Promise.resolve({status: true});
    } catch (e) {
        console.log('Error: ' + e);
        return Promise.resolve({status: false});
    }
}

module.exports = {syncGoogleCalendar, checkCalendarAccess};