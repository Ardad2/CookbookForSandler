import {View, Text, Button, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector, dispatch , useDispatch} from 'react-redux';
import { incrementBehavior, decrementBehavior } from '../../store/redux/users';
import { produceWithPatches } from 'immer';


function BehaviorDetailScreen( {route, navigation} )
{
    function pressHandler() {
        navigation.navigate("HomeScreen");
      }

    const dispatch = useDispatch();

    const authToken = useSelector( (state) => state.authTokens.data[0]); 

    //const behaviorList = useSelector( (state) => state.users.users[0].behaviors);
    
    const userList = useSelector( (state) => state.users.users);
    const currUser = userList.filter(user => user.username == authToken.email);
    const behaviorList = currUser[0].behaviorLogs;






    const name = route.params.name;
    const id = route.params.id;
    const behaviorID = route.params.behaviorID;
    const date = route.params.date;

    var behaviorIndex = 0;

    for (var i = 0; i < behaviorList.length ; i++)
    {                
        if (behaviorList[i].behaviorLogID == id && behaviorList[i].behaviorID == behaviorID && behaviorList[i].date == date) {
            behaviorIndex = i;
        }
    }

    function decrementGoalCount() {
        console.log("Decreasing!" + name);
        dispatch(decrementBehavior(
            {
                username: authToken.email,
                behaviorName: behaviorList[behaviorIndex].behaviorName,
                date: behaviorList[behaviorIndex].date
            }
          ));
     }

     function incrementGoalCount() {
        console.log("Increasing!" + name);
        dispatch(incrementBehavior(
            {
                username: authToken.email,
                behaviorName: behaviorList[behaviorIndex].behaviorName,
                date: behaviorList[behaviorIndex].date
            }
          ));
    }

    return (
        <View> 
        <Text>{behaviorList[behaviorIndex].behaviorName}</Text>
        <Text>{behaviorList[behaviorIndex].date}</Text>

        <View style={styles.buttonContainer}>
             <View style={styles.button} >
                <Button title="+" onPress={incrementGoalCount} color="black"/>
            </View>
            <Text>{behaviorList[behaviorIndex].count} / {behaviorList[behaviorIndex].goalCount}</Text>
            <View style={styles.button} >
                <Button title="-" onPress={decrementGoalCount} color="black"/>
            </View>
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      padding: 16,
      backgroundColor: 'white'
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#F0F0F0',
      backgroundColor: '#F0F0F0',
      color: '#120438',
      borderRadius: 6,
      width: '100%',
      padding: 8
    },
    buttonContainer: {
        marginTop: 16,
        backgroundColor: '#FFFFFF',
        flexDirection: "row",
    },
    button: {
        width: 100,
        marginHorizontal: 8
    },
    textStyle: {
      fontWeight: 'bold',
      padding: 10
    }
  });
  

export default BehaviorDetailScreen;