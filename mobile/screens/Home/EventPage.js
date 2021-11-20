import React from "react";
import {View, Text, StyleSheet, Image, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import moment from "moment";

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
    const { event: eventData } = route.params;
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <SafeAreaView>
                {eventData?.banner_img &&
                    <Image source={{uri: eventData?.banner_img }} style={{width: '100%', height: 300, objectFit: 'cover'}} />}
                {eventData?.template?.map(renderBlock)}
                <View style={styles.eventDates}>
                    <Text>{moment(eventData?.start_date).format('l')}</Text>
                    <Text>{moment(eventData?.end_date).format('l')}</Text>
                </View>
                <Text>{moment(eventData?.start_date).fromNow()}</Text>
                <View style={styles.eventTags}>
                    {eventData?.tags?.map((tag) =>
                        <Text style={styles.eventTag} key={tag?.id}>{tag?.title}</Text>
                    )}
                </View>
            </SafeAreaView>
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