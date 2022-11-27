import {Menu, Modal, Container, Icon, Button, Header} from 'semantic-ui-react';
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
    const [aboutModalActive, setAboutModalActive] = useState(false)
    const [signOutError, setSignOutError] = useState(false)



    const navigate = useNavigate();

    const handleItemClick = (e) => {
        setActiveItem(e);
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

    const AboutModal = () => {
        if(aboutModalActive){
            return(
                <Modal
                onClose={() => {
                    aboutModalActive(false)
                }}
                open={aboutModalActive}
                size='tiny'
                style={{padding: '2rem 0'}}
                >
                    <Container textAlign='center' style={{margin: '2rem 0'}}>
                        <Modal.Header as='h2'>
                            About
                        </Modal.Header>

                        <Header as='h3'>Welcome to the News Trends Analyser!</Header>

                        <br/>


                        <p style={pStyle}>
                            This website allows you to generate a visualisation of the most
                            common words in the headlines of either one or two well known news websites.
                        </p>
                        <p style={pStyle}>
                            From the homepage select the Word Frequency option to view the most common headline words of a single website.
                        </p>
                        <p style={pStyle}>
                            Select the Word Frequency Compare option to view the most common headline words of two websites
                            so you may analysis any differences.
                        </p>
                        <p style={pStyle}>
                            Register an account and log in to save the results you generate,
                            and access these saved results in the previous results section.
                        </p>

                        <Button
                            primary
                            onClick={() => {
                                setAboutModalActive(false)
                            }}
                        >Close</Button>
                      
                    </Container>
                </Modal>)
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

                                <Button
                                    primary
                                    onClick={() => {
                                        handleSignOutClickConfirm()
                                    }}
                                >Sign Out</Button>
                                <Button
                                onClick={() => {
                                    setSignOutModalActive(false)                                
                                    setSignOutModalSuccess(false)}}
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
        <Menu stackable pointing secondary color='blue' inverted>
        <Menu.Item
            name='home'
            as={Link}
            to='/'
            active={activeItem === 'home'}
            onClick={()=>handleItemClick('home')}
        />
        <PreviousResults/>
        <Menu.Item
            name='historicalHome'
            as={Link}
            to='/historical-results'
            active={activeItem === 'historicalHome'}
            onClick={()=>handleItemClick('historicalHome')}
        />
        <Menu.Item
             name='about'
             active={activeItem === 'about'}
             onClick={()=>setAboutModalActive(!aboutModalActive)}
             />
        <Menu.Menu position='right'>
            <AuthButtons />
        </Menu.Menu>
        </Menu>
        <SignOutModal />
        <AboutModal/>
        </>

    )

}


const pStyle = {
    padding: '0 20px'
}





export default NavBar;