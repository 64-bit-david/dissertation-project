import React, {useState} from 'react'
import { Dropdown, Form } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive';





    
const DropDown = ({selectOptions, selectValue, setSelectValue,}) => {

  
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })



    const handleSelectedOption = (e, data) => {
      setSelectValue(data.value)
    }

  const dropDownWidth = () => {
    if (isBigScreen || isDesktopOrLaptop){
      return '30vw'
    }else{
      return '60vw'
    }
  }

    return (
      <Form >
        <div style={{display: 'flex', justifyContent:'center'}}>
          <div style={{width: dropDownWidth()}} textAlign='center'>
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
  

