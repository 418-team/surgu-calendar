import React from 'react';
import {FontAwesome} from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import moment from "moment";
import ruLocale from 'moment/locale/ru';

import Home from "./navigators/Home";

const Tab = createBottomTabNavigator();

export default function App() {
    moment.locale('ru', [ruLocale])
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{headerShown: false}}>
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarLabel: 'Календарь',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        color: '#000000'
                    },
                    tabBarIcon: (focused, color) =>
                        <FontAwesome name="calendar" size={24} color='#000000' />
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}