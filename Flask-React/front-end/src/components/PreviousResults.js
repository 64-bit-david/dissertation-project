import {useState, useEffect} from 'react'
import {Table, Button} from 'semantic-ui-react';
import axios from '../api/axios';
const PreviousResults = ({currentUser}) => {

const [userResults, setUserResults] = useState([])



useEffect(() => {
  const accessToken = 'Bearer ' + currentUser['access_token']
  const url = '/get_word_frequencies'

  const reqOptions = {
    headers:{
      'Authorization': accessToken
    }
  }

  axios.get(url, reqOptions).then(res => {
    return res.data
  }).then(data => {
    setUserResults(data.data)
    console.log(data.data)
  })
}, [currentUser])

  const timeStampFormatter = (date) => {
    return date.slice(5, 16)
  }


  const TableData = () => {
    return(
    <Table.Body>
      {userResults.length > 0 && userResults.map(userResult => {
        return(
          <Table.Row key={userResult.id}>
          <Table.Cell>
            {timeStampFormatter(userResult.created_at)}
          </Table.Cell>
          <Table.Cell>
            {userResult.site}
          </Table.Cell>
          <Table.Cell>
            <Button>View Result</Button>
          </Table.Cell>
          <Table.Cell>
            <Button>Delete Result</Button>
          </Table.Cell>
        </Table.Row>
        )
      })}
    </Table.Body>
    )
    }


  return (
    <>
    <Table celled textAlign='center'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Created</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>View</Table.HeaderCell>
        <Table.HeaderCell>Delete</Table.HeaderCell>

      </Table.Row>
    </Table.Header>

    <TableData/>    
    </Table>
    </>
  )
}

export default PreviousResults