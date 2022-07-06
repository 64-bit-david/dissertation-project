import React from 'react'
import {TagCloud} from 'react-tagcloud';


const ResultWordCloud = ({newsData}) => {
  return (
     
                <TagCloud
                  minSize={12}
                  maxSize={35}
                  tags={newsData}
                  onClick={tag => alert(`'${tag.value}' was selected!`)}
                 />
  )
}

export default ResultWordCloud