import React, {useState} from 'react'
import { Dropdown, Form } from 'semantic-ui-react'


    
const DropDown = ({selectOptions, selectValue, setSelectValue,}) => {


    const handleSelectedOption = (e, data) => {
      setSelectValue(data.value)
    }

    return (
      <Form >
        <div style={{display: 'flex', justifyContent:'center'}}>
          <div style={{width: '60vw'}} textAlign='center'>
            <Dropdown
              floating
              selection
              fluid
              placeholder='Please select'
              value={selectValue}
              options={selectOptions}
              onChange={(e, data) => handleSelectedOption(e, data)}
            />
       
        </div>
        </div>
      </Form>
    )

  }
export default DropDown;
  

