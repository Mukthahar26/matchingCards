import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DifficultyMode, Levels, Game, Winner } from './features/screens'


const Stack = createStackNavigator();


export class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode="none">
                    <Stack.Screen name="DifficultyMode" component={DifficultyMode} />
                    <Stack.Screen name="levels" component={Levels} />
                    <Stack.Screen name="game" component={Game} />
                    <Stack.Screen name="winner" component={Winner} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default App
