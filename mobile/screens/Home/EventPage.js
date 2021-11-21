import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import moment from "moment";

import {getEventById} from "../../services/api";

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
            {event ? <SafeAreaView style={styles.eventContainer}>
                <Text style={styles.eventTitle}>{event.event?.title}</Text>
                <Text style={styles.eventDescription}>{event.event?.description}</Text>
                {event.event?.picture_img &&
                    <Image source={{uri: event.event?.picture_img}} style={{width: '100%', height: 300, objectFit: 'cover'}}/>}
                {eventContent?.map(renderBlock)}
                <Text>{moment(event.event?.start_date).fromNow()}</Text>
                <View style={styles.eventTags}>
                    {event?.tags?.map((tag) =>
                        <Text style={styles.eventTag} key={tag?.id}>{tag?.title}</Text>
                    )}
                </View>
            </SafeAreaView> : <ActivityIndicator size={25} />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    eventContainer: {
        padding: 10
    },
    eventTitle: {
        fontSize: 24
    },
    eventDescription: {
        fontSize: 18,
        marginBottom: 10
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