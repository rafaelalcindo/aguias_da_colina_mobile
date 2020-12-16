import { CommonActions  } from '@react-navigation/native';

let navigator;

export function setNavigator(ref) {
    navigator = ref
}

export function navigate(routeName, params) {
    console.log(navigator)
    navigator.dispatch(
        CommonActions.navigate({
            name: routeName,
            params
        })
    )
}
