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
                            <View>
                                {data[event]?.tags.map((tag) =>
                                    <Text style={styles.eventTag}>{tag.title}</Text>
                                )}
                            </View>
                        </View>
                        <View>
                            <Text style={styles.eventTimeLeft}>
                                {moment(data[event]?.start_date).isAfter(moment()) ?
                                    'Начало ' +  moment(data[event]?.start_date).fromNow() :
                                    'Конец ' +  moment(data[event]?.end_date).fromNow()
                                }
                            </Text>
                        </View>
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
        fontWeight: 'bold',
        maxWidth: 130
    },
    eventView: {
        marginVertical: 10,
        width: '100%',
        paddingHorizontal: 10,
        minHeight: 80,
        justifyContent: 'center',
        borderBottomWidth: 1,
        paddingBottom: 5,
        borderBottomColor: '#000000'
    },
    eventInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
    },
    eventStartDate: {
        color: 'grey'
    },
    eventTimeLeft: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    eventTag: {
        color: '#ffffff',
        backgroundColor: '#000000',
        borderRadius: 20,
        textAlign: 'center',
        maxWidth: 110,
        alignItems: 'center',
        marginTop: 5
    },
    noEventsText: {
        fontSize: 24,
        marginTop: 30
    }
})