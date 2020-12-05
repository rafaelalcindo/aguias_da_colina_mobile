import React from 'react';
import { StatusBar, View } from 'react-native'
import './src/config/ReactotronConfig'
import Routes from './src/routes'

export default function App() {
    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <Routes/>
        </>
    );
}