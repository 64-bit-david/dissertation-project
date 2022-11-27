import React, {useState, useEffect} from 'react';
import ResultTable from './ResultTable';
import {Container, Header, Button, Icon } from 'semantic-ui-react'
import ResultWordCloud from './ResultWordCloud';
import ResultBar from './ResultBar';
import ResultPie from './ResultPie';
import ConfirmModal from './ConfirmModal';
import axios from '../api/axios'
import DropDown from './DropDown';
import RangeSlider from './RangeSlider';
import { useMediaQuery } from 'react-responsive';
import { Direction } from 'react-range';




const Results = (
                {newsData,
                 setNewsData, 
                 rawNewsData,
                 setRawNewsData,
                 websiteChoice1, 
                 websiteChoice2, 
                 websiteChoice3, 
                 sites, 
                 setAnalysisValue, 
                 setWebsiteChoice1, 
                 setWebsiteChoice2,
                 setWebsiteChoice3,
                 currentUser,
                 setHNewsData,
                 setCurrentUser,
                 isSavedResult,
                 setIsSavedResult,
                 isHistoricalResult,
                 setIsHistoricalResult, 
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
    const [numOfWords, setNumOfWords] = useState(0)


    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })


    const resultOptions = [
    {key: 'table', value:'table', text: 'Table'},
    {key: 'cloud', value:'cloud', text: 'Word Cloud'},
    {key: 'bar', value:'bar', text: 'Bar Chart'},
    {key: 'pie', value:'pie', text: 'Pie Chart'},

    ]


    // allows the numOfWords to be changed without reendering he whole page
    useEffect(() => {
        if(resultTypeValue === 'bar') setNumOfWords(12)
        if(resultTypeValue === 'pie') setNumOfWords(12)
        if(resultTypeValue === 'table') setNumOfWords(20)
        if(resultTypeValue === 'cloud') setNumOfWords(60)

    }, [resultTypeValue])
    

    if(closeFromModal){
        const newArray = userResults.filter(item => item.id !== deleteId)
        setUserResults(newArray)
        setNewsData(null)
        setRawNewsData(null)
    }

    const goBackEventHandler = () => {
        setNewsData(null)
        setRawNewsData(null)
        setAnalysisValue(null)
        setWebsiteChoice1(null)
        setWebsiteChoice2(null)
        setWebsiteChoice3(null)
        setIsSavedResult(false)
        setIsHistoricalResult(false)
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
            console.log('###')
            console.log(rawNewsData)
            console.log('###')
            if(!websiteChoice2 && !websiteChoice3){
                body['word_frequencies_1'] = rawNewsData[websiteChoice1]
                body['website_1'] = websiteChoice1
            }else if(websiteChoice1 && websiteChoice2 && !websiteChoice3){
                    body['word_frequencies_1'] = rawNewsData[websiteChoice1]
                    body['website_1'] = websiteChoice1
                    body['word_frequencies_2'] = rawNewsData[websiteChoice2]
                    body['website_2'] = websiteChoice2
            }else {
                body['word_frequencies_1'] = rawNewsData[websiteChoice1]
                body['website_1'] = websiteChoice1
                body['word_frequencies_2'] = rawNewsData[websiteChoice2]
                body['website_2'] = websiteChoice2
                body['word_frequencies_3'] = rawNewsData[websiteChoice3]
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


    const pieStyleHelper = () => {
        if (isTabletOrMobile){
            return twoResultPieStyleMobile
        }else{
            return twoResultPieStyle
        }
    }



    const RenderResultView = () => {
        if (resultTypeValue === 'table'){
            if(websiteChoice3){
                return(
                    <>
                        <ResultTable 
                            newsData={newsData['counted'][websiteChoice1]} 
                            sentimentData={newsData['sentiment'][websiteChoice1]} 
                            website={sites[websiteChoice1]}
                            numOfWords={numOfWords}
                        />
                        <br/>
                        <ResultTable
                            newsData={newsData['counted'][websiteChoice2]} 
                            sentimentData={newsData['sentiment'][websiteChoice2]} 
                            website={sites[websiteChoice2]}
                            numOfWords={numOfWords}
                         />
                        <br/>
                        <ResultTable
                            newsData={newsData['counted'][websiteChoice3]} 
                            sentimentData={newsData['sentiment'][websiteChoice3]}
                            website={sites[websiteChoice3]}
                            numOfWords={numOfWords}
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
                        newsData={newsData['counted'][websiteChoice1]} 
                        sentimentData={newsData['sentiment'][websiteChoice1]}
                        website={sites[websiteChoice1]}
                        numOfWords={numOfWords}
                        />
                    <br/>
                    <ResultTable
                         newsData={newsData['counted'][websiteChoice2]} 
                         sentimentData={newsData['sentiment'][websiteChoice2]}
                         website={sites[websiteChoice2]}
                         numOfWords={numOfWords}
                         />
                </div>
                </>);
            }else{
                return  <ResultTable 
                            newsData={newsData['counted'][websiteChoice1]} 
                            sentimentData={newsData['sentiment'][websiteChoice1]}
                            website={sites[websiteChoice1]}
                            numOfWords={numOfWords}
                        />
            } 
        }
        if (resultTypeValue === 'cloud'){
            if(websiteChoice3 ){
                return(
                    <>
                        <ResultWordCloud
                             newsData={newsData['counted'][websiteChoice1]} 
                             sentimentData={newsData['sentiment'][websiteChoice1]}
                             website={sites[websiteChoice1]}/>
                             numOfWords={numOfWords}
                        <br />
                        <ResultWordCloud 
                                newsData={newsData['counted'][websiteChoice2]} 
                                sentimentData={newsData['sentiment'][websiteChoice2]}
                                website={sites[websiteChoice2]}
                                numOfWords={numOfWords}
                                />
                        <br />
                        <ResultWordCloud 
                                newsData={newsData['counted'][websiteChoice3]} 
                                sentimentData={newsData['sentiment'][websiteChoice3]}
                                website={sites[websiteChoice3]}
                                numOfWords={numOfWords}
                            />
                    </>);
            }else if(websiteChoice2){
                return(
                <div style={twoResultsCloud}>
                    <ResultWordCloud 
                        newsData={newsData['counted'][websiteChoice1]} 
                        sentimentData={newsData['sentiment'][websiteChoice1]}
                        website={sites[websiteChoice1]}
                        numOfWords={numOfWords}
                        />
                    <br />
                    <ResultWordCloud 
                        newsData={newsData['counted'][websiteChoice2]} 
                        sentimentData={newsData['sentiment'][websiteChoice2]}
                        website={sites[websiteChoice2]} 
                        numOfWords={numOfWords}
                        />
                </div>);
            }else{
                return   <ResultWordCloud
                            newsData={newsData['counted'][websiteChoice1]} 
                            sentimentData={newsData['sentiment'][websiteChoice1]}
                            website={sites[websiteChoice1]}
                            numOfWords={numOfWords}
                         />
            } 
        }
        if (resultTypeValue == 'bar'){
            if(websiteChoice3 ){
                return(
                    <>
                        <ResultBar 
                            newsData={newsData['counted'][websiteChoice1]} 
                            sentimentData={newsData['sentiment'][websiteChoice1]}
                            website={sites[websiteChoice1]}
                            width={800}
                            height={400} 
                            numOfWords={numOfWords}
                            />
                        <br />
                        <ResultBar
                             newsData={newsData['counted'][websiteChoice2]} 
                             sentimentData={newsData['sentiment'][websiteChoice2]} 
                             website={sites[websiteChoice2]}
                             width={800}
                             height={400} 
                             numOfWords={numOfWords}
                             />
                        <br />
                        <ResultBar 
                            newsData={newsData['counted'][websiteChoice3]} 
                            sentimentData={newsData['sentiment'][websiteChoice3]}
                            website={sites[websiteChoice3]}
                            width={800}
                            height={400} 
                            numOfWords={numOfWords}
                            />

                    </>);
            }else if(websiteChoice2){
            
                return(
                <div style={twoResultsBar}>
                    <ResultBar 
                        newsData={newsData['counted'][websiteChoice1]} 
                        sentimentData={newsData['sentiment'][websiteChoice1]}
                        website={sites[websiteChoice1]}
                        height={300}
                        width={600} 
                        numOfWords={numOfWords}
                        />
                    <br />
                    <ResultBar 
                        newsData={newsData['counted'][websiteChoice2]} 
                        sentimentData={newsData['sentiment'][websiteChoice2]}
                        website={sites[websiteChoice2]}
                        height={300}
                        width={600} 
                        numOfWords={numOfWords}
                        />
                    </div>);
            }else{
                return  ( 
                <ResultBar 
                    newsData={newsData['counted'][websiteChoice1]} 
                    sentimentData={newsData['sentiment'][websiteChoice1]}
                    website={sites[websiteChoice1]}
                    width={800}
                    height={400} 
                    numOfWords={numOfWords}
                    />
                    );
            } 
        }
        if (resultTypeValue == 'pie'){
            if(websiteChoice3 ){
                return(
                    <>
                      <ResultPie 
                            newsData={newsData['counted'][websiteChoice1]} 
                            sentimentData={newsData['sentiment'][websiteChoice1]}
                            website={sites[websiteChoice1]}
                            height={400}
                            width={400} 
                            numOfWords={numOfWords}
                            />
                        <br />
                        <ResultPie 
                            newsData={newsData['counted'][websiteChoice2]} 
                            sentimentData={newsData['sentiment'][websiteChoice2]}
                            website={sites[websiteChoice2]}
                            height={400}
                            width={400} 
                            numOfWords={numOfWords}
                            />
                        <br />
                        <ResultPie 
                            newsData={newsData['counted'][setWebsiteChoice3]} 
                            sentimentData={newsData['sentiment'][websiteChoice3]} 
                            website={sites[websiteChoice3]}
                            height={400}
                            width={400} 
                            numOfWords={numOfWords}
                            />

                    </>);
            }else if(websiteChoice2){
                return(
                <div style={pieStyleHelper()}>
                    <ResultPie 
                        newsData={newsData['counted'][websiteChoice1]} 
                        sentimentData={newsData['sentiment'][websiteChoice1]}
                        website={sites[websiteChoice1]}
                        height={350}
                        width={350} 
                        numOfWords={numOfWords}
                        />
                    <br />
                    <ResultPie 
                        newsData={newsData['counted'][websiteChoice2]} 
                        sentimentData={newsData['sentiment'][websiteChoice2]}
                        website={sites[websiteChoice2]}
                        height={350}
                        width={350} 
                        numOfWords={numOfWords}
                        />
                </div>);
            }else{
                return   (
                <ResultPie 
                    newsData={newsData['counted'][websiteChoice1]} 
                    sentimentData={newsData['sentiment'][websiteChoice1]} 
                    website={sites[websiteChoice1]}
                    height={400}
                    width={400} 
                    numOfWords={numOfWords}
                    />
                )
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
        }else if(isHistoricalResult){
            return(
                <Header as='h2' textAlign='center'> Historical Results</Header>
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
        }else if(isHistoricalResult){
            return(
                <>
                  <Button primary onClick={()=> goBackEventHandler()}>Go Back</Button>
                </>)
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
            <div style={sliderContainer}>
            <Header as='h3' textAlign='center'>Drag the button to customize the number of word shown in the visualization</Header>
            <RangeSlider volume={numOfWords} setVolume={setNumOfWords}/>

            </div>
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


const twoResultPieStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const twoResultPieStyleMobile = {
    display: 'flex',
    flexDirection: 'column',
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

const sliderContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: '3rem 0' 
    // alignItems: 'center'
}




export default Results;