import * as React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableHighlight, ScrollView, TextInput, Button } from 'react-native';

const styles = StyleSheet.create({
    input: {
      height: 60,
      margin: 12,
      borderWidth: 1,
      borderRadius: 40,
      fontSize: 20,
      textAlign: "center"
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        margin: 20
    }
  });

function Login() {
    const [login, setLogin] = React.useState(true);
    const [username, onChangeUsername] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    
    if (login) {
        return (
            <ScrollView style={{flex: 1}}>
                <Text style={styles.title}>Iniciar Sessão</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUsername}
                    value={username}
                    placeholder="Nome de Utilizador"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="Palavra-chave"
                />
                <Button title="Entrar" ></Button>
                <Button title="Ainda não tem conta?" onPress={() => setLogin(false)}></Button>
            </ScrollView>
        );
    } else {
        return (
            <ScrollView style={{flex: 1}}>
                <Text style={styles.title}>Registar</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUsername}
                    value={username}
                    placeholder="Nome de Utilizador"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="Palavra-chave"
                />
                <Button title="Entrar" ></Button>
                <Button title="Já tem conta?" onPress={() => setLogin(true)}></Button>
            </ScrollView>
        );
    }
    
}

export default Login;