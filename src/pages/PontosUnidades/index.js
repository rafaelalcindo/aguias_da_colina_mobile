import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as PontosUnidadesCreators } from '../../store/duck/pontosUnidades'

import {
    Text,
    View,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native'

import { setNavigator } from '../../services/navigation'
import Coins from '../../Assets/Imagens/coins.png'

import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'

class PontosUnidades extends Component {

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
        console.log(this.props)
    }

    render() {
        const { user, pontos_unidade } = this.props
        const { refreshing } = this.state
        const loadingPart = <ActivityIndicator size="small" color="#262626" />

        return(
            <View style={styles.container} >
                <View style={styles.show_total_coin} >
                    <View style={styles.view_coins} >
                        <Image
                            style={styles.view_image}
                            source={Coins}
                        />
                    </View>
                </View>

                <View style={styles.grupo_lista} >

                    <View style={styles.view_ponto}>
                        <Text style={styles.show_ponto} >R$ 34</Text>
                        <Text style={styles.show_description} > Vamos aos testes na descrição</Text>
                        <Text style={styles.show_date_coin} > 14/12/2020</Text>
                    </View>

                    <View style={styles.view_ponto}>
                        <Text style={styles.show_ponto} >R$ 34</Text>
                        <Text style={styles.show_description} > Vamos aos testes na descrição</Text>
                        <Text style={styles.show_date_coin} > 14/12/2020</Text>
                    </View>

                    <View style={styles.view_ponto}>
                        <Text style={styles.show_ponto} >R$ 34</Text>
                        <Text style={styles.show_description} > Vamos aos testes na descrição</Text>
                        <Text style={styles.show_date_coin} > 14/12/2020</Text>
                    </View>

                </View>

            </View>
        )
    }

}

const mapStateToProps = state => ({
    pontos_unidade: state.pontosUnidades.pontos_unidade,
    user: state.login.user
})

const mapDispatchToProps = dispatch => bindActionCreators(PontosUnidadesCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PontosUnidades)
