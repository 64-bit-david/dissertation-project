import React from 'react'
import {Table, TableBody, Header} from 'semantic-ui-react'

const ResultTable = ({newsData, website}) => {


  return (
    <div>
      <Header as='h3' textAlign='center'>Word Frequency Results for {website}</Header>
      <Table celled>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell>Count</Table.HeaderCell>
            <Table.HeaderCell>Word</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
      <TableBody>
        {newsData.map((item, index)=> (
          <Table.Row key={index}>
          <Table.Cell>{item['count']}</Table.Cell>
          <Table.Cell>{item['value']}</Table.Cell>
          </Table.Row>
        ))}
      </TableBody>

      </Table>
    </div>
  )
}

export default ResultTable;
