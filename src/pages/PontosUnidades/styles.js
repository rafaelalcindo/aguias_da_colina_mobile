import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated';
import { colors, metrics } from '../../styles'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    show_total_coin: {
        height: 140,
        backgroundColor: 'rgba(77, 77, 255, 0.9)',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },

    view_coins: {
        flex: 1,
        flexDirection: "row",
        top: 40,
        marginLeft: 20
    },

    view_image: {
        height: 40,
        width: 40
    },

    view_image_text: {
        fontSize: 20,
        fontWeight: "800",
        marginTop: 5,
        color: colors.white
    },

    grupo_lista: {
        flex: 1,
        padding: metrics.basePadding
    },

    view_ponto: {
        borderBottomColor: colors.darker,
        borderBottomWidth: 2,
        marginBottom: 10,
        padding: 10
    },

    show_ponto: {
        fontSize: 25,
        color: colors.success,
        marginBottom: 4
    },

    show_description: {
        fontSize: 17,
        color: colors.darkTransparent,
        marginBottom: 4
    },

    show_date_coin: {
        fontSize: 14,
        color: colors.darkTransparent,
        marginBottom: 4
    },
    icon_back: {
        marginTop: 5,
        marginRight: 10
    }
})

export default styles;
