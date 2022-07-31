import React from 'react'
import {TagCloud} from 'react-tagcloud';
import {Header} from 'semantic-ui-react';


const ResultWordCloud = ({newsData, website}) => {
  console.log(website)
  return (
                <>
                <Header as='h3' textAlign='center'>Word Frequency Results for {website}</Header>
                <TagCloud
                  minSize={12}
                  maxSize={35}
                  tags={newsData}
                 />
                 </>
  )
}

export default ResultWordCloud