import React, {useState} from 'react';
import ResultTable from './ResultTable';
import { Form, Radio, Container, Header, Button } from 'semantic-ui-react'
import ResultWordCloud from './ResultWordCloud';
import ResultBar from './ResultBar';
import ResultPie from './ResultPie';
import ConfirmModal from './ConfirmModal';
import axios from '../api/axios'



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
                 setUserResults
            }) => {


    const [value, setValue] = useState('table');
    const [saved, setSaved] = useState(false);
    const[deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const[deleteSuccess, setDeleteSuccess] = useState(false)
    const [closeFromModal, setCloseFromModal] = useState(false)



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
        if (value == 'table'){
            if(websiteChoice3){
                return(
                    <>
                        <ResultTable newsData={newsData[websiteChoice1]}/>
                        <ResultTable newsData={newsData[websiteChoice2]}/>
                        <ResultTable newsData={newsData[websiteChoice3]}/>

                    </>);
            }else if(websiteChoice2){
                return(
                <>
                    <ResultTable newsData={newsData[websiteChoice1]}/>
                    <ResultTable newsData={newsData[websiteChoice2]}/>
                </>);
            }else{
                return   <ResultTable newsData={newsData[websiteChoice1]}/>
            } 
        }
        if (value == 'wordcloud'){
            if(websiteChoice3 ){
                return(
                    <>
                        <ResultWordCloud newsData={newsData[websiteChoice1]}/>
                        <ResultWordCloud newsData={newsData[websiteChoice2]}/>
                        <ResultWordCloud newsData={newsData[websiteChoice3]}/>

                    </>);
            }else if(websiteChoice2){
                return(
                <>
                    <ResultWordCloud newsData={newsData[websiteChoice1]}/>
                    <ResultWordCloud newsData={newsData[websiteChoice2]}/>
                </>);
            }else{
                return   <ResultWordCloud newsData={newsData[websiteChoice1]}/>
            } 
        }
        if (value == 'bar'){
            if(websiteChoice3 ){
                return(
                    <>
                        <ResultBar newsData={newsData[websiteChoice1]}/>
                        <ResultBar newsData={newsData[websiteChoice2]}/>
                        <ResultBar newsData={newsData[websiteChoice3]}/>

                    </>);
            }else if(websiteChoice2){
                return(
                <>
                    <ResultBar newsData={newsData[websiteChoice1]}/>
                    <ResultBar newsData={newsData[websiteChoice2]}/>
                </>);
            }else{
                return   <ResultBar newsData={newsData[websiteChoice1]}/>
            } 
        }
        if (value == 'pie'){
            if(websiteChoice3 ){
                return(
                    <>
                        <ResultPie newsData={newsData[websiteChoice1]}/>
                        <ResultPie newsData={newsData[websiteChoice2]}/>
                        <ResultPie newsData={newsData[websiteChoice3]}/>

                    </>);
            }else if(websiteChoice2){
                return(
                <>
                    <ResultPie newsData={newsData[websiteChoice1]}/>
                    <ResultPie newsData={newsData[websiteChoice2]}/>
                </>);
            }else{
                return   <ResultPie newsData={newsData[websiteChoice1]}/>
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
                <Header as='h2'> Previously Saved Word Frequency Compare Results</Header>
            )
       }else{
            return(
                <Header as='h2'>Word Frequency Compare Results</Header> 
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
        <Container>
            
          <HeaderResults/>
            <Form>
                <Form.Field>
                    Selected value: <b>{value}</b>
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Table'
                        name='radioGroup'
                        value='table'
                        checked={value === 'table'}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Word Cloud'
                        name='radioGroup'
                        value='wordcloud'
                        checked={value === 'wordcloud'}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Bar Chart'
                        name='radioGroup'
                        value='bar'
                        checked={value === 'bar'}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Pie Chart'
                        name='radioGroup'
                        value='pie'
                        checked={value === 'pie'}
                        onChange={handleChange}
                    />
                </Form.Field>
            </Form>
            <RenderResultView/>
            <Container>
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

export default Results;