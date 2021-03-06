import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as EspecialidadesCreators } from '../store/duck/especialidades'

import { Text, StyleSheet, View, ScrollView, FlatList, BackHandler, TouchableOpacity } from "react-native";

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/AntDesign'

class Especialidade extends Component {



    state = {
        especialidades: [
            {id: "1", nome: 'Cães', color: 'rgba(179, 179, 179, 0.7)'},
            {id: "2", nome: 'Felinos', color: 'rgba(179, 179, 179, 0.7)'},
            {id: "3", nome: 'Mamiferos', color: 'rgba(179, 179, 179, 0.7)'},
            {id: "4", nome: 'Ordem Unida', color: 'rgba(0, 153, 51, 0.7)'},
            {id: "5", nome: 'Primeiros Socorros', color: 'rgba(102, 0, 102, 0.7)' },
            {id: "6", nome: 'Tecnicas de lavanderia', color: 'rgba(255, 204, 0, 0.7)'},
            {id: "7", nome: 'Modelagem de sabão', color: 'rgba(0, 102, 255, 0.7)'},
        ]
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.titulo_pagina_view}>

                    <Text style={styles.titulo_pagina} >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon style={styles.icon_back} name="arrowleft" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        Especialidades
                    </Text>
                </View>

                {
                    this.state.especialidades.map((item, index) => (
                        <View key={item.id} style={[styles.each_item, { backgroundColor: item.color }]} >
                            <Text style={styles.each_item_text} >{ item.nome }</Text>
                        </View>
                    ))
                }

                {/* <FlatList
                    data={this.state.especialidades}
                    renderItem={this.renderItem}
                    horizontal={false}
                    keyExtractor={item => item.id}
                /> */}

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    titulo_pagina_view: {
        height: 180,
        backgroundColor: 'rgba(77, 77, 255, 0.9)',
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100

    },

    titulo_pagina: {
        marginTop: 70,
        marginLeft: 40,
        color: '#fff',
        fontSize: 35,
        fontWeight: "800"
    },

    each_item: {
        padding: 20,
        fontSize: 40,
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 3
    },

    each_item_text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: "700"
    },

    icon_back: {
        marginTop: 5,
        marginRight: 10
    }

});

const mapStateToProps = state => ({
    especialidades: state.especialidades.especialidades,
    user: state.login.user
})

const mapDispatchToProps = dispatch => bindActionCreators(EspecialidadesCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Especialidade)
