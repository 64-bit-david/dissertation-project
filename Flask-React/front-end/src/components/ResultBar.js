import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultBar = ({newsData}) => {
    

  return (
    
          <BarChart width={800} height={400} data={newsData.slice(0, 10)}>
            <Bar dataKey="count" fill="#8884d8" />
            <XAxis dataKey="value" />
          </BarChart>
  )
}

export default ResultBar