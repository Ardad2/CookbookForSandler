import { useState } from 'react';
import AuthContent from '../../components/Auth/AuthContent';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import {createUser} from '../../util/auth';
import { Alert } from 'react-native';
import { useSelector, dispatch , useDispatch} from 'react-redux';
import { authenticateAuthTokens, logoutAuthTokens } from '../../store/redux/authTokens';
import { createUserWithEmailAndPassword } from 'firebase/auth';
//import {auth} from '../../firebase';
import { auth, db } from '../../firebase';
import { addUser } from '../../store/redux/users';


function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const dispatch = useDispatch();

  const authToken = useSelector( (state) => state.authTokens.data[0]); 


  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const data = await createUser(email, password);
       
      console.log(data.idToken);

      dispatch(addUser(
        {
          username: data.email,
        }
      ));


//      createUserWithEmailAndPassword(auth,email,password);
      

      dispatch(authenticateAuthTokens(
        {
          token: data.idToken,
          email: data.email
        }
      ));

    }catch (error) {
      console.log(error);
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {

    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;