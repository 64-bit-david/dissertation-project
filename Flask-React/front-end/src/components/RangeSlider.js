import React, {useState} from 'react'
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'


const RangeSlider = ({volume, setVolume}) => {

//   const [volume, setVolume] = useState(0);


  const handleChange = (value) => {
    setVolume(value)
  }

  return (
    <Slider
        value={volume}
        onChange={handleChange}
        min={1}
        max={60}
    />
  )
}



export default RangeSlider
