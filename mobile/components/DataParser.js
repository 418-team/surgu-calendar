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
                    id: event.id
                })}>
                    <View style={styles.eventInfo}>
                        <View>
                            <Text style={styles.eventTitle}>{event?.title}</Text>
                            <Text style={styles.eventStartDate}>{moment(event?.start_date).calendar()}</Text>
                        </View>
                        <Text style={styles.eventTimeLeft}>{moment(event?.start_date).fromNow()}</Text>
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
        fontSize: 20,
        fontWeight: 'bold'
    },
    eventView: {
        marginVertical: 10,
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        minHeight: 80,
        justifyContent: 'center'
    },
    eventInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    eventStartDate: {
        color: 'grey'
    },
    eventTimeLeft: {
        fontSize: 15,
        fontWeight: 'bold'
    }
})