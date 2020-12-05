import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated';
import { colors, metrics } from '../../styles'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.defaultColor,
        padding: metrics.basePadding * 2,
        justifyContent: 'center',
        alignItems: 'stretch'
    },

    viewImage: {
        justifyContent: 'center',
        alignItems: 'center' 
    },

    imageLogin: {
        height: 120,
        width: 120
    },

    title: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 24,
        fontWeight: 'bold'
    },

    text: {
        textAlign: 'center',
        marginTop: metrics.baseMargin,
        fontSize: 14,
        color: colors.light,
        lineHeight: 21
    },

    form: {
        marginTop: metrics.baseMargin * 2
    },

    input: {
        backgroundColor: colors.white,
        borderRadius: metrics.baseRadius,
        height: 44,
        paddingHorizontal: metrics.basePadding,
        marginBottom: 10
    },

    button: {
        backgroundColor: '#4dc3ff',
        borderRadius: metrics.baseRadius,
        height: 44,
        marginTop: metrics.baseMargin,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 14
    },

    error: {
        color: colors.danger,
        textAlign: 'center',
        marginTop: metrics.baseMargin
    }
})

export default styles;