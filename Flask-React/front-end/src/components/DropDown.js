import React from 'react'
import { Dropdown, Form } from 'semantic-ui-react'


    
const DropDown = ({selectOptions, selectValue, setSelectValue,}) => {

    // const teamateOptions = currentUser.team.teamnates.map(tm => ({
    //   value:tm.id, key: tm.id, text: tm.name
    // }))


    const handleSelectedOption = (e, data) => {
      setSelectValue(data.value)
    }

    return (
      <Form >
        <Dropdown
          floating
          selection
          fluid
          placeholder='Please select'
          value={selectValue}
          options={selectOptions}
          onChange={(e, data) => handleSelectedOption(e, data)}
        />
       

      </Form>
    )

  }
export default DropDown;
  

