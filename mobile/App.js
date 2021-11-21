import React from 'react';
import {FontAwesome} from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import moment from "moment";
import ruLocale from 'moment/locale/ru';

import Home from "./navigators/Home";
import Login from "./navigators/Login";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";

const Stack = createNativeStackNavigator();

export default function App() {
    moment.updateLocale('ru', [ruLocale])

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                    <Stack.Navigator screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Login" component={Login} />
                    </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}