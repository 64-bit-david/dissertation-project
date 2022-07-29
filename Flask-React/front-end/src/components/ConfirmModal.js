import {Modal, Button, Container, Icon} from 'semantic-ui-react'
import React from 'react'

const ConfirmModal = (
    {isOpen, 
        setIsOpen, 
        btnFunction, 
        success, 
        setSuccess,
        promptMessage,
        promptSuccess,
        setCloseFromModal,
        error,}) => {

  return (
    <Modal
    onClose={() => {
        setIsOpen(false)
        setSuccess(false)
    }}
    onOpen={() => setIsOpen(true)}
    open={isOpen}
    size='tiny'
    style={{padding: '2rem 0'}}
    >
    {success ? (
        <Container textAlign='center'>
            <Modal.Header as='h2'>
                {promptSuccess}
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
                setIsOpen(false)
                setSuccess(false)
                if(setCloseFromModal){
                    setCloseFromModal(true)
                }
              }}
              >Close</Button>
        </Container>
    ): (
        <Container textAlign='center'>

            <Modal.Header as='h2'>{promptMessage}</Modal.Header>
            <br/>
            <Button
            style={{marginRight: '1rem'}}
            negative
            onClick={() => btnFunction()}
            >Delete</Button>
            <Button
            style={{marginLeft: '1rem'}}
            primary
            onClick={()=> setIsOpen(false)}
            >Cancel</Button>
       </Container>
    	
    )
    } 
    </Modal>

    
  )
}

//  const modalStyle = {
//     padding: '2rem 0'
//  }

 

export default ConfirmModal