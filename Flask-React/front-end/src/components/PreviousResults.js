import {useState, useEffect} from 'react'
import {Table} from 'semantic-ui-react';

const PreviousResults = ({currentUser}) => {

const [userResults, setUserResults] = useState(null)



useEffect(() => {
  const accessToken = 'Bearer ' + currentUser['access_token']
  const url = 'http://127.0.0.1:5000/api/v1/get_word_frequencies'

  const reqOptions = {
    headers:{
      Authorization: accessToken
    }
  }

  fetch(url, reqOptions)
  .then(res => res.body)
  .then(data => {
      console.log(data)
  })
}
)
  



          

  const TableData = () => {

  }

  return (
    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    <TableData/>    
    </Table.Body>
    </Table>
  )
}

export default PreviousResults