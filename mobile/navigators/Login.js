import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {LoginScreen} from "../screens/Login/Login";

const Stack = createStackNavigator();

export default function Login() {
    return (
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    )
}