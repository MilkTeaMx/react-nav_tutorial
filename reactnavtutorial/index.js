import React from 'react'
import ReactDOM from 'react-dom'
//import './index.css'
//import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import { Button, Text, View } from 'react-native';



export default function App() {
    return (
  
      <Provider store={store}>
  
     
        <NavigationContainer>
            
        </NavigationContainer>
  
      </Provider>
    );
  }
