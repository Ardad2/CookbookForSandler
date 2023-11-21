import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Modal, Image } from 'react-native';

function BehaviorInput(props) {

    const [enteredBehaviorText, setEnteredBehaviorText] = useState('');


    // Behavior functions
    function behaviorInputHandler(enteredText) {
        setEnteredBehaviorText(enteredText);
      };

      function addBehaviorHandler() {
          props.onAddBehavior(enteredBehaviorText);
          setEnteredBehaviorText('');
      }

    return (
        <Modal visible={props.visible} animationType="slide">
        <View style ={styles.inputContainer}>
            <Image style={styles.image} source={require('../assets/goal.png')}/>
        <TextInput 
        style={styles.textInput} 
        placeholder="What did you do today?"
        // placeholder = "What would you like to achieve tomorrow?", to be changed
        
        //Note if it was goalInputHandler() it would get executed as soon as React starts.

         onChangeText={behaviorInputHandler}
         value={enteredBehaviorText}
         />
         <View style={styles.buttonContainer}>
             <View style={styles.button} >
                <Button title="Add Behavior" onPress={addBehaviorHandler} color="black"/>
            </View>
            <View style={styles.button}>
                <Button title="Cancel" onPress={props.onCancel} color="black"/>
            </View>
        </View>
      </View>

      </Modal>
    )
};

export default BehaviorInput;

const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: 'white'
    },
    image: {
        width: 100,
        height: 100,
        margin: 20
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#e4d0ff',
      backgroundColor: '#e4d0ff',
      color: '#120438',
      borderRadius: 6,
      width: '100%',
      padding: 16
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: "row",
    },
    button: {
        width: 100,
        marginHorizontal: 8
    }
  });
  
