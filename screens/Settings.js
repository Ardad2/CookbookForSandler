import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { useState } from 'react';
import { useSelector, dispatch , useDispatch} from 'react-redux';
import { authenticateAuthTokens, logoutAuthTokens } from '../store/redux/authTokens';


export default function Settings() {

  const authToken = useSelector( (state) => state.authTokens.data[0]); 

  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutAuthTokens());
 }

/*
Below is the buttons for navigating to:
 - Profile
 - Vacation Mode
 - Light Mode
 - Dark Mode
 - Sound Effects on/off
 -Logging out
 
 Still need to create a settings
 page that is pleasing to look at.
 Also buttons is more convenient
 than filter drop downs.
 
 Potentially want to be able to edit your 
 username, and name, profile pic, in the settings
 page as well. but could also do that on the profile itself.
 */
  return (
    <View style={styles.container}>
      <Text></Text>
      <View style={styles.buttonContainer}>
             <View style={styles.button} >
             <Button title="My Profile" onPress={logout} color="black"/>
             <Button title="Vacation Mode?" onPress={logout} color="black"/>
             <Button title="Light Mode" onPress={logout} color="black"/>
             <Button title="Dark Mode" onPress={logout} color="black"/>
             <Button title="Sound Effects ON" onPress={logout} color="black"/>
             <Button title="Sound Effects OFF" onPress={logout} color="black"/>
             <Button title="Log Out" onPress={logout} color="black"/>
            </View>
            </View>

    </View>
  );
}
/*
would be cool to add into settings a light screen
or a dark screen option
Im sure it would be relatively easy to implement and something I can look into.

light mode and dark screen mode implemented.

Need to get the settings screen looking more efficient
and use ways that make it easier for the user
to change their settings.
i.e:
 - 1 touch changes
 - filters
 - drop downs
 - buttons
 - dont want the user to have to type or look for a 
   specific setting for to long

   */


   



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
