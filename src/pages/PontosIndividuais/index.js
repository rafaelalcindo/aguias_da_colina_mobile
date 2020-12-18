import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as PontosIndividuaisCreators } from '../../store/duck/pontosIndividuais'

import { Text, StyleSheet, View, Image, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";

import { setNavigator } from '../../services/navigation'
import Coins  from '../../Assets/Imagens/coins.png'

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/AntDesign'

import styles from './styles'

class PontosIndividuais extends Component {

    constructor(props) {
        super(props);
        this.state = {
          refreshing: false
        };
    }

    async componentDidMount()
    {
        setNavigator(this.props.navigation)
        const token = await AsyncStorage.getItem('@token');
        this.props.userPointRequest(token, this.props.user)
    }

    renderListItem = ({item}) => (
        <View style={styles.view_ponto}>
            <Text style={styles.show_ponto} >R$ {item.pontos}</Text>
            <Text style={styles.show_description} > { item.descricao }</Text>
            <Text style={styles.show_date_coin} > { item.data_pontos }</Text>
        </View>
    )

    loadPontos = async () => {
        this.setState({ refreshing: true })

        const token = await AsyncStorage.getItem('@token');
        this.props.userPointRequest(token, this.props.user)

        this.setState({ refreshing: false })
      }

    render() {
        const { user, pontos } = this.props;
        const { refreshing } = this.state;
        const loadingPart = <ActivityIndicator size="small" color="#262626" />;


        return(
            <View style={styles.container}>
                <View style={styles.show_total_coin}>
                    <View style={styles.view_coins}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon style={styles.icon_back} name="arrowleft" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        <Image
                            style={styles.view_image}
                            source={Coins}
                        />
                        <Text style={styles.view_image_text} > { user? user.pontos : loadingPart } Aguitos </Text>
                    </View>
                </View>

                <View style={styles.grupo_lista} >

                    {
                        pontos?
                            <FlatList
                                data={pontos}
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
    pontos: state.pontosIndividuais.pontos,
    user: state.login.user,
})

const mapDispatchToProps = dispatch => bindActionCreators(PontosIndividuaisCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PontosIndividuais);
