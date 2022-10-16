import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';


function HomeScreen1({navigation, route}) {

  const {Home1Param1} = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Text>Home Screen 1!</Text>
      <Text>Home 1 Prop 1: {JSON.stringify(Home1Param1)}</Text>

      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')}/>
      <Button title="Go to Home Screen 2" onPress={() => navigation.navigate('Home2', {Home1Param1: 3})}/>

    </View>
  );
}

function HomeScreen2({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen 2!</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')}/>
      <Button title="Go to Top" onPress={() => navigation.navigate('Home1', {Home1Param1: 3})}/>
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
      <HomeStack.Screen name="Home1" component={HomeScreen1} options={{title: "Home One"}} initialParams={{Home1Param1: 100}}/>
      <HomeStack.Screen name="Home2" component={HomeScreen2} options={{title: "Home Two"}}/>
    </HomeStack.Navigator>
  )
}


const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <HomeStack.Screen name="Settings" component={SettingsScreen1} options={{title: "Setting One"}} initialParams={{Setting1Param1: 300}}/>

    </SettingsStack.Navigator>
  )
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Homes') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarBadge: 3,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Homes" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}