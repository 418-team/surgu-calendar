import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {HomeScreen} from "../screens/Home/Home";
import { EventPage } from "../screens/Home/EventPage";

const Stack = createStackNavigator();

export default function Home() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="EventScreen" component={EventPage} />
        </Stack.Navigator>
    )
}