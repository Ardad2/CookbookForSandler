import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { useState } from 'react';
import { useSelector, dispatch , useDispatch} from 'react-redux';
import { authenticateAuthTokens, logoutAuthTokens } from '../store/redux/authTokens';


export default function Report() { //Note: this is a function that is passed in as a prop from App.js

    const authToken = useSelector( (state) => state.authTokens.data[0]);

    const dispatch = useDispatch();

    function behaviorReport() { // dispatch(behaviorReportAuthTokens());
        // dispatch(behaviorReport());
    }

    function habitReport() { // dispatch(habitReportAuthTokens());
        // dispatch(habitReport());
        // where the user can see progress in behaviors over an X amount of time.
    }

    function groupReport() { // dispatch(groupReportAuthTokens());
        // dispatch(groupReport());
    }

    function vacationMode() { // dispatch(vacationModeAuthTokens());
        // dispatch(vacationMode());
    }

    function SoundEffects() { // dispatch(soundEffectsAuthTokens());
        // dispatch(soundEffects());
    }

    function myProfile() { // dispatch(myProfileAuthTokens());
        // dispatch(myProfile());
    }

    function logout() {
        dispatch(logoutAuthTokens());
    }


  return ( //Note: this is a function that is passed in as a prop from App.js
    <View style={styles.container}>
      <Text></Text>
      <View style={styles.buttonContainer}>
             <View style={styles.button} >
             <Button title="My Profile" onPress={logout} color="black"/>
             <Button title="Vacation Mode?" onPress={logout} color="black"/>
                <Button title="Log Out" onPress={logout} color="black"/>
            </View>
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
button: {
    width: 100,
    marginHorizontal: 8
}
});
