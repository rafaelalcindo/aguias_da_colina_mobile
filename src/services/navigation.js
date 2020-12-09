import { CommonActions  } from '@react-navigation/native';
// import { NavigationAction } from '@react-navigation/native'

let navigator;

export function setNavigator(ref) {
    navigator = ref
}

export function navigate(routeName, params) {
    navigator.dispatch(
        CommonActions.navigate({
            name: routeName,
            params
        })
    )
}

// import * as React from 'react';

// export const navigationRef = React.createRef();

// export function navigate(name, params) {
//   navigationRef.current?.navigate(name, params);
// }
