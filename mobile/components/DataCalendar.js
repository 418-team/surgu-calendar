import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Calendar, LocaleConfig} from "react-native-calendars";
import moment from "moment";

LocaleConfig.locales['ru'] = {
    monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthNamesShort: ['Янв','Фев','Март','Апр','Май','Июнь','Июль','Авг','Сент','Окт','Ноя','Дек'],
    dayNames: ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'],
    dayNamesShort: ['Пн','Вт','Ср','Чт','Пт','Сб','Вск'],
    today: 'Сегодня'
};
LocaleConfig.defaultLocale = 'ru';

const getColorByState = (state) => {
    if (state === 'disabled') return 'gray'
    else if (state === 'today') return 'rgba(100, 200, 200, 0.8)'
    return '#000000'
}

const CalendarHeader = (date) => {
    const month = moment(date).format('MMMM').replace(/(^|\s)\S/g, l => l.toUpperCase())
    const year = moment(date).format('YYYY')

    return (
        <View style={styles.calendarHeader}>
            <Text style={styles.calendarHeaderMonth}>
                {month}
            </Text>
            <Text style={styles.calendarHeaderYear}>
                {year}
            </Text>
        </View>
    )
}

export function DataCalendar({onPress, ...props}) {
    return (
        <Calendar
            style={styles.calendarView}
            enableSwipeMonths={true}
            dayComponent={({date, state}) => {
                return (
                    <TouchableOpacity onPress={() => onPress(date)}  style={styles.dayButton}>
                        <Text style={styles.dayText(state)}>
                            {date?.day}
                        </Text>
                    </TouchableOpacity>
                );
            }}
            renderHeader={CalendarHeader}
            theme={{
                arrowColor: '#000000',
            }}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    calendarHeader: {
        alignItems: 'center',
        marginBottom: 10
    },
    calendarHeaderMonth: {
        fontSize: 22
    },
    calendarHeaderYear: {
        fontSize: 16
    },
    calendarView: {
      padding: 15
    },
    dayButton: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 37,
        minHeight: 37,
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
        borderRadius: 60
    },
    dayText: (state) => ({
        fontSize: 18,
        color: getColorByState(state),
    })
})