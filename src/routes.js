import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './Home/index'
import Especialidade from './Especialidade/index'

const AppStack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator
                headerMode="none" 
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#f0f0f5'
                    }
                }}
            >
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Especialidade" component={Especialidade} />

            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;