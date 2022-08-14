import React from 'react';
import {Container, Button, Header} from 'semantic-ui-react';

const ErrorPage = ({errorCode, setState1, setState2, setState3, errCode, setError}) => {
  return (
    <div style={{marginTop:'10vh'}}>
      <Container textAlign='center'>
        <Header as='h2'>Oops, an error occurred with a status code of {errCode}. Please try again!</Header>
        <Button style={{marginTop: '3rem'}}primary onClick={() => {
                            setState1(false)
                            setError(false)
                        }}>Back to Home</Button>
        </Container>
    </div>
  )
}

export default ErrorPage
