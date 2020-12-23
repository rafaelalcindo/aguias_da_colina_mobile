import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as EventosCreators } from '../../store/duck/eventos'

import { Text, StyleSheet, View, Image, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";

import { setNavigator } from '../../services/navigation'

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/AntDesign'

import styles from './styles'

class Eventos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    async componentDidMount()
    {
        setNavigator(this.props.navigation)
        const token = await AsyncStorage.getItem('@token');

        this.props.eventoRequest(token, this.props.user)

    }

    renderListItem = ({item}) => (
        <View style={styles.view_ponto}>
            <Text style={styles.show_ponto} >R$ {item.ponto_evento}</Text>
            <Text style={styles.show_title} > { item.titulo }</Text>
            <Text style={styles.show_description} > { item.descricao }</Text>
            <Text style={styles.show_date_coin} > { item.data_evento }</Text>
        </View>
    )

    loadEventos = async () => {
        this.setState({ refreshing: true })

        const token = await AsyncStorage.getItem('@token');
        this.props.eventoRequest(token, this.props.user)

        this.setState({ refreshing: false })
    }

    render() {

        const { user, eventos } = this.props;
        const { refreshing } = this.state
        const loadingPart = <ActivityIndicator size="small" color="#262626" />

        return (
            <View style={styles.container}>
                <View style={styles.show_total_coin}>
                    <View style={styles.view_coins}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon style={styles.icon_back} name="arrowleft" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        <Text style={styles.title_bar} >Eventos</Text>
                    </View>
                </View>

                <View style={styles.grupo_lista} >

                    {
                        eventos?
                            <FlatList
                                data={eventos}
                                keyExtractor={item => String(item.id)}
                                renderItem={this.renderListItem}
                                onRefresh={this.loadEventos}
                                refreshing={refreshing}
                            />
                        :
                        loadingPart
                    }

                </View>

            </View>
        )
    }

}

const mapStateToProps = state => ({
    eventos: state.eventos.eventos,
    user: state.login.user
})

const mapDispatchToProps = dispatch => bindActionCreators(EventosCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Eventos);
