import React, { useState } from 'react'

import { Text, View, Button, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

import DatePicker from 'react-native-datepicker'
import styles from '../styles'


const ModalAddHoraPontos = ({onCloseAdd, adicionarHoraPontos}) => {
    const [descricao, setDescricao] = useState('')
    const [pontos, setPontos] = useState(0)
    const [data, setData] = useState('')
    const [hora, setHora] = useState('')

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setHora(`${currentDate.getHours()}:${currentDate.getMinutes()}`)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);

    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View style={styles.container_modal} >
            <View style={styles.space_modal_content} >

                <Text>Descrição:</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite a descrição"
                    onChangeText={text => setDescricao(text)}
                />

                <Text>Pontos:</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="numeric"
                    placeholder="Digite os pontos"
                    onChangeText={text => setPontos(text)}
                />

                <Text>Datas:</Text>
                <DatePicker
                    style={{width: 200}}
                    date={data}
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
                    onDateChange={(date) => {setData(date)}}
                />

                <Text>Horas:</Text>
                <Text onPress={showTimepicker}  >{ date.getHours() } : { date.getMinutes() }</Text>

                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}



            </View>

            <View style={styles.space_modal_bottom} >

                <Button
                    title="Adicionar"
                    onPress={() => adicionarHoraPontos({descricao, data, hora, pontos})}
                />

                <Text></Text>
                <Button
                    title="Cancelar"
                    onPress={() => onCloseAdd()}
                />
            </View>
        </View>
    )
}

export default ModalAddHoraPontos;
