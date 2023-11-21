import 'react-native-gesture-handler';
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import {firebase} from '../Firebase/firebase';

import {StyleSheet, View} from 'react-native';

import WeeklyCalendar from './components/Calendar/WeeklyCalendar';
//import WeeklyCalendar from 'react-native-weekly-calendar';


import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/HomeScreen/HomeScreen';
import Settings from './screens/Settings';
import {Ionicons} from '@expo/vector-icons';

import HomeStackScreen from './screens/HomeScreen/HomeStackScreen';
import LoginScreen from './screens/AuthScreen/LoginScreen';
import SignupScreen from './screens/AuthScreen/SignupScreen';
import BehaviorStatScreen from './screens/StatisticScreens/BehaviorStatScreen';
import GroupsScreen from './screens/GroupsScreens/GroupsScreen';

import {useSelector, dispatch, useDispatch} from 'react-redux';
import {authenticateAuthTokens, logoutAuthTokens} from './store/redux/authTokens';

import {Colors} from './constants/styles';


import {Provider} from 'react-redux';
import {store} from './store/redux/store';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

/*const firebaseConfig = {

  apiKey: "AIzaSyAUuZUgvlmMYBOl_Kg43Eb2sHnEJp4_us4",

  authDomain: "sandler-cookbook.firebaseapp.com",

  projectId: "sandler-cookbook",

  storageBucket: "sandler-cookbook.appspot.com",

  messagingSenderId: "519878306197",

  appId: "1:519878306197:web:4fe836d84e5caae16dae9c"

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


firebase.initializeApp(config);
*/

// const Drawer = createDrawerNavigator();
//
// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="Settings" component={Settings} />
//     </Drawer.Navigator>
//   );
// }

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F0F0' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Settings"
//         onPress={() => navigation.navigate('Settings')}
//       />
//     </View>
//   );
// }

// function SettingsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F0F0' }}>
//       <Text>Settings Screen</Text>
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//     </View>
//   );
// }

// function AuthStack is for the login and signup screens
function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: "F0F0F0"},
                headerTintColor: 'black',
                contentStyle: {backgroundColor: "#FAFAFA"},
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="SignUp" component={SignupScreen}/>
        </Stack.Navigator>
    );
}

// function AuthenticatedStack is for the home screen and the settings screen
// Bottom tab navigator for authenticated screens (home, behavior stat, groups, report, settings)
function AuthenticatedStack() {
    return (
        <BottomTab.Navigator initialRouteName="Home">

            <BottomTab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    headerShown: false, tabBarLabel: 'Today', tabBarIcon: ({color, size}) => (
                        <Ionicons name="home-outline" size="25px"/>
                    ),


                }}
            />
            <BottomTab.Screen
                name="Habit Stat"
                component={BehaviorStatScreen}
                options={{
                    tabBarLabel: 'Habit Stat', tabBarIcon: ({color, size}) => (
                        <Ionicons name="document-text-outline" size="25px"/>
                    ),
                }}
            />
            <BottomTab.Screen
                name="Group"
                component={GroupsScreen}
                options={{
                    tabBarLabel: 'Group', tabBarIcon: ({color, size}) => (
                        <Ionicons name="people-outline" size="25px"/>
                    ),
                }}
            />
            <BottomTab.Screen
                name="Report"
                component={Home}
                options={{
                    tabBarLabel: 'Report', tabBarIcon: ({color, size}) => (
                        <Ionicons name="clipboard-outline" size="25px"/>
                    ),
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings', tabBarIcon: ({color, size}) => (
                        <Ionicons name="cog-outline" size="25px"/>
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

// function Navigation is for the navigation container
function Navigation() {

    const dispatch = useDispatch();

    const authToken = useSelector((state) => state.authTokens.data[0]);


    return (
        <NavigationContainer>
            {!authToken.isAuthenticated && <AuthStack/>}
            {authToken.isAuthenticated && <AuthenticatedStack/>}
        </NavigationContainer>
    );
}


// function App is for the app
export default function App() {


    return (
        <Provider store={store}>
            <Navigation/>
        </Provider>
    );
}


/*
export default function App() {
  const sampleEvents = [
    { 'start': '2023-07-17 09:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
    { 'start': '2020-03-24 14:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
    { 'start': '2020-03-25 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
    { 'start': '2020-03-25 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
    { 'start': '2020-03-25 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
    { 'start': '2020-03-26 09:30:00', 'duration': '01:00:00', 'note': 'Schedule 1' },
    { 'start': '2020-03-26 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
    { 'start': '2020-03-26 15:00:00', 'duration': '01:30:00', 'note': 'Schedule 3' },
    { 'start': '2020-03-26 18:00:00', 'duration': '02:00:00', 'note': 'Schedule 4' },
    { 'start': '2020-03-26 22:00:00', 'duration': '01:00:00', 'note': 'Schedule 5' }
  ]

  return (
    <View style={styles.container}>
      <WeeklyCalendar events={sampleEvents} style={{ }} />
    </View>
  );
}

*/

// styles is for the styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
