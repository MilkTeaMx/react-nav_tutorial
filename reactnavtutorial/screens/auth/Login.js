//React
import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView} from 'react-native';
import styles from './authStyles';

//Firebase
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";


let initialState = {
    email: "",
    password: "",
    errorMessage: null,
}

const themecolor = '#fff'
const tabcolor = '#28407E'

export default function LoginPage({ navigation }) {

    const [state, setState] = useState(initialState)

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                state.email,
                state.password
            )
        } catch {
            setState(prevState => ({...prevState, "errorMessage": error.message}))
        }
    }

    

    return (
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}} behavior={Platform.OS === "ios" ? "padding" : null}>
            <View style={styles.container} behavior="padding">
                <Text style={styles.greeting}>{`Hello!\nLogin and get started.`}</Text>

                <View style={styles.errorMessage}>
                    {state.errorMessage && <Text style={styles.error}>{state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                
                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput style={styles.input}
                        autoCapitalize="none" 
                        onChangeText={email => setState(prevState => ({
                            ...prevState,
                            "email": email
                        }))}>
                        </TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                            style={styles.input}
                            secureTextEntry autoCapitalize="none" 
                            onChangeText={password => setState(prevState => ({
                            ...prevState,
                            "password": password
                        }))}>
                        </TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => login()}>
                    <Text style={{color: `${themecolor}`, fontWeight: "500", fontSize:18 }}>Login </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf: "center", marginTop: 32}} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{color: "#414959", fontSize: 14}}>
                        Don't Have An Account? <Text style={{fontWeight: "500", color: `${tabcolor}`}}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )

}

