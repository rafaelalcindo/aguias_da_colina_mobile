import React, { Component } from 'react'

import styles from './styles'

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Image,
    ActivityIndicator,
    BackHandler
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as LoginActions } from '../../store/duck/login'

import { setNavigator } from '../../services/navigation'

class Login extends Component {

    state ={
        username: '',
        password: ''
    }

     constructor() {
        super();
        console.log('contructor Login')

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    async componentDidMount () {
        console.log('entrou did login')
        console.log(this.props)

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    }

    componentWillUnmount() {
        console.log('entrou')
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
    }

    handleBackButtonClick() {
        console.log('evento Clique')
        BackHandler.exitApp();
        return true;
    }

    handleSubmit = async () => {
        const { username, password } = this.state;
        const { loginRequest } = this.props;

        loginRequest(username, password)
    }

    async componentDidUpdate () {
        let { token } = this.props
        // let tokenStorage = await AsyncStorage.getItem('@token')

        if (token != null) {
            await AsyncStorage.setItem('@token', token)
            this.props.navigation.navigate('Home', { token })
        }

        console.log('entrou')
    }

    render() {
        const { username, password } = this.state;
        const { error, loading, token } = this.props;



        return (
            <View style={styles.container} >

                <StatusBar barStyle={"light-content"} />

                <View style={styles.viewImage} >
                    <Image
                        style={styles.imageLogin}
                        source={require('../../Assets/Imagens/aguias.png')}
                    />
                </View>

                <Text style={styles.title} >Bem Vindos</Text>


                <Text style={styles.text} >
                    Acesse com o seu usuário
                </Text>

                <View style={styles.form} >
                    { error && <Text>Usuário ou senha inválida</Text>}
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Digite seu usuário"
                        value={username}
                        onChangeText={text => this.setState({ username: text })}
                     />

                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Digite sua senha"
                        secureTextEntry={true}
                        value={password}

                        onChangeText={text => this.setState({ password: text })}
                     />

                     <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                        { loading ?
                            <ActivityIndicator size="small" color="#FFF" />
                            :
                            <Text style={styles.buttonText} >Entrar</Text>
                        }

                     </TouchableOpacity>

                </View>
            </View>
        )
    }
}


const mapStateToProps = state => ({
    error: state.login.error,
    loading: state.login.loading,
    user: state.login.user,
    token: state.login.token
})

const mapDispatchToProps = dispatch => bindActionCreators(LoginActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login);
