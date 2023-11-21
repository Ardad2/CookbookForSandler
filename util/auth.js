// get token to authenticate user when creating account or logging in
// The following functions: "authenticate", "createUser", and "login" in this code interact with/make requests to the
// Firebase authentication service (as indicated by the API key below) to authenticate a user attempting to log in

import axios from 'axios';

// Need this API key to make requests to Firebase
const API_KEY = 'AIzaSyAUuZUgvlmMYBOl_Kg43Eb2sHnEJp4_us4'

// function to authenticate user
async function authenticate(mode, email, password) {

    // create the url to make a post request to the Firebase authentication service
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    // make a post request to the Firebase authentication service
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
    });

    // return the token
    const token = response.data.idToken;

    // return the token
    return response.data;
}

// function to create a new user
export function createUser(email, password) {
    return authenticate('signUp', email, password);
}

// function to log in an existing user
export function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}
