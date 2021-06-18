import * as React from "react";
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import RulesModal from "./../../components/RulesModal";
import { gamesInfo } from "../../data/GamesInfo";
import { Feather } from "@expo/vector-icons";

function Help(props) {
    const [modalVisible, setModalVisible] = React.useState(false);

    const x = props.position[0];
    const y = props.position[1];


    const styles = StyleSheet.create({
        view: {
            width: props.size,
            height: props.size,
            position: 'absolute',
            left: x * props.size,
            top: y * props.size,
        },
        buttonHelp: {
            marginLeft: 10,
            marginTop: 10,
            borderRadius: 30,
        }
    });

    return (
        <View style={styles.view}>
            <TouchableOpacity
            style={styles.buttonHelp}
            onPress={() => {
                setModalVisible(true);
            }}
            >
                <View>
                    <Feather name="help-circle" size={30} color="white" />
                </View>
            </TouchableOpacity>
            <RulesModal setModalVisible={setModalVisible} modalVisible={modalVisible} game={gamesInfo[0]}/>
        </View>
        
    )
}

export default Help;