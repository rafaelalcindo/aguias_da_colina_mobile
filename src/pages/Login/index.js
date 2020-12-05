import React, { Component } from 'react'

import styles from './styles'

import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Image,
    ActivityIndicator
} from "react-native";

class Login extends Component {

    state ={
        username: '',
        password: ''
    }

    render() {
        const { username, password } = this.state;

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

                     <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText} >Entrar</Text>
                     </TouchableOpacity>

                </View>
            </View>
        )
    }
}

export default Login;