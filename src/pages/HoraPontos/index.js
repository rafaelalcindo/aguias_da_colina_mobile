import React, { Component, useRef } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as HoraPontosCreators } from '../../store/duck/horaPontos'

import { Text, StyleSheet, View, Image, FlatList, ActivityIndicator, TouchableOpacity, Button, TextInput, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import DatePicker from 'react-native-datepicker'
import { Modalize } from 'react-native-modalize'

import { setNavigator } from '../../services/navigation'

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/AntDesign'
import link from '../../services/httpLink'

import RenderList from './RenderList'
import ModalAddHoraPontos from './ModalAddHoraPontos'

import styles from './styles'

class HoraPontos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            hora_ponto_select: null,
            modalAddUser: false,

            descricao: null,
            data_programacao: null,
            hora_programacao: null,
            pontos: null,
            erro_cadastro: ''
        }
    }

    modalizeRef = React.createRef();
    modalizeRefCreate = React.createRef();

    async componentDidMount() {
        setNavigator(this.props.navigation)
        const token = await AsyncStorage.getItem('@token')

        this.props.horaPontoRequest(token, this.props.user)
    }

    _getOptionList() {
        return this.refs['OPTIONLIST'];
    }

    /**
     * Parte de modal, Listar Usuarios dentro do evento
     * @param {*} param0
     */
    renderListItem = ({item}) => (
        <RenderList item={item} />
    )

    /**
     * Parte do Modal, adicionar nova Data Hora
     */
    onOpenAdd = async () => {
        this.modalizeRefCreate.current?.open()
    }

    onCloseAdd = () => {
        this.modalizeRefCreate.current?.close()
    }

    adicionarHoraPontos = async (horaPonto) => {
        let descricao = horaPonto.descricao;
        let data_programacao = horaPonto.data;
        let hora_programacao = horaPonto.hora;
        let pontos = horaPonto.pontos;

        const token = await AsyncStorage.getItem('@token');

        if (descricao != '' && data_programacao != '' && hora_programacao != '' && pontos > 0) {
            let dados = { descricao, data_programacao, hora_programacao, pontos }
            this.props.horaPontoAdd(token, dados, this.props.user)
            this.onCloseAdd()
        } else {
            this.setState({ erro_cadastro: 'Erro ao cadastrar o horário' })
        }
    }

    /**
     * Recarregar a lista
     */
    loadHoraPontos = async () => {
        this.setState({ refreshing: true })

        const token = await AsyncStorage.getItem('@token')
        this.props.horaPontoRequest(token, this.state.user)

        this.setState({ refreshing: false })
    }

    render() {
        const { user, hora_pontos, user_hora_pontos } = this.props;
        const { refreshing } = this.state
        const loadingPart = <ActivityIndicator size="small" color="#262626" />
        const modalAddHoraPonto = <ModalAddHoraPontos onCloseAdd={this.onCloseAdd} adicionarHoraPontos={this.adicionarHoraPontos} />

        return (
            <View style={styles.container} >
                <View style={styles.show_total_coin} >
                    <View style={styles.view_coins} >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon style={styles.icon_back} name="arrowleft" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        <Text style={styles.title_bar} >Hora de Entrada</Text>
                    </View>
                    <View style={styles.view_add_event} >
                        <TouchableOpacity onPress={() => this.onOpenAdd() } >
                            <Icon style={styles.icon_back} name="pluscircleo" size={30} color="#ffffff" />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.grupo_lista} >
                    {
                        hora_pontos ?
                            <FlatList
                                data={hora_pontos}
                                keyExtractor={item => String(item.id)}
                                renderItem={this.renderListItem}
                                onRefresh={this.loadHoraPontos}
                                refreshing={refreshing}
                            />
                            :
                            loadingPart
                    }
                </View>

                <Modalize ref={this.modalizeRefCreate}>
                    {modalAddHoraPonto}
                </Modalize>

            </View>
        )
    }

}

const mapStateToProps = state => ({
    user: state.login.user,
    hora_pontos: state.horaPontos.hora_pontos,
    user_hora_pontos: state.horaPontos.user_hora_pontos
})

const mapDispatchToProps = dispatch => bindActionCreators(HoraPontosCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HoraPontos)
