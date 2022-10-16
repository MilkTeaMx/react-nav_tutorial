
//React
import React, { useState, useEffect } from "react";
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

//Main Screens
import HomePage from "./screens/main/Home";

//Auth Screens
import SignUpPage from "./screens/auth/SignUp";
import LoginPage from "./screens/auth/Login";

//Redux
import store from './app/store'
import { Provider } from 'react-redux';

//Firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";





function HomeScreen2({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen 2!</Text>
  
    </View>
  );
}

function SettingsScreen1() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen 1!</Text>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group screenOptions={{headerRight: () => (<Button title="HI" color="red" onPress={async () => await signOut(auth)}/>)}}>
        <HomeStack.Screen 
          name="Home1" 
          component={HomePage}/>
      <HomeStack.Screen name="Home2" component={HomeScreen2}/>
      </HomeStack.Group>
    </HomeStack.Navigator>
  )
}


const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <HomeStack.Screen name="Settings" component={SettingsScreen1}/>

    </SettingsStack.Navigator>
  )
}


const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown:false
        }}
        >
        <Tab.Screen 
          name="Homes" 
          component={HomeStackScreen} 
          options={{
            tabBarIcon: ({focused, size, color}) => {
              let iconName
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
              return (
                <Ionicons 
                  name={iconName}
                  size={size}
                  color={color}
                />
            )
            },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            }}  
          />

        <Tab.Screen 
          name="Settings" 
          component={SettingsStackScreen}
        
          options={{
            tabBarIcon: ({focused, size, color}) => {
              let iconName;
              iconName = focused ? 'ios-list-box' : 'ios-list';
              return (
                <Ionicons 
                  name={iconName}
                  size={size}
                  color={color}
                />
              )
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',

          }}
        />

        </Tab.Navigator>
      </NavigationContainer>
  )
}


const AuthStack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={LoginPage} options={{title: 'Login'}}/>
        <AuthStack.Screen name="SignUp" component={SignUpPage} options={{title: 'Sign Up'}}/>
      </AuthStack.Navigator>
    </NavigationContainer>
  
  )
}


//import { initializeApp } from 'firebase/app';

export default function App() {

  const [user, setUser] = useState()

  onAuthStateChanged(auth, (user) => {
    setUser(user)
  }) 

  if (!user) {
    return (
      <Provider store={store}>
        <AuthStackScreen/>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
        <MainTabs/>
    </Provider>
  );
}