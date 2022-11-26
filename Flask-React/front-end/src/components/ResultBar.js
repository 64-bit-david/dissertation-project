import React from 'react'
import {Header} from 'semantic-ui-react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SentimentBar from './SentimentBar';

const ResultBar = ({newsData, website, height, width, numOfWords, sentimentData}) => {

  return (
          <div style={barStyles}>
            <Header as='h3' textAlign='center'>Word Frequency Results for {website}</Header>
            <ResponsiveContainer width={'99%'} height={height}>
            <BarChart  data={newsData.slice(0, numOfWords)}>
              <Bar dataKey="count" fill="#2185d0" />
              <XAxis dataKey="value" />
              <YAxis dataKey="count" />
            </BarChart>
            </ResponsiveContainer>
            <SentimentBar type={'positive'} percent={sentimentData['pos']}/>
            <SentimentBar type={'negative'} percent={sentimentData['neg']}/>
            <SentimentBar type={'neutral'} percent={sentimentData['neu']}/>
          </div>
  )
}

const barStyles = {
  display: "flex",
  flexDirection: 'column',
  justifyContent: "center",
  // alignItems: "center",
}

export default ResultBar;