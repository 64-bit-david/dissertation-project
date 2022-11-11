import React, { useEffect, useState, useLayoutEffect } from 'react';
import { RadialChart } from 'react-vis';
import {Header} from 'semantic-ui-react';






const ResultPie = ({newsData, website, width, height}) => {

    

    const newData = newsData.map(item => ({angle: item.count, label: item.value}))


    return (
        <div>
        <Header as='h3' textAlign='center'>Word Frequency Results for {website}</Header>
        <div style={pieChartStyle}>
            <RadialChart
                data={newData.slice(0, 10)}
                width={width}
                height={height}
                labelsRadiusMultiplier={1.1}
                labelsStyle={{
                    fontSize: 16
                }}
                showLabels 
                animation={{ damping: 10, stiffness: 20 }}
                />
        </div>
        </div>
    )
}

const pieChartStyle = {
    display: 'grid',
    placeItems: 'center',
    margin: '0 4rem'
}

export default ResultPie