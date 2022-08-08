import React, { useState } from 'react'
import {Modal, Button, Container, Form, Icon} from 'semantic-ui-react';
import ConfirmModal from './ConfirmModal';



const LogInModal = (
                    {modalLogInIsOpen,
                     setModalLogInIsOpen, 
                     modalSignUpIsOpen, 
                     setModalSignUpIsOpen,
                     currentUser,
                     setCurrentUser }) => {






  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loadingLogIn, setLoadingLogIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);






  const handleModalSwitch = () => {
    setModalLogInIsOpen(!modalLogInIsOpen)
    setModalSignUpIsOpen(!modalSignUpIsOpen)
  }

  const handleLoginUsername = (e) => {
    setLoginUsername(e.target.value)
  }
    
  const handleLoginPassword = (e) => {
    setLoginPassword(e.target.value)
  }


  const handleLogInSubmit = () => {
    const loginUrl = 'http://127.0.0.1:5000/api/v1/auth/login'


    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'username': loginUsername,
        'password': loginPassword
      })
    }

    setLoadingLogIn(true)

    fetch(loginUrl, reqOptions)
      .then(res => res.json())
      .then(data => {
        setCurrentUser(data.user)
        // setLoadingLogIn(false)
        // setModalLogInIsOpen(false)
        setLoginSuccess(true)
      })
  }


  const ModalContentHelper = () => {
    if(!loginSuccess && !loginError){
      return(
              <>
                <Container style={modalHeaderStyles}>
                        <Modal.Header>Sign In</Modal.Header>
                        </Container>
                        <Container style={pStyle}>
                            <p>Please enter your credentials to sign in to your account</p>
                        </Container>

                      <Form style={formStyle}>
                        <Form.Field>
                          <label>Username</label>
                          <input
                              key='username'
                              style={inputStyle} 
                              placeholder='Enter username..'
                              value={loginUsername}
                              onChange={(e)=>handleLoginUsername(e)}/>
                        </Form.Field>
                        <Form.Field>
                          <label>Password</label>
                          <input
                              key='password'
                              style={inputStyle} 
                              placeholder='Enter password..' 
                              type='password'
                              value={loginPassword}
                              onChange={(e)=> handleLoginPassword(e)}
                          />
                        </Form.Field>
                        <Form.Field></Form.Field>
                        
                        <Button
                          content="Sign In"
                          inverted color='blue'
                          // size='big'
                          // labelPosition='right'
                          // onClick={() => setModalLogInIsOpen(false)}
                          onClick={() => handleLogInSubmit()}

                          
                        />
                      </Form>
                      <Container style={modalBtnStyles}> 
                          <Button
                          content="Don't have an account? Sign Up here"
                          size='mini'
                          style={{marginTop: '1rem'}}
                          onClick={() => handleModalSwitch()}
                        />
                        </Container>
                  </>
      );
    }else if(loginSuccess){
      return (
        <Container textAlign='center' style={{margin: '3rem 0'}}>
        <Modal.Header as='h2'>
            Sign In Successful
        </Modal.Header>
        <Icon
         name='check circle'
         size='huge'
         color='green'
         ></Icon>
         <br/>
         <br/>

         <Button
          primary
          onClick={() => {
            setModalLogInIsOpen(false)
            setLoginSuccess(false)
          }}
          >Close</Button>
    </Container>
      )
    }
  }

 

  return (
    <Modal
      onClose={() => setModalLogInIsOpen(false)}
      onOpen={() => setModalLogInIsOpen(true)}
      open={modalLogInIsOpen}
      size='tiny'
    >   

    {/* Calling this functional component like so <ModalContentHelper />
        causes a bug where the input fields lose focus after typing each letter
        This is the easiest workaround to prevent the bug. */}
    {ModalContentHelper()}
    </Modal>
      
  )
}

const inputContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const inputStyle = {
  margin: '.25rem 0'
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
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
  marginBottom: '.5rem' 
}


export default LogInModal;


