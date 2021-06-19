import * as React from 'react';
import { Text, StyleSheet, ScrollView, TextInput, TouchableHighlight, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AuthService from "./../services/auth.service";

const win = Dimensions.get('window');

function Login(props) {
    const [login, setLogin] = React.useState(true);
    const [username, onChangeUsername] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    
    return (
        login ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]} style={styles.linearGradient}>
                <Text style={styles.title}>Iniciar Sessão</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUsername}
                    value={username}
                    placeholder="Nome de Utilizador"
                    autoCompleteType="username"
                    textContentType="username"
                />                      
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Palavra-chave"
                    autoCompleteType="password"
                    textContentType="password"
                />
                <TouchableHighlight onPress={()=>AuthService.login(username, password).then(res =>{if (res) props.login(true); props.return(false);})}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => setLogin(false)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Ainda não tem conta?</Text>
                </TouchableHighlight>
            </LinearGradient>
        </ ScrollView>
        ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <LinearGradient colors={['#78c9ff', '#6699f8', '#5379f7', '#5867f7', '#8a54ee']} start={[0,0]} end={[1,1]} style={styles.linearGradient}>
                <Text style={styles.title}>Registar</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUsername}
                    value={username}
                    placeholder="Nome de Utilizador"
                    autoCompleteType="username"
                    textContentType="username"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    secureTextEntry={false}
                    placeholder="Email"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Palavra-chave"
                    autoCompleteType="password"
                    textContentType="password"
                />
                <TouchableHighlight onPress={()=>AuthService.register(username, email, password).then(res =>{
                    if (res) {
                        onChangeUsername("");
                        onChangeEmail("");
                        onChangePassword("");
                        setLogin(true);
                    }
                })} style={styles.button}>
                    <Text style={styles.buttonText}>Criar Conta</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => setLogin(true)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Já tem conta?</Text>
                </TouchableHighlight>
            </LinearGradient>
        </ ScrollView>
        )
    );
    
}

export default Login;

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        flex:1
    },
    linearGradient: {
        minHeight: win.height
    },
    input: {
      height: 60,
      margin: 20,
      borderRadius: 40,
      fontSize: 20,
      textAlign: "center",
      backgroundColor: "white",
      fontFamily: "BubblegumSans"
    },
    title: {
        fontSize: 50,
        textAlign: "center",
        margin: 20,
        fontFamily: "BubblegumSans",
        color: "white"
    },
    button: {
        marginRight:60,
        marginLeft:60,
        marginTop:20,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#7158e2',
        borderRadius:30,
        overlayColor: "#7158e2"
    },
    buttonText: {
    color:'#fff',
    textAlign:'center',
    fontFamily: 'BubblegumSans',
    fontSize: 24
    }
});