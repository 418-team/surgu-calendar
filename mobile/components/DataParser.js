import React from "react";
import {View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import moment from "moment";

export function DataParser({data}) {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.eventContainer}>
            {Object.keys(data || {}).length > 0 ? Object.keys(data).map((event, id) =>
                <TouchableOpacity style={styles.eventView} key={id} onPress={() => navigation.navigate('EventScreen', {
                    id: data[event].id
                })}>
                    <View style={styles.eventInfo}>
                        <View>
                            <Text style={styles.eventTitle}>{data[event]?.title}</Text>
                            <Text style={styles.eventStartDate}>{moment(data[event]?.start_date).calendar()}</Text>
                        </View>
                        <Text style={styles.eventTimeLeft}>
                            {moment(data[event]?.start_date).isAfter(moment()) ?
                                'Начало ' +  moment(data[event]?.start_date).fromNow() :
                                'Конец ' +  moment(data[event]?.end_date).fromNow()
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
            ) : <Text style={styles.noEventsText}>Событий нет</Text>}
        </ScrollView>
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
    },
    noEventsText: {
        fontSize: 24,
        marginTop: 30
    }
})