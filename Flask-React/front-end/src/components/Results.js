import React, {useState} from 'react';
import ResultTable from './ResultTable';
import { Form, Radio, Container, Header, Button } from 'semantic-ui-react'
import ResultWordCloud from './ResultWordCloud';
import ResultBar from './ResultBar';
import ResultPie from './ResultPie';
import ConfirmModal from './ConfirmModal';
import axios from '../api/axios'
import DropDown from './DropDown';



const Results = (
                {newsData,
                 setNewsData, 
                 websiteChoice1, 
                 websiteChoice2, 
                 websiteChoice3, 
                 sites, 
                 setAnalysisValue, 
                 setWebsiteChoice1, 
                 setWebsiteChoice2,
                 setWebsiteChoice3,
                 currentUser,
                 setCurrentUser,
                 isSavedResult,
                 setIsSavedResult, 
                 deleteId,
                 setDeleteId,
                 userResults,
                 setUserResults,
                 websitesOptions,
                 selectValue,
                 setSelectValue
            }) => {


    const [value, setValue] = useState('table');
    const [saved, setSaved] = useState(false);
    const[deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const[deleteSuccess, setDeleteSuccess] = useState(false)
    const [closeFromModal, setCloseFromModal] = useState(false)
    const [resultTypeValue, setResultTypeValue] = useState('bar')

    const resultOptions = [
    {key: 'table', value:'table', text: 'Table'},
    {key: 'cloud', value:'cloud', text: 'Word Cloud'},
    {key: 'bar', value:'bar', text: 'Bar Chart'},
    {key: 'pie', value:'pie', text: 'Pie Chart'},

    ]



    if(closeFromModal){
        const newArray = userResults.filter(item => item.id !== deleteId)
        setUserResults(newArray)
        setNewsData(null)

    }

    const goBackEventHandler = () => {
        setNewsData(null)
        setAnalysisValue(null)
        setWebsiteChoice1(null)
        setWebsiteChoice2(null)
        setWebsiteChoice3(null)
        setIsSavedResult(false)
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
            setDeleteSuccess(true)
          })
      }

    const RenderResultView = () => {
        if (resultTypeValue == 'table'){
            if(websiteChoice3){
                return(
                    <>
                        <ResultTable newsData={newsData[websiteChoice1]} website={sites[websiteChoice1]} />
                        <br/>
                        <ResultTable newsData={newsData[websiteChoice2]} website={sites[websiteChoice2]}/>
                        <br/>
                        <ResultTable newsData={newsData[websiteChoice3]} website={sites[websiteChoice3]}/>

                    </>);
            }else if(websiteChoice2){
                return(
                <>
                    <ResultTable newsData={newsData[websiteChoice1]} website={sites[websiteChoice1]}/>
                    <br/>
                    <ResultTable newsData={newsData[websiteChoice2]} website={sites[websiteChoice2]}/>
                </>);
            }else{
                return   <ResultTable newsData={newsData[websiteChoice1]} website={sites[websiteChoice1]}/>
            } 
        }
        if (resultTypeValue == 'cloud'){
            if(websiteChoice3 ){
                return(
                    <>
                        <ResultWordCloud newsData={newsData[websiteChoice1]} website={sites[websiteChoice1]}/>
                        <br />
                        <ResultWordCloud newsData={newsData[websiteChoice2]} website={sites[websiteChoice2]}/>
                        <br />
                        <ResultWordCloud newsData={newsData[websiteChoice3]} website={sites[websiteChoice3]}/>

                    </>);
            }else if(websiteChoice2){
                return(
                <>
                    <ResultWordCloud newsData={newsData[websiteChoice1]} website={sites[websiteChoice1]}/>
                    <br />
                    <ResultWordCloud newsData={newsData[websiteChoice2]} website={sites[websiteChoice2]}/>
                </>);
            }else{
                return   <ResultWordCloud newsData={newsData[websiteChoice1]} website={sites[websiteChoice1]}/>
            } 
        }
        if (resultTypeValue == 'bar'){
            if(websiteChoice3 ){
                return(
                    <>
                        <ResultBar newsData={newsData[websiteChoice1]} website={sites[websiteChoice1]}/>
                        <br />
                        <ResultBar newsData={newsData[websiteChoice2]} website={sites[websiteChoice2]}/>
                        <br />
                        <ResultBar newsData={newsData[websiteChoice3]} website={sites[websiteChoice3]}/>

                    </>);
            }else if(websiteChoice2){
                return(
                <>
                    <ResultBar newsData={newsData[websiteChoice1]} website={sites[websiteChoice1]}/>
                    <br />
                    <ResultBar newsData={newsData[websiteChoice2]} website={sites[websiteChoice2]}/>
                </>);
            }else{
                return   <ResultBar newsData={newsData[websiteChoice1]} website={sites[websiteChoice1]}/>
            } 
        }
        if (resultTypeValue == 'pie'){
            if(websiteChoice3 ){
                return(
                    <>
                        <ResultPie newsData={newsData[websiteChoice1]} website={sites[websiteChoice1]}/>
                        <br />
                        <ResultPie newsData={newsData[websiteChoice2]} website={sites[websiteChoice2]}/>
                        <br />
                        <ResultPie newsData={newsData[websiteChoice3]} website={sites[websiteChoice3]}/>

                    </>);
            }else if(websiteChoice2){
                return(
                <div style={resultPieStyle}>
                    <ResultPie newsData={newsData[websiteChoice1]} website={sites[websiteChoice1]}/>
                    <br />
                    <ResultPie newsData={newsData[websiteChoice2]} website={sites[websiteChoice2]}/>
                </div>);
            }else{
                return   <ResultPie newsData={newsData[websiteChoice1]} website={sites[websiteChoice1]}/>
            } 
        }
    }

    const handleChange = (event, {value}) => setValue(value);

    const postResultData = () => {

        const createReqBody = () => {
            const body = {}
            if(!websiteChoice2 && !websiteChoice3){
                body['word_frequencies_1'] = newsData[websiteChoice1]
                body['website_1'] = websiteChoice1
            }else if(websiteChoice1 && websiteChoice2 && !websiteChoice3){
                    body['word_frequencies_1'] = newsData[websiteChoice1]
                    body['website_1'] = websiteChoice1
                    body['word_frequencies_2'] = newsData[websiteChoice2]
                    body['website_2'] = websiteChoice2
            }else {
                body['word_frequencies_1'] = newsData[websiteChoice1]
                body['website_1'] = websiteChoice1
                body['word_frequencies_2'] = newsData[websiteChoice2]
                body['website_2'] = websiteChoice2
                body['word_frequencies_3'] = newsData[websiteChoice3]
                body['website_3'] = websiteChoice3
            }
            return body
        }
    
        const postDataUrl = 'http://127.0.0.1:5000/api/v1/add_word_frequency'
        const accessToken = 'Bearer ' + currentUser['access_token']

        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
             body: JSON.stringify(createReqBody())
        }

        fetch(postDataUrl, reqOptions)
            .then(res => res)
            .then(data => {
                setSaved(true)
            })


    }



    const SaveElement = () => {
        if(saved){
            return <p>Result saved!</p>
        } else{
            return <Button primary onClick={()=> postResultData()}>Save Result</Button>
        }
    }

    const HeaderResults = () => {
       if(isSavedResult){
            return(
                <Header as='h2' textAlign='center'> Previously Saved Results</Header>
            )
       }else{
            return(
                <Header textAlign='center' as='h2'>Results</Header> 
            )
        }
           
    }


    const ButtonRenderHelper = () => {
        if(isSavedResult){
            return(
                <>
                    <Button primary onClick={()=> goBackEventHandler()}>Go Back</Button>
                    <Button
                        negative
                        onClick={()=>{
                            setDeleteModalIsOpen(true)
                        }}
                     >Delete</Button>
                </>
            )
        }else{
            return(
                <>
                    <Button primary onClick={()=> goBackEventHandler()}>Go Back</Button>
                    <SaveElement />
                </>
            )
        }
    }


    
    return (
        <Container style={{margin: '5rem 0'}}>
            
          <HeaderResults />
          <br/>
          <br/>
          <div style={{display: 'flex', justifyContent:'center'}}>
            <div style={{width: '25vw'}} textAlign='center'>
            <DropDown
                fluid
                selectOptions={resultOptions} 
                selectValue={resultTypeValue}
                setSelectValue={setResultTypeValue}
            />
            </div>
          </div>
          <br/>
          <br/>
          <br/>

            <RenderResultView/>
            <Container style={{margin: '3rem 0'}} textAlign='center'>
                <ButtonRenderHelper/>
            </Container>
            <ConfirmModal
                setIsOpen={setDeleteModalIsOpen}
                isOpen={deleteModalIsOpen}
                btnFunction={deleteResultHandler}
                success={deleteSuccess}
                setSuccess={setDeleteSuccess}
                setCloseFromModal={setCloseFromModal}
                promptMessage='Confirm Delete'
                promptSuccess='Result Deleted'
    />
        </Container>
    )
};


const resultPieStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const resultsMargin = {
    margin: '3rem 0'
}

export default Results;