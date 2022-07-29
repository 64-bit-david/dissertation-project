import {useState, useEffect} from 'react'
import {Table, Button} from 'semantic-ui-react';
import axios from '../api/axios';
import ConfirmModal from './ConfirmModal';
import Results  from './Results';

const PreviousResults = (
  {currentUser
  }) => {

const [userResults, setUserResults] = useState([])


const [pNewsData, setPNewsData] = useState(null)
const [pWebSiteChoice1, setPWebsiteChoice1] = useState(null)
const [pWebSiteChoice2, setPWebsiteChoice2] = useState(null)
const [pWebSiteChoice3, setPWebsiteChoice3] = useState(null)
const[isSavedResult, setIsSavedResult] = useState(false)
const[deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
const[deleteId, setDeleteId] = useState(null)
const[deleteSuccess, setDeleteSuccess] = useState(false)


const resultTypeArray = {
        wf: 'Word Frequency',
        wfc: 'Word Frequency Compare'}

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
    setUserResults(data.results)
    console.log(data.results)
  })
}, [currentUser])

  const timeStampFormatter = (date) => {
    return date.slice(5, 16)
  }


  const setWebsiteChoices = (data) => {
    const websites = Object.keys(data)
    if (websites.length > 2){
      setPWebsiteChoice1(websites[0])
      setPWebsiteChoice2(websites[1])
      setPWebsiteChoice3(websites[2])      
    }
    else if(websites.length == 2){
      setPWebsiteChoice1(websites[0])
      setPWebsiteChoice2(websites[1])
    }
    else{
      setPWebsiteChoice1(websites[0])
    }
  }

  const viewResultHandler = (id) => {
    const accessToken = 'Bearer ' + currentUser['access_token']
    const reqOptions = {
      headers:{
        'Authorization': accessToken
      }
    }
    axios.get('/result/' + id, reqOptions)
      .then(data => {
        setPNewsData(data.data)
        setWebsiteChoices(data.data)
        setIsSavedResult(true)
        setDeleteId(id)
      })

  }

  const deleteResultHandler = () => {
    const accessToken = 'Bearer ' + currentUser['access_token']
    const reqOptions = {
      headers:{
        'Authorization': accessToken
      }
    }

    axios.delete('/result/' + deleteId, reqOptions)
      .then(data => {
        const newArray = userResults.filter(item => item.id !== deleteId)
        setUserResults(newArray)
        setDeleteSuccess(true)
      })
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
            {resultTypeArray[userResult.results_type]}
          </Table.Cell>
          <Table.Cell>
            <Button primary onClick={()=>viewResultHandler(userResult.id)}>View Result</Button>
          </Table.Cell>
          <Table.Cell>
            <Button negative onClick={() => {
              setDeleteModalIsOpen(true)
              setDeleteId(userResult.id)
              console.log('clicked delte')
              }}>Delete Result</Button>
            {/* <Button negative onClick={()=> deleteResultHandler(userResult.id)}>Delete Result</Button> */}
          </Table.Cell>
        </Table.Row>
        )
      })}
    </Table.Body>
    )
    }


    const PreviousResultsRenderHelper = () => {
      if(!pNewsData){
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
      }else{
        return <Results
           currentUser={currentUser}
           newsData={pNewsData}
           setNewsData={setPNewsData}
           websiteChoice1={pWebSiteChoice1}
           websiteChoice2={pWebSiteChoice2}
           websiteChoice3={pWebSiteChoice3}
           setPWebsiteChoice1={setPWebsiteChoice1}
           setPWebsiteChoice2={setPWebsiteChoice2}
           setPWebsiteChoice3={setPWebsiteChoice3}
           isSavedResult={isSavedResult}
           setIsSavedResult={setIsSavedResult}
           deleteId={deleteId}
           setDeleteId={setDeleteId}
           userResults={userResults}
           setUserResults={setUserResults}
           />
      }
    }


  return (
    <>
    <ConfirmModal
      setIsOpen={setDeleteModalIsOpen}
      isOpen={deleteModalIsOpen}
      btnFunction={deleteResultHandler}
      success={deleteSuccess}
      setSuccess={setDeleteSuccess}
      promptMessage='Confirm Delete'
      promptSuccess='Result Deleted'
    />
   <PreviousResultsRenderHelper />
   </>
  )
}

export default PreviousResults