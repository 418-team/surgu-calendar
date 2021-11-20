import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {HomeScreen} from "../screens/Home/Home";
import { EventPage } from "../screens/Home/EventPage";

const Stack = createNativeStackNavigator();

export default function Home() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="EventScreen" component={EventPage} />
        </Stack.Navigator>
    )
}