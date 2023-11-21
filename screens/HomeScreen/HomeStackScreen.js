import {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { 
  StyleSheet,  
  View, 
  FlatList, Button, Text
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import BehaviorItem from '../../components/BehaviorItem';
import BehaviorInput from '../../components/BehaviorInput';
import IconButton from '../../components/IconButton';

import BehaviorDetailScreen from './BehaviorDetailScreen';
import BehaviorFormScreen from './BehaviorFormScreen';
import BehaviorListScreen from './BehaviorListScreen';

import HomeScreen from './HomeScreen';
import AltHomeScreen from './AltHomeScreen';


const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
 return (
   <HomeStack.Navigator initialRouteName="HomeScreen" options={{headerShown: false}}>

    <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ }} />
     <HomeStack.Screen name="BehaviorDetailScreen" component={BehaviorDetailScreen} options={{  headerTitle: "", tabBarStyle: { display: "none" }, }} />
     <HomeStack.Screen name="BehaviorFormScreen" component={BehaviorFormScreen} />
     <HomeStack.Screen name="BehaviorListScreen" component={BehaviorListScreen} options={{ headerTitle: "New Behavior"}} />
   </HomeStack.Navigator>
  );
  
}


