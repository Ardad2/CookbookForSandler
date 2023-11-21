import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet,  
  View, 
  FlatList, Button, Text, 
  ScrollView, TouchableOpacity, TouchableWithoutFeedback, Modal, Platform, ActivityIndicator, Pressable
} from 'react-native';
import { useState } from 'react';
import { useSelector, dispatch , useDispatch} from 'react-redux';
import { authenticateAuthTokens, logoutAuthTokens } from '../../store/redux/authTokens'

import BehaviorStatItem from '../../components/BehaviorStatItem';


export default function BehaviorStatScreen() {

  const authToken = useSelector( (state) => state.authTokens.data[0]); 

  const userList = useSelector( (state) => state.users.users);
  const currUser = userList.filter(user => user.username == authToken.email);
  const behaviorList = currUser[0].behaviors;



  return (
    <View style={styles.container}>
      <Text>To do: Behavior Stat Screen</Text>
      <View style={styles.behaviorsContainer}>
      <FlatList data={behaviorList} renderItem = {itemData => {
          return <BehaviorStatItem 
          behaviorID = {itemData.item.behaviorID}
          description = {itemData.item.description}
          startDate = {itemData.item.startDate}
          endDate =  {itemData.item.endDate}
          frequency =  {itemData.item.frequency}
          goalCount = {itemData.item.goalCount}
          goalMeasurment =  {itemData.item.goalMeasurment}
          name = {itemData.item.name}
          //{itemData.name}
          type =  {itemData.item.type}
          icon =  {itemData.item.icon}

          //onDeleteItem={deleteBehaviorHandler}
          //onPress={pressHandler}
          />
z // Might cause error in code?
        }}
        //keyExtractor={(item,index) => {return item.behaviorID}} 
        alwaysBounceVertical={true}
        /> 
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 16,
    backgroundColor: '#F0F0F0',
    flexDirection: "row",
},
behaviorsContainer: {
  flex: 5
},
button: {
    width: 100,
    marginHorizontal: 8
}
});
