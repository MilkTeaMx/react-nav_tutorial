//React
import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView} from 'react-native';
import styles from './authStyles';

//Firebase
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase-config";

//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    selectCount
} from '../../features/counter/counterSlice'

let initialState = {
    name: "",
    email: "",
    password: "",
    errorMessage: null,
}

const themecolor = '#fff'
const tabcolor = '#28407E'

export default function SignUpPage({ navigation }) {
    
    //Redux
    const count = useSelector(selectCount);
    const dispatch = useDispatch()
    //try to set count to users count


    //Firebase
    const [state, setState] = useState(initialState)
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    }) //kind of like useEffect, on refresh 

    const signUp = async () => {

        try { //try catch is used instead of .then()
            console.log(state)
            const user = await createUserWithEmailAndPassword(
                auth, 
                state.email, 
                state.password) //This function also automatically logs in user
            
            console.log(user.uid)
            
            //Setting counter to 0
            const initial_data = {counter: 0}
            const res = await setDoc(doc(db, "userCounters", user.uid), initial_data)

        } catch (error) {
            setState(prevState => ({...prevState, "errorMessage": error.message}))
            console.log(state.errorMessage)

        }
      
    }
    
    return (
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}} behavior={Platform.OS === "ios" ? "padding" : null}>
            <View style={styles.container} behavior="padding">
                <Text style={styles.greeting}>{`Hello!\nSign up and get started.`}</Text>

                <View style={styles.errorMessage}>
                    {state.errorMessage && <Text style={styles.error}>{state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>

                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize="none"
                        name="name"
                        onChangeText={name => setState(prevState => ({
                            ...prevState,
                            "name": name
                        }))}
                        value={state.name}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput 
                        style={styles.input}
                        autoCapitalize="none" 
                        name="email"
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
                        name="password"
                        onChangeText={password => setState(prevState => ({
                            ...prevState,
                            "password": password
                        }))}>
                        </TextInput>
                    </View>

                </View>

                <TouchableOpacity style={styles.button} onPress={() => signUp()}>
                    <Text style={{color: `${themecolor}`, fontWeight: "500", fontSize:18 }}>Sign Up </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf: "center", marginTop: 32}} onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: "#414959", fontSize: 14}}>
                        Already Have An Account? <Text style={{fontWeight: "500", color: `${tabcolor}`}}>Log In</Text>
                    </Text>
                </TouchableOpacity>
                    
            
            </View>
        </KeyboardAvoidingView>
    )
}