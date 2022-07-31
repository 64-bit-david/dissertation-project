import React, { useState } from 'react'
import {Modal, Button, Container, Form} from 'semantic-ui-react';



const SignUpModal = (
                    {modalLogInIsOpen,
                     setModalLogInIsOpen, 
                     modalSignUpIsOpen, 
                     setModalSignUpIsOpen }) => {


  

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState('');




  const handleModalSwitch = () => {
    setModalLogInIsOpen(!modalLogInIsOpen)
    setModalSignUpIsOpen(!modalSignUpIsOpen)
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

    


  return (
    <Modal
      onClose={() => setModalSignUpIsOpen(false)}
      onOpen={() => setModalSignUpIsOpen(true)}
      open={modalSignUpIsOpen}
      size='tiny'
    >   
      <Container style={modalHeaderStyles}>
        <Modal.Header>Register</Modal.Header>
        </Container>
        <Container style={pStyle}>
            <p>Please enter your credentials to create an account</p>
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
          // size='big'
          // labelPosition='right'
          onClick={() => setModalSignUpIsOpen(false)}
          
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


    </Modal>
      
  )
}

const inputContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: '.5rem' 
}

export default SignUpModal;


