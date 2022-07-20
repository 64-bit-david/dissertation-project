import React, { useEffect, useState, useLayoutEffect } from 'react';
import { RadialChart } from 'react-vis';
import { Container } from 'semantic-ui-react';




// Could be used to make pie chart responsive - needs some work though

// const useWindowSize = () => {
//     const [size, setSize] = useState([0, 0]);
//     useLayoutEffect(() => {
//       function updateSize() {
//         setSize([window.innerWidth, window.innerHeight]);
//       }
//       window.addEventListener("resize", updateSize);
//       updateSize();
//       return () => window.removeEventListener("resize", updateSize);
//     }, []);
//     return size;
//   };


const ResultPie = ({newsData}) => {

    const [pieData, setPieData] = useState([])
    

    const newData = newsData.map(item => ({angle: item.count, label: item.value}))

    




    return (
        <Container textAlign='center'>
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
        </Container>
    )

    
  
}

export default ResultPie