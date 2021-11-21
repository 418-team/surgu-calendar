import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {SafeAreaProvider} from "react-native-safe-area-context";
import moment from "moment";
import ruLocale from 'moment/locale/ru';

import Home from "./navigators/Home";
import Login from "./navigators/Login";

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