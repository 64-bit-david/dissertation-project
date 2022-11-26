import React from 'react'
import {TagCloud} from 'react-tagcloud';
import {Header, Container} from 'semantic-ui-react';
import SentimentBar from './SentimentBar';


const ResultWordCloud = ({newsData, website, numOfWords, sentimentData}) => {

  const options = {
    luminosity: 'dark',
    hue: 'blue',
  }

  return (
          <div>
                <Header as='h3' textAlign='center'>Word Frequency Results for {website}</Header>
                  <TagCloud
                    minSize={20}
                    maxSize={60}
                    colorOptions={options}
                    tags={newsData.slice(0, numOfWords)}
                  />
                <div style={{'margin': '5rem 2rem'}}>
                  <SentimentBar type={'positive'} percent={sentimentData['pos']}/>
                  <SentimentBar type={'negative'} percent={sentimentData['neg']}/>
                  <SentimentBar type={'neutral'} percent={sentimentData['neu']}/>
                </div>
          </div>
  )
}

export default ResultWordCloud;