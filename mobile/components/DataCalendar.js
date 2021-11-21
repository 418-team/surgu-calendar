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


const getMarkedDates = (dates) => {
    let markedDates = {}
    Object.keys(dates || {}).forEach((event) => {
        if (dates[event].length > 0) {
            markedDates[event] = {marked: true}
        }
    })

    return markedDates
}

export function DataCalendar({data, onPress, ...props}) {
    return (
        <Calendar
            onDayPress={(day) => onPress(day)}
            style={styles.calendarView}
            enableSwipeMonths={true}
            markedDates={getMarkedDates(data)}
            headerStyle={{
                fontSize: 24
            }}
            theme={{
                arrowColor: '#000000',
                textDayFontSize: 18
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
    }
})