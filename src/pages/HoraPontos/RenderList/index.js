import React from 'react';

import { Text, View,TouchableOpacity } from 'react-native';
import styles from '../styles'

const RenderList = ({item}) => {
    return (
        <TouchableOpacity>
            <View style={styles.view_ponto} >
                <Text style={styles.show_ponto} >R$ {item.pontos}</Text>
                <Text style={styles.show_title} > {item.descricao}</Text>
                <Text style={styles.show_description} > {item.descricao}</Text>
                <Text style={styles.show_date_coin} > {item.data_programacao} {item.hora_programacao} </Text>
            </View>
        </TouchableOpacity>
    )
}

export default RenderList;
