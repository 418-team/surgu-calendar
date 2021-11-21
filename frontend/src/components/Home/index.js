import React, {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ruLocale from '@fullcalendar/core/locales/ru'
import moment from "moment";
import {useHistory} from "react-router-dom";

import {getEventByTimeseries} from "../../utils/api";

import './styles.css'

const getCalendarEvents = (dates) => {
    let calendarEvents = []

    Object.keys(dates || {}).forEach((event, id) => {
        if (dates[event].length > 0) {
            dates[event].forEach((eventItem) => {
                if (calendarEvents.filter(item => item?.title === eventItem?.title).length < 1)
                    calendarEvents.push({
                        id: eventItem.id,
                        title: eventItem.title,
                        start: eventItem.start_date,
                        end: eventItem.end_date
                    })
            })
        }
    })

    return calendarEvents
}

const Home = () => {
    const history = useHistory();
    const [events, setEvents] = useState(null);

    useEffect(() => {
        getEventByTimeseries(moment())
            .then(({data}) => {
                setEvents(data.data)
            })
            .catch((err) => {
                console.warn(err)
            })
    }, []);

    console.log(getCalendarEvents(events))

    return (
        <FullCalendar
            events={getCalendarEvents(events)}
            locale={ruLocale}
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            eventClick={(info) => {
                console.log('info', info)
                history.push(`/admin/${info.event.id}`)
            }}
        />
    )
}

export default Home