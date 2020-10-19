import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';

import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback

} from "react-native";



const Menus = (props) => {

    const navigation = useNavigation();

    function handlePages(pageName) {
        navigation.navigate(pageName)
    }
   
    return (
        <TouchableWithoutFeedback onPress={() => handlePages(props.pagina)}>
            <View style={styles.menu}  >
                <Icon name={props.nameIcon} size={70} color="#9999ff" />
                <Text style={styles.menu_texto} >{props.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
    
};

const styles = StyleSheet.create({
    menu: {
        marginLeft: 20,
        marginTop: 10,
        height: 120,
        width: 120,
        alignItems: "center",
        paddingTop: 15,
        backgroundColor: '#fff',
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

    menu_texto: {
        fontSize: 12,
        fontWeight: "600",
    }
    
});

export default Menus;