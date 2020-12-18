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
import Icon from 'react-native-vector-icons/AntDesign'

import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        this.props.userUnityPointRequest(token, this.props.user)

    }

    renderListItem = ({item}) => (
        <View style={styles.view_ponto}>
            <Text style={styles.show_ponto} >R$ { item.pontos }</Text>
            <Text style={styles.show_description} > { item.descricao } </Text>
            <Text style={styles.show_date_coin} > { item.data_pontos }</Text>
        </View>
    )

    loadPontos = async () => {
        this.setState({ refreshing: true })

        const token = await AsyncStorage.getItem('@token');
        this.props.userUnityPointRequest(token, this.props.user)

        this.setState({ refreshing: false })
    }

    render() {
        const { user, pontos_unidade } = this.props
        const { refreshing } = this.state
        const loadingPart = <ActivityIndicator size="small" color="#262626" />

        return(
            <View style={styles.container} >
                <View style={styles.show_total_coin} >
                    <View style={styles.view_coins} >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon style={styles.icon_back} name="arrowleft" size={30} color="#ffffff" />
                        </TouchableOpacity>

                        <Image
                            style={styles.view_image}
                            source={Coins}
                        />
                        <Text style={styles.view_image_text} > { user? user.pontos_unidade : loadingPart } Pontos da Unidade</Text>
                    </View>
                </View>

                <View style={styles.grupo_lista} >

                    {
                        pontos_unidade?
                            <FlatList
                                data={pontos_unidade}
                                keyExtractor={item => String(item.id)}
                                renderItem={this.renderListItem}
                                onRefresh={this.loadPontos}
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
    pontos_unidade: state.pontosUnidades.pontos_unidade,
    user: state.login.user
})

const mapDispatchToProps = dispatch => bindActionCreators(PontosUnidadesCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PontosUnidades)
