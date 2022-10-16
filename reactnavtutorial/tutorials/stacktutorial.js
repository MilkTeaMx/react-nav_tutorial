// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import snackIcon from './assets/favicon.png';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {examplePropId: 32, otherParam: "example"})}
      />
      {/* You can add props by putting as 2nd arg */}

      <Button
        title="Change Header"
        onPress={() => navigation.setOptions({title: 'Updated!', headerStyle: {backgroundColor: '#f4511e'}})}
      />
    </View>
  );
} 

function DetailsScreen({ route, navigation }) {

  const {examplePropId, otherParam} = route.params; //Passed in from home screen. Screen needs route as prop

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>ExamplePropID: {JSON.stringify(examplePropId)}</Text>
      <Button
        title="Go to Details Again"
        onPress={() => navigation.push('Details')}
      />
      {/* Push is used to navigate to same screen but usually with different props*/}


      <Button
        title="Updating Props"
        onPress={() => navigation.setParams({examplePropId: 10})}
      />

      <Button title="Go to Home" onPress={() => navigation.navigate({name: 'Home', params: {exampleProp2: 100}, merge: true})} />
      <Button title="Go back one" onPress={() => navigation.goBack()} />
      <Button title="Go back to first screen in stack" onPress={() => navigation.popToTop()}/>
      {/* Back button is automatically provided but you can also program it in several ways, you can pass in parameters this way
          However, you should only pass in relevant info like in URLS. Pass in ids instead of full data. Data should be in global not nav state*/}

      <Button title="Change header" onPress={() => navigation.setOptions({ 
        headerTitle: (props) =>  <LogoHeader {...props} />, 
        headerRight: () => (<Button onPress={() => alert('This is a button')} title="Info" color="#000000"/>)
      })}/>
      {/* This changes the screen header to an image, as well as makes a button to the right*/}
    </View>

   
  );
}


function LogoHeader() {
  return (
    <Image
      style={{width: 50, height: 50}}
      source = {snackIcon}
    />
  )
} //You can pass this or a differnet function (like a button) into a header as well

function nestedScreen() {
  return (
    <Tab.Navigator screenOptions = {{ headerShown: false }}>
      <Tab.Screen name="Feed" component={Feed}/> {/* This is the initial screen */}
      <Tab.Screen name="Messages" component={Messages}/>
    </Tab.Navigator> 
  )
} //This is a nested navigator, navigotors in navigators
//when pressing back button, screen will go to previous screen in nested stack unless its the last, then parent navigator
//each navigator has its own options and params (params can be accessed though through React Context)
//Nested navigators don't recieve parents events (like tabPress) unless you use navigation.addListener on getParent()
//When navigating to a navigator, to get to a specific nested screen, use (  navigation.navigate('nestedScreen', {screen: 'Feed', params: 'past week'});  )\

//for organizing code, use groups instead



const Stack = createNativeStackNavigator(); 
/*
returns object with Screen and Navigator. Navigator should contain Screens
A screen is a route
If you want to pass the same props to all screens (like a title), pass it to navigator
{navigation} prop is passed to every screen component
*/

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'This is a Overview'}}/>
        <Stack.Screen name="Details" component={DetailsScreen} initialParams={{examplePropId: 10}} options={({route}) => {title: route.params.name}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;