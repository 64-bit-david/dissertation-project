import React from 'react'
import {Table, TableBody, Header} from 'semantic-ui-react'
import SentimentBar from './SentimentBar';

const ResultTable = ({newsData, website, numOfWords, sentimentData}) => {


  return (
    <div style={{margin: '0 2rem'}}>
      <Header as='h3' textAlign='center'>Word Frequency Results for {website}</Header>
      <Table celled>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell>Count</Table.HeaderCell>
            <Table.HeaderCell>Word</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
      <TableBody>
        {newsData.slice(0, numOfWords).map((item, index)=> (
          <Table.Row key={index}>
          <Table.Cell>{item['count']}</Table.Cell>
          <Table.Cell>{item['value']}</Table.Cell>
          </Table.Row>
        ))}
      </TableBody>
      </Table>

      <SentimentBar type={'positive'} percent={sentimentData['pos']}/>
      <SentimentBar type={'negative'} percent={sentimentData['neg']}/>
      <SentimentBar type={'neutral'} percent={sentimentData['neu']}/>
    </div>
  )
}

export default ResultTable;
