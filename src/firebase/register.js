import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { firebase } from "./firebase.config"

const auth = getAuth(firebase)

export const registerUser = (email,password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            return userCredentials.user
        }).catch(error => {
            console.error(error)
        })
}

export const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('success')
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        });
}

// registerUser('abc@gmail.com', '123456789')