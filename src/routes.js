import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './pages/Login'
import Home from './Home/index'
import Especialidade from './Especialidade/index'
import PontosIndividuais from './pages/PontosIndividuais'
import PontosUnidades from './pages/PontosUnidades'

import AsyncStorage from '@react-native-community/async-storage'

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
                initialRouteName="Home"
            >
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Especialidade" component={Especialidade} />
                <AppStack.Screen name="PontosIndividuais" component={PontosIndividuais} />
                <AppStack.Screen name="PontosUnidades" component={PontosUnidades} />

            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
