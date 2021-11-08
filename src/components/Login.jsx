import React, { useState } from 'react'
import { Form, Button, Loader, Message } from 'semantic-ui-react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'

import { firebase } from "../firebase/firebase.config"
import { styles } from './styles/Register'

const auth = getAuth(firebase)

const Login = () => {
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
      signInWithEmailAndPassword(auth, email, password)
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
        <Message.Header>{errorMessage ? errorMessage: 'Opps... Something went wrong!'}</Message.Header>
      </Message>
    )
    const successMessage = (
      <Message success visible>
        <Message.Header>Successfully Logged In!</Message.Header>
      </Message>
    )                        

    return (
        <div style={styles.container}>
        <Form style={styles.form}>
            <h1 style={styles.heading}>Login</h1>
            
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
          type='submit' 
          onClick={handleSubmit}
          style={{...styles.button, width: '70%'}} 
          >
            {loading ? <Loader active inline /> :'Login'}
          </Button>
        </div>
      <h3 style={styles.h3}>Don't have an Account? <Link to='/register'>Sign Up</Link></h3>
          {!showMessage ? null : errorMessage ? warningMessage: successMessage}
      </Form>
      </div>

    )
}

export default Login
