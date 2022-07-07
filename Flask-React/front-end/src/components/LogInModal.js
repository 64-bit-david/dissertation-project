import React, { useState } from 'react'
import {Modal, Button, Container, Form} from 'semantic-ui-react';



const LogInModal = (
                    {modalLogInIsOpen,
                     setModalLogInIsOpen, 
                     modalSignUpIsOpen, 
                     setModalSignUpIsOpen }) => {






  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');



  const handleModalSwitch = () => {

  }

  const handleLoginUsername = (e) => {
    setLoginUsername(e.target.value)
  }
    
  const handleLoginPassword = (e) => {
    setLoginPassword(e.target.value)
  }


  return (
    <Modal
      onClose={() => setModalLogInIsOpen(false)}
      onOpen={() => setModalLogInIsOpen(true)}
      open={modalLogInIsOpen}
      size='tiny'
    >   
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
              style={inputStyle} 
              placeholder='Enter username..'
              value={loginUsername}
              onChange={(e)=>handleLoginUsername(e)}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
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
          onClick={() => setModalLogInIsOpen(false)}
          
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


