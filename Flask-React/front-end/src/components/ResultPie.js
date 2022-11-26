import React, { useEffect, useState, useLayoutEffect } from 'react';
import { RadialChart } from 'react-vis';
import {Header} from 'semantic-ui-react';
import SentimentBar from './SentimentBar';






const ResultPie = ({newsData, website, width, height, numOfWords, sentimentData}) => {

    

    const newData = newsData.map(item => ({angle: item.count, label: item.value}))
    
    const colorArray = ['#73CBFA', '#63BDF2', '#52AFE9', '#42A1E1', '#3193D8']


    return (
        <div>
        <Header as='h3' textAlign='center'>Word Frequency Results for {website}</Header>
        <div style={pieChartStyle}>
            <RadialChart
                data={newData.slice(0, numOfWords)}
                width={width}
                height={height}
                // color='green'
                colorRange={colorArray}
                labelsRadiusMultiplier={1.1}
                labelsStyle={{
                    fontSize: 16
                }}
                showLabels 
                animation={{ damping: 10, stiffness: 20 }}
                />
        </div>
        <SentimentBar type={'positive'} percent={sentimentData['pos']}/>
        <SentimentBar type={'negative'} percent={sentimentData['neg']}/>
        <SentimentBar type={'neutral'} percent={sentimentData['neu']}/>
        </div>
    )
}

const pieChartStyle = {
    display: 'grid',
    placeItems: 'center',
    margin: '0 4rem'
}

export default ResultPie