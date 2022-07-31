import React, { useEffect, useState, useLayoutEffect } from 'react';
import { RadialChart } from 'react-vis';
import {Header} from 'semantic-ui-react';






const ResultPie = ({newsData, website}) => {

    

    const newData = newsData.map(item => ({angle: item.count, label: item.value}))

    



    return (
        <>
        <Header as='h3' textAlign='center'>Word Frequency Results for {website}</Header>
        <div style={pieChartStyle}>
            <RadialChart
                data={newData.slice(0, 10)}
                width={400}
                height={400}
                labelsRadiusMultiplier={1.1}
                labelsStyle={{
                    fontSize: 16
                }}
                showLabels 
                animation={{ damping: 10, stiffness: 20 }}
                />
        </div>
        </>
    )
}

const pieChartStyle = {
    display: 'grid',
    placeItems: 'center'
}

export default ResultPie