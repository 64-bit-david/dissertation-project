import {Menu, Modal, Container, Icon, Button} from 'semantic-ui-react';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';






function NavBar( 
                {modalLogInIsOpen,
                 setModalLogInIsOpen, 
                 modalSignUpIsOpen, 
                 setModalSignUpIsOpen,
                 currentUser,
                 setCurrentUser
        }) {


    const [activeItem, setActiveItem] = useState('home')
    const [signOutModalActive, setSignOutModalActive ] = useState(false)
    const [signOutModalSuccess, setSignOutModalSuccess] = useState(false)
    const [signOutError, setSignOutError] = useState(false)



    const navigate = useNavigate()
    const handleItemClick = (e) => {
        setActiveItem(e)
    }

    const handleLogInClick = () => {
        setModalLogInIsOpen(!modalLogInIsOpen);
    }

    const handleSignUpClick = () => {
        setModalSignUpIsOpen(!modalSignUpIsOpen);
    }

    const handleSignOutClickConfirm = () => {
        navigate('/')
        setCurrentUser(null)
        setSignOutModalActive(false)
        setSignOutModalSuccess(true)
        setActiveItem('home')

    }

    const handleLogOutClick = () => {
        setSignOutModalActive(true)
    }


    const AuthButtons = () => {
        if(currentUser){
            return (
                <Menu.Item
                name='Sign Out'
                active={activeItem === 'login'}
                onClick={()=>handleLogOutClick()}
                />
            )
        } else {
            return(
                <>
                <Menu.Item
                name='Sign In'
                active={activeItem === 'login'}
                onClick={()=>handleLogInClick()}
    
                />
                <Menu.Item
                name='Register'
                onClick={()=>handleSignUpClick()}
    
                />
                </>
            )
        }
    }

    const PreviousResults = () => {
        if(currentUser){
            return(
                <Menu.Item
                    name='Previous Results'
                    as={Link}
                    to='/previous-results'
                    active={activeItem === 'previousResults'}
                    onClick={()=>handleItemClick('previousResults')}

                 />
            )
        }
    }

    const SignOutModal = () => {
                    if(signOutModalActive){
                    return(
                        <Modal
                        onClose={() => {
                            setSignOutModalActive(false)
                        }}
                        open={signOutModalActive}
                        size='tiny'
                        style={{padding: '2rem 0'}}
                        >
                            <Container textAlign='center' style={{margin: '3rem 0'}}>
                                <Modal.Header as='h2'>
                                    Confirm Sign Out
                                </Modal.Header>
                                {/* <Icon
                                name='check circle'
                                size='huge'
                                color='green'
                                ></Icon>
                                <br/>
                                <br/> */}

                                <Button
                                    primary
                                    onClick={() => {
                                        handleSignOutClickConfirm()
                                    }}
                                >Sign Out</Button>
                                <Button
                                onClick={() => setSignOutModalSuccess(false)}
                                    primary
                                    >Cancel</Button>
                             </Container>
                        </Modal>
                    )
                }else if(signOutModalSuccess){
                    return(
                        <Modal
                        onClose={() => {
                            setSignOutModalSuccess(false)
                        }}
                        open={signOutModalSuccess}
                        size='tiny'
                        style={{padding: '2rem 0'}}
                        >
                            <Container textAlign='center' style={{margin: '3rem 0'}}>
                                <Modal.Header as='h2'>
                                    Sign Out Successful
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
                                        setSignOutModalSuccess(false)
                                    }}
                                >Close</Button>
                              
                             </Container>
                        </Modal>
                    )
                }
    }



    

    return (
        <>
        <Menu pointing secondary>
        <Menu.Item
            name='home'
            as={Link}
            to='/'
            active={activeItem === 'home'}
            onClick={()=>handleItemClick('home')}
        />
        
        <PreviousResults/>
        <Menu.Menu position='right'>
            <AuthButtons />
        </Menu.Menu>
        </Menu>
        <SignOutModal />
        </>

    )

}


export default NavBar;