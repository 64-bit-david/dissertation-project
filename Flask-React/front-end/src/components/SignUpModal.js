import React, { useState } from 'react'
import {Modal, Button, Container, Form, Header, Icon} from 'semantic-ui-react';




const SignUpModal = (
                    {modalLogInIsOpen,
                     setModalLogInIsOpen, 
                     modalSignUpIsOpen, 
                     setModalSignUpIsOpen }) => {


  

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false)
  const [signUpError, setSignUpError] = useState(false)                    




  const handleModalSwitch = () => {
    setModalLogInIsOpen(!modalLogInIsOpen)
    setModalSignUpIsOpen(!modalSignUpIsOpen)
    setSignUpSuccess(false)
  }

  const handleSignUpUsername = (e) => {
    setSignUpUsername(e.target.value)
  }
    
  const handleSignUpPassword = (e) => {
    setSignUpPassword(e.target.value)
  }

  const handleSignUpPasswordConfirm = (e) => {
    setSignUpPasswordConfirm(e.target.value)
  }



  const handleSignInSubmit = () => {
    const loginUrl = 'http://127.0.0.1:5000/api/v1/auth/sign-up'


    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'username': signUpUsername,
        'password': signUpPassword,
        'confirm_password': signUpPasswordConfirm
      })
    }

    // setLoadingSignUp(true)

    fetch(loginUrl, reqOptions)
      .then(res => res.json())
      .then(data => {
        // setLoadingLogIn(false)
        setSignUpSuccess(true)
      })
  }
    

  const ModalContentHelper = () => {
    if(!signUpError && !signUpSuccess){
      return(
        <>
        <Container style={modalHeaderStyles}>
        <Modal.Header>Register</Modal.Header>
        </Container>
        <Container style={pStyle}>
            <Header as='h4'>Please enter your credentials to create an account</Header>
        </Container>
        <Form style={formStyle}>
        <Form.Field>
          <label>Username</label>
          <input
              style={inputStyle} 
              placeholder='Enter username..'
              value={signUpUsername}
              onChange={(e)=>handleSignUpUsername(e)}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
               style={inputStyle} 
               placeholder='Enter password..' 
               type='password'
               value={signUpPassword}
               onChange={(e)=> handleSignUpPassword(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input
               style={inputStyle} 
               placeholder='Enter password..' 
               type='password'
               value={signUpPasswordConfirm}
               onChange={(e)=> handleSignUpPasswordConfirm(e)}
          />
        </Form.Field>
        <Form.Field></Form.Field>
        
        <Button
          content="Register"
          inverted color='blue'
          onClick={() => {
            // setModalSignUpIsOpen(false)}
            handleSignInSubmit()
          }}
        />
      </Form>

      <Container style={modalBtnStyles}>

        
          
      <Button
          content="Already have an account? Sign in here"
          size='mini'
          style={{marginTop: '1rem'}}
          onClick={() => handleModalSwitch()}
        />
        </Container>
        </>
      )
    } else if(signUpSuccess){
      return(
          <Container textAlign='center' style={{margin: '3rem 0'}}>
            <Modal.Header as='h2'>
                Registration Successful
            </Modal.Header>
            <Icon
            name='check circle'
            size='huge'
            color='green'
            ></Icon>
            <br/>
            <br/>

          <Button
            content="Go to Sign In"
            primary
            style={{marginTop: '1rem'}}
            onClick={() => handleModalSwitch()}
        />
        <br/>
        <br/>

          <Button
            primary
            onClick={() => {
              setModalSignUpIsOpen(false)
              setSignUpSuccess(false)
            }}
            >Close</Button>
          </Container>
      )
    }
  }


  return (
    <Modal
      onClose={() => setModalSignUpIsOpen(false)}
      onOpen={() => setModalSignUpIsOpen(true)}
      open={modalSignUpIsOpen}
      size='tiny'
    >   
  {/* Calling this functional component like so <ModalContentHelper />
        causes a bug where the input fields lose focus after typing each letter
        This is the easiest workaround to prevent the bug. */}
    {ModalContentHelper()}
      


    </Modal>
      
  )
}



const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}


const inputStyle = {
  margin: '0.25rem 0',
}

const modalHeaderStyles = {
  display: 'flex',
  justifyContent:'center',
  fontSize: '30px',
  margin: '3rem 0 2rem 0'
}

const modalBtnStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent:'center',
  alignItems: 'center',
  margin: '2rem 0 3rem 0'
}

const pStyle = {
    display: 'flex',
    justifyContent:'center',
    marginBottom: '2rem' 
}

export default SignUpModal;


