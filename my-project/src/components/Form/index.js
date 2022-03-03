import React, { useState } from "react"
import { 
    Keyboard,
    Pressable,
    Vibration,
    TextInput, 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList} from "react-native"
import ResultImc from './ResultImc/'
import styles from "./style"

export default function Form() {

const [height, setHeight] = useState(null)
const [weight, setWeight] = useState(null)
const [messageImc, setMessageImc] = useState(null)
const [imc, setImc] = useState(null)
const [textButton, setTextButton] = useState("Calcular")
const [errorMessage, setErrorMessage] = useState(null)
const [imcList, setImcList] = useState([])

function imcCalculator(){
    let heightFormat = height.replace(',',".")
    let totalImc = (weight/(heightFormat*heightFormat)).toFixed(2)
    setImcList((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])
    setImc(totalImc)
}

function verificationImc() {
    if(imc == null) {
        Vibration.vibrate();
        setErrorMessage("*Campo obrigatório*")
    }
}

function validationImc() {
    if(weight != null && height != null) {
        imcCalculator()
        setHeight(null)
        setWeight(null)
        setMessageImc("Seu Imc é igual: ")
        setTextButton("Calcular Novamente")
        setErrorMessage(null)
    }
    else {
        verificationImc()
        setImc(null)
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura")
    }
}

    return(
        <View style={styles.formContext}>
            <View style={styles.formContent}>
                {imc == null ?
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                    <Text style={styles.formLabel}>Altura</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex. 1.75"
                    keyboardType="numeric"
                    />
                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex. 75.34"
                    keyboardType="numeric"
                    />
                    <TouchableOpacity
                    style={styles.buttonCalculator}
                    onPress={()=> {
                        validationImc()
                    }}
                    >
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </Pressable>
                :
                <View style={styles.exhibitionResultImc}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc}/>
                    <TouchableOpacity
                    style={styles.buttonCalculator}
                    onPress={()=> {
                        validationImc()
                    }}
                    >
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
                }
                <FlatList 
                style={styles.listImcs}
                // data é um array; reverse pega sempre o ultimo numero calculado 
                data={imcList.reverse()}
                // para cada item do data, o renderitem vai carregar oq tem dentro dele
                renderItem={({item}) => {
                    return (

                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList}>Resultado IMC = </Text>
                            {item.imc}
                        </Text>

                    )
                }}
                // para cada item que voce vai imprimir, ele vai pedir uma chave unica, o keyExtractor vai passar a chave que queremos que ele usa
                keyExtractor={(item) => {
                    item.id
                }}
                />
            </View>
        </View>
    );
}