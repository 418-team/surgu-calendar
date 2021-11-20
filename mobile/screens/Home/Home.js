import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

import { DataParser } from "../../components/DataParser";
import {DataCalendar} from "../../components/DataCalendar";
import {getEvents} from "../../services/api";

export function HomeScreen() {
    const [events, setEvents] = useState(null);
    const [currentDay, setCurrentDay] = useState(moment().format('dd-mm-yy'));

    useEffect(() => {
        getEvents()
            .then(({data}) => {
                console.log(data)
                setEvents(data?.rows)
            })
            .catch((err) => console.warn(err))
    }, [currentDay])

    return (
        <ScrollView>
            {events ? <SafeAreaView>
                <DataCalendar
                    onPress={(day) => {
                        setCurrentDay(day)
                    }}
                />
                {currentDay && <View style={styles.infoView}>
                    <Text style={styles.infoDateText}>События ({moment(currentDay?.dateString).format('l')})</Text>
                    <DataParser data={events}/>
                </View>}
            </SafeAreaView> : <ActivityIndicator />}
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