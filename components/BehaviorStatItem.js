import {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSelector, dispatch, useDispatch } from 'react-redux';
import { authenticateAuthTokens, logoutAuthTokens } from '../store/redux/authTokens';




function BehaviorStatItem(props) {

    const navigation = useNavigation();

    const authToken = useSelector( (state) => state.authTokens.data[0]); 


    const userList = useSelector( (state) => state.users.users);
    const currUser = userList.filter(user => user.username == authToken.email);
    const behaviorList = currUser[0].behaviorLogs;

    const [ date, setDate ] = useState(null);

    useEffect( () => {
      let today = new Date();
      let date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
      setDate(date);
      
    }, []);
  

    function pressHandler() {
      props.onPress(props.behaviorName, props.id, props.behaviorID, props.date
      )
    }

    function calculateGoalAchievementRate() 
    {
      var totalMeasurment = 0;
      var completedMeasurment = 0;

      for (var i = 0; i < behaviorList.length; i++)
      {

        if (behaviorList[i].behaviorID == props.behaviorID)
        {

          let thisDate = new Date(behaviorList[i].date.substring(0,4)
          ,behaviorList[i].date.substring(5,7)-1,
          behaviorList[i].date.substring(8,10)
      );
      let today = new Date();


          if (thisDate <= today)
          {
          console.log("There is lesser date!");
          totalMeasurment+=behaviorList[i].goalCount;
          completedMeasurment+=behaviorList[i].count;
          }
        }
      }

      return (completedMeasurment)/(totalMeasurment);
    }

    // Calculate total measurements for a specific user behavior?
    function calculateTotalTimeDone()
    {
      var totalMeasurment = 0;
      var completedMeasurment = 0;

      for (var i = 0; i < behaviorList.length; i++)
      {

        if (behaviorList[i].behaviorID == props.behaviorID)
        {

          let thisDate = new Date(behaviorList[i].date.substring(0,4)
          ,behaviorList[i].date.substring(5,7)-1,
          behaviorList[i].date.substring(8,10)
      );
      let today = new Date();


          if (thisDate <= today)
          {
          console.log("There is lesser date!");
          totalMeasurment+=behaviorList[i].goalCount;
          completedMeasurment+=behaviorList[i].count;
          }
        }
      }

      return (completedMeasurment);
    }
    

    return (
        <View style={styles.behaviorItem}>
        <Pressable 
        android_ripple ={{color:'#210644'}}
        onPress={pressHandler}
        style={({pressed}) => pressed && styles.pressedItem}
        > 
        <View> 
        <Text style={styles.behaviorText}>{props.name}</Text>
      <Text>Goal Achievement rate: {calculateGoalAchievementRate()}</Text>
      <Text>Total Done: {calculateTotalTimeDone()}</Text>
        </View>
        </Pressable>
        </View>
    );
}

export default BehaviorStatItem;

const styles = StyleSheet.create({
  behaviorItem: {
    margin: 8,
    backgroundColor: 'white',
    color: 'black',
    height: 60,
  },
  pressedItem: {
    opacity: 0.5
  },
  behaivorText: {
    color: 'black',
    padding: 20,
  }
});
