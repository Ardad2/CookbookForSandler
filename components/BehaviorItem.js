import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function BehaviorItem(props) {

    const navigation = useNavigation();

    function pressHandler() {
      props.onPress(props.behaviorName, props.id, props.behaviorID, props.date
      )
    }
    
    return (
        <View style={styles.behaviorItem}>
        <Pressable 
        android_ripple ={{color:'#210644'}}
        onPress={pressHandler}
        style={({pressed}) => pressed && styles.pressedItem}
        > 
        <View> 
        <Text style={styles.behaviorText}>{props.behaviorName} {props.count}/{props.goalCount}</Text>
        </View>
        </Pressable>
        </View>
    );
}

export default BehaviorItem;

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
  behaivorText: { // "behaviorText" instead of "behaivorText"?
    color: 'black',
    padding: 20,
  }
});
