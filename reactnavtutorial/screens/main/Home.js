//React
import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import {MaterialIcons} from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';


//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    decrement,
    increment,
    incrementByAmount,
    loadAmount,
    selectCount
} from '../../features/counter/counterSlice'


//Firebase
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore"

import { auth, db } from "../../firebase-config";




export default function HomePage({navigation, route}) {

    //Firebase
    const count = useSelector(selectCount);
    const dispatch = useDispatch()
    const [user, setUser] = useState({});

    const usersCollectionRef = collection(db, "userCounters")

    onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser)
    })

    const logout = async () => {
        await signOut(auth)
    }

    //Loads in user data
    useEffect(() => {
        const fetchData = async() => {
            const userCounterRef = await getDoc(doc(db, "userCounters", user.uid))
            if (userCounterRef.exists()) {
                updateCounter(userCounterRef.data().counter)
                dispatch(loadAmount(counter))
            }
            
            console.log(count)
        }

        fetchData().catch(console.error)
    }, [])

    //Counter Logic
    const [counter, updateCounter] = useState(0);
    
    const increase_count = async () => {
        let data = {counter: count + 1}
        const res = await setDoc(doc(db, "userCounters", user.uid), data)
        dispatch(increment())
        console.log(count)
     
    }

    const decrease_count = async () => {
        let data = {counter: count - 1}
        const res = await setDoc(doc(db, "userCounters", user.uid), data)

        dispatch(decrement())
        console.log(count)
    }


    return (
      <View style={styles.container}>
  
        <Text> {user.email} </Text>
        <Button title="increment" onPress={() => increase_count()}></Button>
        <Button title="decrement" onPress={() => decrease_count()}></Button>

        <TouchableOpacity onPress={() => increase_count()}>
            <View style={styles.lesserButton}>
                <Text style={styles.smallText}> increment</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => decrease_count()}>
            <View style={styles.lesserButton}>
                <Text style={styles.smallText}> decrement</Text>
            </View>
        </TouchableOpacity>
   
        <Text style={styles.mediumText}> Counter: {count} </Text>

      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "lightgrey"
    }, 
    mediumText: {
        padding: 20,
        fontSize: 16,
        fontFamily: 'Avenir',
        color: "black"
    },
    smallText: {
        padding: 20,
        fontSize: 12,
        fontFamily: 'Avenir',
        color: '#fff'
    },
    lesserButton: {
        borderRadius: 15,
        marginTop: hp(2),
        backgroundColor: "#28407E",
        height: hp(7),
        width: wp(30),
        marginRight: 10,
    
        shadowOffset: { width: wp(0), height: wp(0.5) },
        shadowColor: "black",
        shadowOpacity: 0.25,
        alignItems: "center",
        justifyContent: "center",
      },
})