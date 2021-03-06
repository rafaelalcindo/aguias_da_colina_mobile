import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated';
import { colors, metrics } from '../../styles'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    title_bar: {
        fontSize: 20,
        color: colors.white,
        fontWeight: '700',
        marginTop: 5
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

    view_add_event: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    view_image: {
        height: 40,
        width: 40
    },

    input: {
        backgroundColor: colors.light,
        borderRadius: metrics.baseRadius,
        height: 44,
        paddingHorizontal: metrics.basePadding,
        marginBottom: 10
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
        marginBottom: 10,
        padding: 5,
        margin: 10,
        backgroundColor: colors.white,
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9
    },

    show_ponto: {
        fontSize: 25,
        color: colors.success,
        marginBottom: 4
    },

    show_title: {
        fontSize: 18,
        color: colors.dark,
        fontWeight: '700'
    },

    show_description: {
        fontSize: 14,
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
    },

    // Parte do Modal


    container_modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10
    },

    space_modal_content: {
        // backgroundColor: '#f2f2f2',
        height: 400,
        marginBottom: 5
    },

    space_modal_bottom: {
        height: 100,
        backgroundColor: colors.white
    },

    user_list: {
        padding: 5,
        marginBottom: 5,
        flexDirection: 'row',
        borderBottomWidth: 1
    },

    logo_modal: {
        width: 50,
        height: 50,
        borderRadius: 60,
        borderColor: 'rgba(204, 204, 204, 0.8)',
        borderWidth: 1,
    },

    text_user: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 10,
        marginLeft: 10
    },

    // Modal Adicionar User
    centeredModalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    picker: {
        height: 50,
        width: 150,
        // backgroundColor: colors.lighter,
        marginBottom: 5
    }

})

export default styles;
