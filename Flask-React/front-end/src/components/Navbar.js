import {Menu} from 'semantic-ui-react';
import {useState} from 'react';





function NavBar() {


    const [activeItem, setActiveItem] = useState('home')

    const handleItemClick = (e) => {
        setActiveItem(e)
    }

    return (
        
        <Menu pointing secondary>
        <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={()=>handleItemClick('home')}
        />
        <Menu.Item
            name='Previous Results'
            active={activeItem === 'previousResults'}
            onClick={()=>handleItemClick('previousResults')}

        />
     
        <Menu.Menu position='right'>
            <Menu.Item
            name='Log Out'
            active={activeItem === 'logout'}
            onClick={()=>handleItemClick('friends')}

            />
        </Menu.Menu>
        </Menu>
    )

}


export default NavBar;