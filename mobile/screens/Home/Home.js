import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import { DataParser } from "../../components/DataParser";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import {DataCalendar} from "../../components/DataCalendar";
import {getEvents} from "../../services/api";
import {ActivityIndicator} from "react-native";

const data = [
    {
        "name": "SurCTF",
        "start_date": "2021-11-22T09:23:01.323Z",
        "end_date": "2021-11-23T09:23:01.323Z",
        "banner_img": "link s3",
        "tags": [
            {
                "id": 1,
                "title": "CTF"
            },
            {
                "id": 2,
                "title": "IT"
            }
        ],
        "participants": [],
        "template": [
            {
                "type": "header",
                "value": "SurCTF Впервые в Сургуте"
            },
            {
                "type": "label",
                "value": "Впервые в Сургуте пройдет огромный event!!!"
            },
            {
                "type": "image",
                "value": "link s3"
            },
            {
                "type": "text",
                "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum eget orci sit amet rhoncus. Vivamus vel neque eget quam rutrum varius sit amet vel libero. Mauris mattis semper ante, sit amet dignissim dolor viverra quis. Suspendisse consectetur congue rhoncus. Donec et nulla lectus. Mauris quam magna, pharetra sed turpis in, imperdiet viverra tortor. Sed id dolor felis. Suspendisse dui dui, mollis nec neque et, pellentesque sagittis felis. Nulla bibendum augue eu mi sodales faucibus a in elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur a dolor in ex porta rhoncus. Integer condimentum urna et tortor vestibulum elementum eget at tortor."
            },
            {
                "type": "label",
                "value": "Призы"
            },
            {
                "type": "text",
                "value" : "Mauris in fermentum magna. Duis pulvinar justo ac ultricies cursus. Ut eleifend mauris mi, ullamcorper laoreet tellus rhoncus eu. Suspendisse eu hendrerit lacus. Sed dignissim cursus turpis nec semper. Vivamus laoreet, ante eu finibus fermentum, ipsum diam dignissim felis, vitae aliquet mauris orci ut purus. Nullam vel tincidunt nibh."
            }
        ]
    }
]

export function HomeScreen({navigation}) {
    const [events, setEvents] = useState(null);
    const [currentDay, setCurrentDay] = useState(moment().format('dd-mm-yy'));

    useEffect(() => {
        getEvents()
            .then(({data}) => {
                console.log(data)
                setEvents(data?.rows)
            })
            .catch((err) => console.warn(err))
    }, [])

    return (
        <ScrollView>
            {events ? <SafeAreaView>
                <DataCalendar
                    onPress={(day) => setCurrentDay(day)}
                />
                {currentDay && <View style={styles.infoView}>
                    <Text style={styles.infoDateText}>Дата: {moment(currentDay?.dateString).format('l')}</Text>
                    <DataParser data={events}/>
                </View>}
            </SafeAreaView> : <ActivityIndicator />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    infoView: {
        marginTop: 15,
        marginLeft: 10
    },
    infoDateText: {
        fontSize: 24,
        fontWeight: '600'
    }
})