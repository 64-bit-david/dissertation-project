import React, {useState} from 'react';
import ResultTable from './ResultTable';
import {Container, Header, Button, Icon } from 'semantic-ui-react'
import ResultWordCloud from './ResultWordCloud';
import ResultBar from './ResultBar';
import ResultPie from './ResultPie';
import ConfirmModal from './ConfirmModal';
import axios from '../api/axios'
import DropDown from './DropDown';
import { useMediaQuery } from 'react-responsive';



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
    const [resultIsSaving, setResultIsSaving] = useState(false);


    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
      })
      const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
      const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
      const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
      const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })


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


      const postResultData = () => {
        setResultIsSaving(true)
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
    
        const postDataUrl = 'http://127.0.0.1:5000/api/v1/result'
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
                setResultIsSaving(false)
            })


    }





    const RenderResultView = () => {
        if (resultTypeValue == 'table'){
            if(websiteChoice3){
                return(
                    <>
                        <ResultTable 
                            newsData={newsData[websiteChoice1]} 
                            website={sites[websiteChoice1]}
                        />
                        <br/>
                        <ResultTable
                            newsData={newsData[websiteChoice2]} 
                            website={sites[websiteChoice2]}
                         />
                        <br/>
                        <ResultTable
                            newsData={newsData[websiteChoice3]} 
                            website={sites[websiteChoice3]}
                         />
                    </>);
            }else if(websiteChoice2){
                return(
                    <>
                <Container style={{margin: '3rem 0'}} textAlign='center'>
                    <ButtonRenderHelper/>
                </Container>
                <div style={twoResultsTable}>
                    <ResultTable 
                        newsData={newsData[websiteChoice1]} 
                        website={sites[websiteChoice1]}
                       
                        />
                    <br/>
                    <ResultTable
                         newsData={newsData[websiteChoice2]} 
                         website={sites[websiteChoice2]}
                         />
                </div>
                </>);
            }else{
                return  <ResultTable 
                            newsData={newsData[websiteChoice1]} 
                            website={sites[websiteChoice1]}
                        />
            } 
        }
        if (resultTypeValue == 'cloud'){
            if(websiteChoice3 ){
                return(
                    <>
                        <ResultWordCloud
                             newsData={newsData[websiteChoice1]} 
                             website={sites[websiteChoice1]}/>
                        <br />
                        <ResultWordCloud 
                                newsData={newsData[websiteChoice2]}
                                website={sites[websiteChoice2]}/>
                        <br />
                        <ResultWordCloud 
                            newsData={newsData[websiteChoice3]} 
                            website={sites[websiteChoice3]}
                            />
                    </>);
            }else if(websiteChoice2){
                return(
                <div style={twoResultsCloud}>
                    <ResultWordCloud 
                        newsData={newsData[websiteChoice1]} 
                        website={sites[websiteChoice1]}
                        />
                    <br />
                    <ResultWordCloud 
                        newsData={newsData[websiteChoice2]} 
                        website={sites[websiteChoice2]} 
                        />
                </div>);
            }else{
                return   <ResultWordCloud
                            newsData={newsData[websiteChoice1]}
                            website={sites[websiteChoice1]}/>
            } 
        }
        if (resultTypeValue == 'bar'){
            if(websiteChoice3 ){
                return(
                    <>
                        <ResultBar 
                            newsData={newsData[websiteChoice1]} 
                            website={sites[websiteChoice1]}
                            width={800}
                            height={400} 
                            />
                        <br />
                        <ResultBar
                             newsData={newsData[websiteChoice2]} 
                             website={sites[websiteChoice2]}
                             width={800}
                             height={400} 
                             />
                        <br />
                        <ResultBar 
                            newsData={newsData[websiteChoice3]} 
                            website={sites[websiteChoice3]}
                            width={800}
                            height={400} 
                            />

                    </>);
            }else if(websiteChoice2){
            
                return(
                <div style={twoResultsBar}>
                    <ResultBar 
                        newsData={newsData[websiteChoice1]} 
                        website={sites[websiteChoice1]}
                        height={300}
                        width={600} 
                        />
                    <br />
                    <ResultBar 
                        newsData={newsData[websiteChoice2]} 
                        website={sites[websiteChoice2]}
                        height={300}
                        width={600} 
                        />
                    </div>);
            }else{
                return   <ResultBar 
                            newsData={newsData[websiteChoice1]} 
                            website={sites[websiteChoice1]}
                            width={800}
                            height={400} 
                            />
            } 
        }
        if (resultTypeValue == 'pie'){
            if(websiteChoice3 ){
                return(
                    <>
                        <ResultPie 
                            newsData={newsData[websiteChoice1]} 
                            website={sites[websiteChoice1]}
                            height={400}
                            width={400} 
                            />
                        <br />
                        <ResultPie 
                            newsData={newsData[websiteChoice2]} 
                            website={sites[websiteChoice2]}
                            height={400}
                            width={400} 
                            />
                        <br />
                        <ResultPie 
                            newsData={newsData[websiteChoice3]} 
                            website={sites[websiteChoice3]}
                            height={400}
                            width={400} 
                            />

                    </>);
            }else if(websiteChoice2){
                return(
                <div style={resultPieStyle}>
                    <ResultPie 
                        newsData={newsData[websiteChoice1]} 
                        website={sites[websiteChoice1]}
                        height={350}
                        width={350} 
                        />
                    <br />
                    <ResultPie 
                        newsData={newsData[websiteChoice2]} 
                        website={sites[websiteChoice2]}
                        height={350}
                        width={350} 
                        />
                </div>);
            }else{
                return   <ResultPie 
                                newsData={newsData[websiteChoice1]} 
                                website={sites[websiteChoice1]}
                                height={400}
                                width={400} 
                                />
            } 
        }
    }


    



    const SaveElement = () => {
        if(currentUser){
            if(saved && !resultIsSaving){
                return (
                <>
                <Button color='green'>Result Saved!</Button>
                <Icon
                        name='check circle'
                        size='large'
                        color='green'
                    />
                </> 
                )
            } else if(!saved && resultIsSaving){
                return <Button loading primary>Saving...</Button>
            }else{
                return <Button primary onClick={()=> postResultData()}>Save Result</Button>
            }
        } else{
            return <Button disabled primary>Sign in to save your result</Button>
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
            <div style={{width: '60vw'}} textAlign='center'>
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
            <br/>
            <br/>
            <br/>
            <br/>

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
    justifyContent: 'center',
    alignItems: 'center',
}

const twoResultsTable = {
    display: 'flex',
    justifyContent: 'center'
}

const twoResultsCloud = {
    display: 'flex',
    justifyContent: 'space-around'
}

const twoResultsBar = {
    display: 'flex',
    justifyContent: 'space-around'
}



export default Results;