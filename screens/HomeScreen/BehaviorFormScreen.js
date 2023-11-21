import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector, dispatch , useDispatch} from 'react-redux';
import { addBehavior, removeBehavior } from '../../store/redux/behaviorLogs';
import { addUserBehavior } from '../../store/redux/users';
import { set } from 'react-native-reanimated';

export default function BehaviorFormScreen( {route, navigation} )
{

  const [ date, setDate ] = useState(null);

  const dispatch = useDispatch();

  useEffect( () => {
    let today = new Date();
    let date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear(); // get current date
    setDate(date);
  }, []);
        const behaviorList = useSelector((state) => state.behaviorLogs.behaviorLogs);

        const behaviorName = route.params.behaviorName;

        const authToken = useSelector( (state) => state.authTokens.data[0]); 


    const [enteredName, setEnteredName] = useState(behaviorName);

    const [enteredNote, setEnteredNote] = useState('');
    
    const [enteredIcon, setEnteredIcon] = useState('');
    const [enteredGoalCount, setEnteredGoalCount] = useState('');
    const [type, setType] = useState(behaviorName)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


  // set user info
    function nameInputHandler(enteredName) {

      setEnteredName(enteredName);
    
      };

      function noteInputHandler(enteredNote) {

        setEnteredNote(enteredNote);
      
        };

    function iconInputHandler(enteredIcon) {

  
        setEnteredIcon(enteredIcon);
  
      
        };

      function goalCountInputHandler(enteredGoalCount) {

    
          setEnteredGoalCount(enteredGoalCount);
        
          };

      function startDateInputHandler(enteredStartDate) {

    
          setStartDate(enteredStartDate);
        
          };

          function endDateInputHandler(enteredEndDate) {

    
            setEndDate(enteredEndDate);
          
            };

 
      function addBehaviorHandler() {
         /*dispatch(addBehavior(
           {
             id: Math.random().toString(),
             name: enteredName,
             icon: enteredIcon,
             count: 0,
             goalCount: enteredGoalCount,
             memo: "",
             date: date,
             type: type
           }
         ));*/ 


         dispatch(addUserBehavior(
          {
            username: authToken.email,
            behaviorID: Math.random().toString(),
            description:"",
            startDate: startDate,
            endDate: endDate,
            behaviorName: enteredName,
            icon: enteredIcon,
            frequency: "Daily",
            count: 0,
            goalCount: enteredGoalCount,
            goalMeasurment: "",
            type: type
          }
        ));
         

         navigation.navigate("HomeScreen");

      }

      function cancelBehaviorHandler() {
        navigation.goBack();
      }

    return (
        <View style ={styles.inputContainer}>
          <Text style ={styles.textStyle}>Name</Text>
         { (behaviorName == "New") && (<TextInput 
        style={styles.textInput} 
        placeholder={behaviorName}
        defaultValue={behaviorName}

         onChangeText={nameInputHandler}
         value={enteredName}
         />)
         }
        { (behaviorName != "New") && (
          <Text>{behaviorName}</Text>
         ) }
        
        <Text style ={styles.textStyle}>Note</Text>
        <TextInput 
        style={styles.textInput} 
        placeholder={enteredNote}
        defaultValue={enteredNote}

         onChangeText={noteInputHandler}
         value={enteredNote}
         />
         <Text style ={styles.textStyle}>Icon and Color</Text>
         <TextInput 
        style={styles.textInput} 

        onChangeText={iconInputHandler}
         value={enteredIcon}
         />
         <Text style ={styles.textStyle}>Goal and Goal Period</Text>
         <TextInput 
        style={styles.textInput} 

        onChangeText={goalCountInputHandler}
         value={enteredGoalCount}
         />
         <Text style ={styles.textStyle}>Start Date</Text>
         <TextInput 
        style={styles.textInput} 

        onChangeText={startDateInputHandler}
         value={startDate}
         />
         <Text style ={styles.textStyle}>End Date</Text>
         <TextInput 
        style={styles.textInput} 

        onChangeText={endDateInputHandler}
         value={endDate}
         />


         <View style={styles.buttonContainer}>
             <View style={styles.button} >
                <Button title="Submit" onPress={addBehaviorHandler} color="black"/>
            </View>

        </View>
      </View>
    )
};

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
        backgroundColor: '#F0F0F0',
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
  