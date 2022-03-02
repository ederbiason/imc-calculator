import React from "react"
import { View, Text, TouchableOpacity, Share } from "react-native"
import styles from "./style"

export default function ResultImc(props) {

    const onShare = async() => {
        const result = await Share.share({
            message:"Meu IMC hoje é: " + props.resultImc
        })
    }

    return(
        <View style={styles.resultImc}>
            <View style={styles.boxShareButton}>
                {/* Se o props.resultImc for igual a nulo, então retorna o touchable*/}
                {props.resultImc != null ?
                <TouchableOpacity 
                    onPress={onShare}
                    style={styles.shared}
                >
                    <Text style={styles.sharedText}>Share</Text>
                </TouchableOpacity>
                // Se não, ele retorna uma view vazia
                :
                <View/>
                }
            </View>
            <Text style={styles.information}>{props.messageResultImc}</Text>
            <Text style={styles.numberImc}>{props.resultImc}</Text>
        </View>
    );
}