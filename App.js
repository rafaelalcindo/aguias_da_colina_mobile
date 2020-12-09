
import './src/config/ReactotronConfig'
import React, {Component} from 'react';
import { StatusBar, View } from 'react-native'

import Routes from './src/routes'

import { Provider } from 'react-redux'
import store from './src/store'

import { setNavigator  } from './src/services/navigation'

export default class App extends Component {
    render() {
        return (
            <Provider store={store} > 
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent
                />
                <Routes />
            </Provider>
        )
    }
}

// export default function App() {
//     return (
//         <>
//             <StatusBar
//                 barStyle="dark-content"
//                 backgroundColor="transparent"
//                 translucent
//             />
//             <Routes/>
//         </>
//     );
// }