import {Menu} from 'semantic-ui-react';
import {useState} from 'react';
import {Link} from 'react-router-dom';





function NavBar( 
                {modalLogInIsOpen,
                 setModalLogInIsOpen, 
                 modalSignUpIsOpen, 
                 setModalSignUpIsOpen,
                 currentUser,
                 setCurrentUser
        }) {


    const [activeItem, setActiveItem] = useState('home')

    const handleItemClick = (e) => {
        setActiveItem(e)
    }

    const handleLogInClick = () => {
        setModalLogInIsOpen(!modalLogInIsOpen);
        // setModalSignUpIsOpen(!modalSignUpIsOpen);
    }

    const handleLogOutClick = () => {
        setCurrentUser(null)
    }


    const AuthButton = () => {
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
                <Menu.Item
                name='Sign In'
                active={activeItem === 'login'}
                onClick={()=>handleLogInClick()}
    
                />
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


    return (
        
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
            <AuthButton />
        </Menu.Menu>
        </Menu>
    )

}


export default NavBar;