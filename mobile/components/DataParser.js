import React from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";
import { useNavigation } from '@react-navigation/native';
import moment from "moment";

export function DataParser({data}) {
    const navigation = useNavigation();

    return (
        <View style={styles.eventContainer}>
            {data.map((event, id) =>
                <Pressable style={styles.eventView} key={id} onPress={() => navigation.navigate('EventScreen', {
                    event
                })}>
                    <Text style={styles.eventTitle}>{event?.name}</Text>
                    <View style={styles.eventDates}>
                        <Text>{moment(event?.start_date).format('l')}</Text>
                        <Text>{moment(event?.end_date).format('l')}</Text>
                    </View>
                    <View style={styles.eventTags}>
                        {event?.tags?.map((tag) =>
                            <Text style={styles.eventTag} key={tag?.id}>{tag?.title}</Text>
                        )}
                    </View>
                </Pressable>
            )}
        </View>
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