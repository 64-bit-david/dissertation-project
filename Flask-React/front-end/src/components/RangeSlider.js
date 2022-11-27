import React from 'react'
import Slider from 'react-rangeslider';
import { useMediaQuery } from 'react-responsive';
import 'react-rangeslider/lib/index.css'
import { Container } from 'semantic-ui-react';

const RangeSlider = ({volume, setVolume}) => {

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const sliderStyleWidthHelper = () => {
    if(isBigScreen || isDesktopOrLaptop){
      return ('20vw')
    }else{
      return '90vw'
    }
  }


  const handleChange = (value) => {
    setVolume(value)
  }

  return (
    <Container style={{width: sliderStyleWidthHelper()}}>
      <Slider
          value={volume}
          onChange={handleChange}
          min={1}
          max={60}
          
      />
    </Container>
  )
}


export default RangeSlider;
