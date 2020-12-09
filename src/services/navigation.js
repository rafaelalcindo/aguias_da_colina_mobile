import { NavigationAction } from '@react-navigation/native'

let navigator;

export function setNavigator(ref) {
    navigator = ref
}

export function navigate(routeName, params) {
    navigator.dispatch(
        NavigationAction.navigate({
            routeName,
            params
        })
    )
}