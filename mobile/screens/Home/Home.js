import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

import { DataParser } from "../../components/DataParser";
import {DataCalendar} from "../../components/DataCalendar";
import {getEventByTime} from "../../services/api";
import {getDataFromStorage} from "../../services/storage";

export function HomeScreen({navigation}) {
    const [events, setEvents] = useState(null);
    const [currentDay, setCurrentDay] = useState(moment().format('yy-mm-dd'));
    const [currentMonth, setCurrentMonth] = useState(null);

    useEffect(() => {
        const checkDataInStorage = async () => {
            if (!await getDataFromStorage('access_token') || !await getDataFromStorage('refresh_token')) {
                navigation.navigate('Login')
            }
        }

        checkDataInStorage()
    }, [])

    useEffect(() => {
        getEventByTime(currentDay)
            .then(({data}) => {
                console.log(data)
                setEvents(data?.data)
            })
            .catch((err) => console.warn(err))
    }, [currentMonth])

    return (
        <ScrollView>
            {events ? <SafeAreaView>
                <DataCalendar
                    data={events}
                    onMonthChange={(month) => setCurrentMonth(month)}
                    onPress={(day) => {
                        setCurrentDay(day)
                    }}
                />
                {currentDay && <View style={styles.infoView}>
                    <Text style={styles.infoDateText}>События ({moment(currentDay?.dateString).format('l')})</Text>
                    <DataParser data={events[currentDay.dateString]}/>
                </View>}
            </SafeAreaView> : <ActivityIndicator size={25} />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    infoView: {
        marginTop: 20,
        marginLeft: 10,
        paddingHorizontal: 10
    },
    infoDateText: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})