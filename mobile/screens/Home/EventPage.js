import React, {useCallback, useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator,
    Pressable,
    Linking,
    Alert,
    Button
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import moment from "moment";
import {getEventById} from "../../services/api";

const createAndOpenISC = async (dates, summary, description) => {
    try {
        const test =`
        BEGIN:VCALENDAR
        CALSCALE:GREGORIAN
        METHOD:PUBLISH
        PRODID:-//418Team//EN
        VERSION:2.0
        BEGIN:VEVENT
        UID:test
        DTSTART;VALUE=DATE:${dates?.start}
        DTEND;VALUE=DATE:${dates?.end}
        SUMMARY:${summary}
        DESCRIPTION: ${description}
        END:VEVENT
        END:VCALENDAR
    `
        await Linking.openURL("content://data:text/calendar;charset=utf8," + escape(test))
    } catch (e) {
        console.warn(e)
    }
}

const SendIntentButton = ({ action, extras, children }) => {
    const handlePress = useCallback(async () => {
        try {
            await Linking.sendIntent(action, extras);
        } catch (e) {
            Alert.alert(e.message);
        }
    }, [action, extras]);

    return <Button title={children} onPress={handlePress} />;
};

const renderBlock = (block, key) => {
    let styles = {
        fontSize: 15
    };

    if (block?.type === "header") {
        styles.fontSize = 22
    } else if (block?.type === "label") {
        styles.fontSize = 18
    } else if (block?.type === "text") {
        styles.fontSize = 15
    }

    return block?.type !== 'image' ? <Text style={styles} key={key}>{block?.value}</Text> :
        <Image source={{uri: block?.value || ''}} />
}

export function EventPage({route, navigation}) {
    const { id } = route.params;
    const [event, setEvent] = useState(null);
    const [eventContent, setEventContent] = useState(null);

    useEffect(() => {
        getEventById(id)
            .then(({data}) => {
                console.log(data)
                setEvent(data)
                setEventContent(JSON.parse(data.event?.data || '[]'))
            })
            .catch((err) => console.warn(err))
    }, [id]);

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            {event ? <SafeAreaView>
                <Text>{event.event?.title}</Text>
                <Text>{event.event?.description}</Text>
                {event.event?.picture_img &&
                <Image source={{uri: event.event?.picture_img}} style={{width: '100%', height: 300, objectFit: 'cover'}}/>}
                {eventContent?.map(renderBlock)}

                <Text>{moment(event.event?.start_date).fromNow()}</Text>
                <View style={styles.eventTags}>
                    {event?.tags?.map((tag) =>
                        <Text style={styles.eventTag} key={tag?.id}>{tag?.title}</Text>
                    )}
                </View>
                <Pressable onPress={() => createAndOpenISC({start: event.event?.start_date, end: event.event?.end_date}, event.event?.title, event.event?.description)}>
                    <Text>Download</Text>
                </Pressable>
                <SendIntentButton action={'android.intent.action.INSERT'} extras={{'TITLE': 'TEST'}}>
                    <Text>Download</Text>
                </SendIntentButton>
            </SafeAreaView> : <ActivityIndicator />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    eventContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    eventTitle: {
        fontSize: 20
    },
    eventView: {
        marginVertical: 10,
        width: '50%'
    },
    eventDates: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    eventTags: {
        marginTop: 5,
        flexDirection: 'row',
    },
    eventTag: {
        backgroundColor: '#000000',
        color: '#ffffff',
        marginRight: 15,
        borderWidth: 1,
        borderRadius: 3,
        padding: 2,
        textAlign: 'center'
    }
})