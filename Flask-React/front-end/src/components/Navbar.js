import {Menu} from 'semantic-ui-react';
import {useState} from 'react';
import {Link} from 'react-router-dom';





function NavBar({modalLogInIsOpen, setModalLogInIsOpen}) {


    const [activeItem, setActiveItem] = useState('home')

    const handleItemClick = (e) => {
        setActiveItem(e)
    }

    const handleLogInClick = () => {
        setModalLogInIsOpen(!modalLogInIsOpen);
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
        <Menu.Item
            name='Previous Results'
            as={Link}
            to='/previous-results'
            active={activeItem === 'previousResults'}
            onClick={()=>handleItemClick('previousResults')}

        />
     
        <Menu.Menu position='right'>
            <Menu.Item
            name='Log In'
            active={activeItem === 'login'}
            onClick={()=>handleLogInClick()}

            />
        </Menu.Menu>
        </Menu>
    )

}


export default NavBar;