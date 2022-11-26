import React from 'react'
import {Progress} from 'semantic-ui-react';

const SentimentBar = ({type, percent}) => {

  console.log(typeof(percent))

const colors = {'positive': 'green',
                'negative': 'red',
                'neutral': 'grey'}

const textValue = {'positive': 'Postive Sentiment',
                'negative': 'Negative Sentiment',
                'neutral': 'Neutral Sentiment'}                
  
    return (
      <Progress percent={Math.round(percent*100)} color={colors[type]} progress >
        {textValue[type]}
      </Progress>
  )
}

export default SentimentBar
