import React from "react";
import {Calendar, LocaleConfig} from "react-native-calendars";
import {Text, TouchableOpacity} from "react-native";

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
    else if (state === 'today') return 'aqua'
    return 'black'
}

export function DataCalendar({onPress}) {
    return (
        <Calendar
            dayComponent={({date, state}) => {
                return (
                    <TouchableOpacity onPress={onPress}>
                        <Text style={{fontSize: 24, textAlign: 'center', color: getColorByState(state)}}>
                            {date.day}
                        </Text>
                    </TouchableOpacity>
                );
            }}
            theme={{
                arrowColor: '#000000',
            }}
        />
    )
}