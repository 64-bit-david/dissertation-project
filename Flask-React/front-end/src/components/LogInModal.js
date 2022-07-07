import React, { useState } from 'react'
import {Modal, Button, Input, Container} from 'semantic-ui-react';



const LogInModal = ({modalLogInIsOpen, setModalLogInIsOpen}) => {




    


  return (
    <Modal
      onClose={() => setModalLogInIsOpen(false)}
      onOpen={() => setModalLogInIsOpen(true)}
      open={modalLogInIsOpen}
    >   
      <Container style={modalHeaderStyles}>
        <Modal.Header>Sign In</Modal.Header>
        </Container>
        <Container style={inputContainerStyles}>
          <Input style={inputStyle} placeholder='Enter username..'/>
          <Input style={inputStyle} placeholder='Enter password..'/>
        </Container>
        <Modal.Actions>

      <Container style={modalBtnStyles}>

        <Button
          content="Sign In"
          // labelPosition='right'
          onClick={() => setModalLogInIsOpen(false)}
          
        />
        </Container>
      </Modal.Actions>

    </Modal>
      
  )
}

const inputContainerStyles = {
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'alignItems': 'center'
}

const inputStyle = {
  'width': '45%',
  'margin': '1em 0'
}

const modalHeaderStyles = {
  'display': 'flex',
  'justifyContent':'center',
  fontSize: '30px',
  margin: '2rem 0'
}

const modalBtnStyles = {
  'display': 'flex',
  'justifyContent':'center'
}

export default LogInModal;


