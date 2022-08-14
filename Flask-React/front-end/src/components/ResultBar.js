import React from 'react'
import {Header} from 'semantic-ui-react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultBar = ({newsData, website, height, width}) => {



  return (
          <div style={barStyles}>
            <Header as='h3' textAlign='center'>Word Frequency Results for {website}</Header>
            <BarChart width={width} height={height} data={newsData.slice(0, 10)}>
              <Bar dataKey="count" fill="#8884d8" />
              <XAxis dataKey="value" />
              <YAxis dataKey="count" />
            </BarChart>
          </div>
  )
}

const barStyles = {
  display: "flex",
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: "center",
  
}

export default ResultBar