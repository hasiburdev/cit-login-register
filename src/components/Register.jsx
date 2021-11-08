import React, { useState } from 'react'
import { Form, Button, Loader, Message } from 'semantic-ui-react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {Link} from 'react-router-dom'


import { firebase } from "../firebase/firebase.config"
import { styles } from './styles/Register'
// import { registerUser } from '../firebase/register'

const auth = getAuth(firebase)

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)

    const handleSubmit = (e) => {
      e.preventDefault()
      console.clear()
      console.log(email,password)
      setLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        setErrorMessage('')
          setLoading(false)
          setShowMessage(true)
          setTimeout(() => { setShowMessage(false)}, 3000)
          const user = userCredentials.user
          console.log(user)
      }).catch(error => {
          setShowMessage(true)
          setErrorMessage(error.message)
          setTimeout(() => { setShowMessage(false)}, 3000)
          setLoading(false)
          console.error(error)
          
      })
    }

    const warningMessage = (
      <Message warning visible>
        <Message.Header>{errorMessage ? errorMessage: 'Something went wrong!'}</Message.Header>
      </Message>
    )
    const successMessage = (
      <Message success visible>
        <Message.Header>Account Created Successfully!</Message.Header>
      </Message>
    )                        

    return (
        <div style={styles.container}>
        <Form style={styles.form}>
            <h1 style={styles.heading}>Create An Account</h1>
            
        <Form.Field>
          <input 
            placeholder='Email' 
            type='email' 
            onChange={e => setEmail(e.target.value)}
            />
        </Form.Field>
        <Form.Field>
          <input 
            placeholder='Password' 
            type='password' 
            onChange={e => setPassword(e.target.value)}
            />
        </Form.Field>
        <div style={styles.buttonWrappar}>
        <Button 
          style={styles.button} 
          type='submit' 
          onClick={handleSubmit}
          >
            {loading ? <Loader active inline /> :'Create Account'}
          </Button>
        </div>
      <h3 style={styles.h3}>Already have an Account? <Link to='/login'>Login</Link></h3>
          {!showMessage ? null : errorMessage ? warningMessage: successMessage}
      </Form>
      </div>

    )
}

export default Register
