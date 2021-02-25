import React, { Component, useRef } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as EventosCreators } from '../../store/duck/eventos'

import { Text, StyleSheet, View, Image, FlatList, ActivityIndicator, TouchableOpacity, Button, Modal, TextInput, ScrollView } from "react-native";
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker'
import { Modalize } from 'react-native-modalize'



import { setNavigator } from '../../services/navigation'

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/AntDesign'
import link from '../../services/httpLink'

import styles from './styles'

class Eventos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            evento_select: null,
            modalAddUser: false,

            titulo: null,
            descricao: null,
            data_evento: null,
            ponto_evento: null,
            erro_cadastro: null
        }
    }

    modalizeRef = React.createRef();
    modalizeRefCreate = React.createRef();

    async componentDidMount() {
        setNavigator(this.props.navigation)
        const token = await AsyncStorage.getItem('@token');

        this.props.eventoRequest(token, this.props.user)

    }


    /**
     * Parte de modal, Listar Usuarios dentro do evento
     * @param {*} param0
     */
    renderListItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.onOpen(item)} >
            <View style={styles.view_ponto}>
                <Text style={styles.show_ponto} >R$ {item.ponto_evento}</Text>
                <Text style={styles.show_title} > {item.titulo}</Text>
                <Text style={styles.show_description} > {item.descricao}</Text>
                <Text style={styles.show_date_coin} > {item.data_evento}</Text>
            </View>
        </TouchableOpacity>
    )

    renderListDesbravadores = ({ item }) => (
        <View style={styles.user_list}>
            <Image
                style={styles.logo_modal}
                source={
                    item.foto_perfil ? { uri: `${link}${item.foto_perfil}` }
                        :
                        require('../../Assets/Imagens/user_icon.png')
                }
            />
            <Text style={styles.text_user} >{item.nome} {item.sobrenome}</Text>
        </View>
    )

    renderModalListUser = (evento_usuarios) => (
        <View style={styles.container_modal} >
            <View style={styles.space_modal_content} >

                {
                    evento_usuarios ?
                        <FlatList
                            data={evento_usuarios}
                            keyExtractor={item => String(item.id)}
                            renderItem={this.renderListDesbravadores}
                            onRefresh={this.loadEventUsers}
                            refreshing={this.state.refreshing}
                        />
                        :
                        <ActivityIndicator size="small" color="#262626" />
                }

            </View>

            <View style={styles.space_modal_bottom} >
                <Button
                    title="Adicionar Manual"
                    onPress={this.openModalAddUser}
                />
                <Text></Text>
                <Button
                    title="Adicionar QRCode"
                />
            </View>
        </View>
    )

    /**
     * Modal Adiciona novo usuario no evento
     */
    renderModalAddUsuario = () => (
        <View style={styles.centeredModalView} >
            <View style={styles.modalView} >

                <Picker
                    selectedValue={`java`}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => this.adicionandoQuandoSelecionado(itemValue) }>
                    <Picker.Item label="-- Selecione --" value="" />
                    {
                        this.props.usuarios?

                            this.props.usuarios.map((usuario) => (
                                <Picker.Item key={usuario.id} label={`${usuario.nome} ${usuario.sobrenome}`} value={usuario.id} />
                            ))
                        :
                         null
                    }
                </Picker>

                <Button
                    title="Adicionar"
                />
                <Text></Text>
                <Button
                    title="Fechar"
                    color="#f194ff"
                    onPress={() => { this.setState({ modalAddUser: false }) }}
                />

            </View>
        </View>
    )

    _getOptionList() {
        return this.refs['OPTIONLIST'];
    }

    /**
     * função para abrir o modal
     */
    openModalAddUser = async () => {
        this.setState({ modalAddUser: true });
        const token = await AsyncStorage.getItem('@token');
        this.props.eventoNotHaveUserRequest(token, this.state.evento_select)
    }

    // Montando o select

    // mundando quando selecionado
    adicionandoQuandoSelecionado = async (usuario_id) => {
        if (usuario_id != '' && usuario_id != null) {
            console.log('entrou adicionar: ', usuario_id)
            const token = await AsyncStorage.getItem('@token');
            this.props.eventoSaveUser(token, this.state.evento_select, usuario_id)
            this.setState({ modalAddUser: false })
        }
    }

    /**
     * Methods to Add Eventos
     */
    // Modal Add
    renderModalAddEvento = () => (
        <View style={styles.container_modal} >
            <View style={styles.space_modal_content} >
                <Text>Título:</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite o Título"
                    onChangeText={text => this.setState({ titulo: text })}
                />

                <Text>Descrição:</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite a descrição"
                    onChangeText={text => this.setState({ descricao: text })}
                />

                <Text>Pontos:</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="numeric"
                    placeholder="Digite os pontos"
                    onChangeText={text => this.setState({ ponto_evento: text })}
                />

                <Text>Datas:</Text>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.data_evento}
                    mode="date"
                    placeholder="Selecione a data"
                    format="DD/MM/YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({data_evento: date})}}
                />

                { this.state.erro_cadastro && <Text style={{color: 'red'}} >{ this.state.erro_cadastro }</Text>  }

            </View>

            <View style={styles.space_modal_bottom} >
                <Button
                    title="Adicionar"
                    onPress={() => this.adicionarEventoBackEnd()}
                />
                <Text></Text>
                <Button
                    title="Cancelar"
                    onPress={() => this.onCloseAdd()}
                />
            </View>
        </View>
    )

    adicionarEventoBackEnd = async () => {
        let titulo = this.state.titulo
        let descricao = this.state.descricao
        let ponto_evento = this.state.ponto_evento
        let data_evento = this.state.data_evento

        const token = await AsyncStorage.getItem('@token');

        if (titulo != '' && descricao != '' && ponto_evento > 0 && data_evento != '') {
            let dados = { titulo, descricao, ponto_evento, data_evento }
            this.props.eventoAdd(token, dados, this.props.user)
            this.onCloseAdd()
        } else {
            this.setState({ erro_cadastro: 'Erro ao cadastrar o evento' })
        }
    }

    loadEventos = async () => {
        this.setState({ refreshing: true })

        const token = await AsyncStorage.getItem('@token');
        this.props.eventoRequest(token, this.props.user)

        this.setState({ refreshing: false })
    }

    loadEventUsers = async () => {
        this.setState({ refreshing: true })

        const token = await AsyncStorage.getItem('@token');
        this.props.eventoUserRequest(token, this.state.evento_select)

        this.setState({ refreshing: false })
    }

    onOpen = async (evento) => {

        const token = await AsyncStorage.getItem('@token');
        this.modalizeRef.current?.open();
        this.props.eventoUserRequest(token, evento)
        this.setState({ evento_select: evento })
    };

    onOpenAdd = async () => {
        this.modalizeRefCreate.current?.open()
    }

    onCloseAdd = () => {
        this.modalizeRefCreate.current?.close()
    }

    render() {

        const { user, eventos, evento_usuarios } = this.props;
        const { refreshing } = this.state
        const loadingPart = <ActivityIndicator size="small" color="#262626" />
        const conteudoModal = this.renderModalListUser(evento_usuarios);
        const modalAddUsuario = this.renderModalAddUsuario();
        const modalAddEvento = this.renderModalAddEvento();

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
                    <View style={styles.view_add_event} >
                        <TouchableOpacity onPress={() => this.onOpenAdd()} >
                            <Icon style={styles.icon_back} name="pluscircleo" size={30} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.grupo_lista} >

                    {
                        eventos ?
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

                <Modalize ref={this.modalizeRef}>
                    {conteudoModal}
                </Modalize>

                <Modalize ref={this.modalizeRefCreate}>
                    {modalAddEvento}
                </Modalize>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalAddUser}
                >
                    {modalAddUsuario}
                </Modal>

            </View>
        )
    }

}

const mapStateToProps = state => ({
    eventos: state.eventos.eventos,
    user: state.login.user,
    evento_usuarios: state.eventos.evento_usuarios,
    usuarios: state.login.usuarios
})

const mapDispatchToProps = dispatch => bindActionCreators(EventosCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Eventos);
