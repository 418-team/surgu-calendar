import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {LoginScreen} from "../screens/Login/Login";

const Stack = createNativeStackNavigator();

export default function Login() {
    return (
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    )
}