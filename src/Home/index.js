import React, { Component } from 'react'

import {
    Platform,
    Text,
    View,
    Image,
    ScrollView,
    BackHandler,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    ImageBackground
} from 'react-native'

import Menus from './Menus/Menus'
import Coins  from '../Assets/Imagens/coins.png'

import styles from './styles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as LoginActions } from '../store/duck/login'
import { setNavigator } from '../services/navigation'
import link from '../services/httpLink'

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/AntDesign'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          refreshing: false,
          token: null
        };




    }

    async componentDidMount() {

    }

    async componentWillMount() {

        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
        setNavigator(this.props.navigation)


        const token = await AsyncStorage.getItem('@token');
        console.log(token)
        this.setState({token})

        const { loginCheckUser, loginLogout } = this.props

        if (token != undefined && token != null) {
            loginCheckUser(token)
        } else {
            loginLogout()
        }
    }

    onRefresh = () => {
        const { loginCheckUser, loginLogout } = this.props

        this.setState({refreshing: true});

        loginCheckUser(this.state.token)
        this.setState({refreshing: false});
    }

    render() {

        const { user } = this.props;
        const loadingPart = <ActivityIndicator size="small" color="#262626" />;

        const pageRender = user?
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                }
            >
                <View style={styles.container}  >
                    <View style={styles.show_details} >
                        <View style={styles.view_coins}>
                            <Image
                                style={styles.view_image}
                                source={Coins}
                            />
                            <Text style={styles.view_image_text} >
                                { user? user.pontos : loadingPart } Aguitos

                            </Text>

                            <TouchableOpacity
                                onPress={ () => this.props.loginLogout() }
                            >
                                <Icon style={styles.icon_logout} name="logout" size={30} color="#595959" />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.show_menus} >
                        <View
                            style={styles.logo_user}
                        >
                            {
                                user?
                                <Image
                                    style={styles.logo}
                                    // source={{
                                    //     // uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3Gh0lfCeN36FlOO6-1IuOC2renxd_S1ae-Q&usqp=CAU'
                                    //     uri: 'https://instrutorgeorge.files.wordpress.com/2011/03/dscf6273.jpg'
                                    // }}
                                    source={
                                        user.foto_perfil? { uri: `${link}${user.foto_perfil}` }
                                            :
                                        require('../Assets/Imagens/user_icon.png')
                                    }
                                />
                                :
                                <ActivityIndicator size="small" color="#262626" />
                            }
                        </View>


                        <Menus pagina="PontosIndividuais" nameIcon="table" title="Histórico de Pontos" />
                        <Menus pagina="PontosUnidades" nameIcon="yuque" title="Pontos da Unidade" />
                        <Menus pagina="Configuracao" nameIcon="idcard" title="Configurações" />

                        { (user.nivel == 'Administrativo' || user.nivel == 2)? <Menus pagina="Eventos" nameIcon="pluscircleo" title="Add. Desbravador no Evento" />  : null }
                        { (user.nivel == 'Administrativo' || user.nivel == 2)? <Menus pagina="HoraPontos" nameIcon="hourglass" title="Marcar Hora" />  : null }

                    </View>
                </View>
            </ScrollView>

        :

        <View style={styles.container_2}>
            <ImageBackground

                style={styles.image_background}
                source={require('../Assets/Imagens/background_loading_2.png')}
            >
            </ImageBackground>
        </View>;

        return (
            pageRender
        );
    }
}


const mapStateToProps = state => ({
    user: state.login.user,
    token: state.login.token
})

const mapDispatchToProps = dispatch => bindActionCreators(LoginActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);
