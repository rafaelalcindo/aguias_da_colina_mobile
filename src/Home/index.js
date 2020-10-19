import React, { Component } from 'react'

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native'

import Menus from './Menus/Menus'
import Coins  from '../Assets/Imagens/coins.png'

export default class App extends Component {
    
    render() {
        return (
            <ScrollView>
                <View style={styles.container}  >
                    <View style={styles.show_details} >
                        <View style={styles.view_coins}>
                            <Image
                                style={styles.view_image}
                                source={Coins}
                            />
                            <Text style={styles.view_image_text} > 5 Aguitos </Text>
                        </View>
                    </View>
                    <View style={styles.show_menus} >
                        <View
                            style={styles.logo_user}
                        >
                            <Image
                                style={styles.logo}
                                source={{
                                    // uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3Gh0lfCeN36FlOO6-1IuOC2renxd_S1ae-Q&usqp=CAU'
                                    uri: 'https://instrutorgeorge.files.wordpress.com/2011/03/dscf6273.jpg'
                                }}
                            />
                        </View>
                        
                        <Menus pagina="Especialidade" nameIcon="dingding-o" title="Especialidades" />
                        <Menus pagina="Classe" nameIcon="filetext1" title="Classes" />
                        <Menus pagina="Historico" nameIcon="table" title="Histórico de Pontos" />
                        <Menus pagina="Eventos" nameIcon="enviroment" title="Eventos" />
                        <Menus pagina="Configuracao" nameIcon="idcard" title="Configurações" />
                        
                    </View>                   
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        
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
        padding: 60
        
    }
})