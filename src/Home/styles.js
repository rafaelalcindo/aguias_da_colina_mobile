import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    container: {
        flex: 1,

    },

    container_2: {
        flex: 1,
        flexDirection: "column"
    },

    view_coins: {
        flex: 1,
        flexDirection: "row",
        top: 40,
        marginLeft: 20
    },

    view_image: {
        height: 50,
        width: 50
    },

    view_image_text: {
        fontSize: 20,
        fontWeight: "800",
        marginTop: 10
    },


    show_details: {
        height: 180,
        backgroundColor: '#fff',

    },

    logo_user: {
        width: 110,
        height: 110,
        position: "absolute",
        alignItems: "center",
        left: "50%",
        top: -70,
        borderRadius: 60,

        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },

    logo: {
        width: 110,
        height: 110,
        borderRadius: 60,
        borderColor: 'rgba(204, 204, 204, 0.8)',
        borderWidth: 1,
    },

    show_menus: {

        backgroundColor: 'rgba(77, 77, 255, 0.9)',
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 50

    },

    icon_logout: {
        marginTop: 10,
        marginLeft: 150
    },

    image_background: {

        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"

    }
})

export default styles;
