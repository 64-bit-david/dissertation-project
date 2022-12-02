import { Container, Header, Button, Loader } from "semantic-ui-react"
import DropDown from "./DropDown";
import axios from '../api/axios';
import { useState } from "react";
import Results from "./Results";
import ErrorPage from './ErrorPage';

const HistoricalResults = (
                            { websitesOptions, 
                              analysisOptions, 
                              sites,
                              isSavedResult,
                              setIsSavedResult,
                              isHistoricalResult,
                              setIsHistoricalResult,
                              currentUser,
                              setCurrentUser }) => {


  
const [renderThirdDrop, setRenderThirdDrop] = useState(false)
const[analysisValue, setAnalysisValue] = useState(null)
const [hNewsData, setHNewsData] = useState(null)
const [hWebsiteChoice1, setHWebsiteChoice1] = useState(null)
const [hWebsiteChoice2, setHWebsiteChoice2] = useState(null)
const [hWebsiteChoice3, setHWebsiteChoice3] = useState(null)
  const [error, setError] = useState(null)
  const[errCode, setErrCode] = useState(null)
  const [loading, setLoading] = useState(false)


  const getHeadlineWordFreqs = async () => {
        let queryParams = ''
        setLoading(true)
        if(!hWebsiteChoice2 && !hWebsiteChoice3){
            queryParams += '?websites=' + hWebsiteChoice1
        }
        else{
            queryParams += '?websites=' + hWebsiteChoice1 + '&websites=' + hWebsiteChoice2
            if(hWebsiteChoice3){
            queryParams += '&websites=' + hWebsiteChoice3
         } 
        }
    axios.get('/historical-results' + queryParams )
      .then(res => {
        // console.log(res)
        return res.data
      })
      .then(data => {      
        setHNewsData(data)
        setIsHistoricalResult(true)
      })
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(true)
        setErrCode(err.response.status)
        setLoading(false)
      })

    }

  

  const DropDownWebsites = () =>{ 
    if(analysisValue==='wf'){
      setHWebsiteChoice2(null)
      setHWebsiteChoice3(null)
      return(
      <Container style={{ marginTop: '1em' }}>
       <Container style={{display: 'flex', justifyContent: 'center', margin: '2rem 0'}}>
              <Header as='h5' textAlign="center">Select a website to find the most frequently used words in their headlines from the past 24 hours</Header>
            </Container>
        
              <DropDown
                  selectOptions={websitesOptions} 
                  selectValue={hWebsiteChoice1}
                  setSelectValue={setHWebsiteChoice1}
                  />
        </Container>
      )
    }else if(analysisValue === 'wfc'){
      return (
        <Container>
          <div style={{ margin: '1rem 0' }}>
            <Container textAlign="center">
              <Header textAlign="center" as='h5'>Select websites to find the most frequently used words in their headlines from the past 24 hours</Header>
            </Container>
          <div style={{ marginTop: '1em' }}>

              <DropDown
                  selectOptions={websitesOptions} 
                  selectValue={hWebsiteChoice1}
                  setSelectValue={setHWebsiteChoice1}
                  />
          </div>
          <div style={{ marginTop: '1em' }}>
              <DropDown
                  selectOptions={websitesOptions} 
                  selectValue={hWebsiteChoice2}
                  setSelectValue={setHWebsiteChoice2}
                  />
          </div>
            {renderThirdDrop && 
            <div style={{ marginTop: '1em' }}>
              <DropDown
                selectOptions={websitesOptions} 
                selectValue={hWebsiteChoice3}
                setSelectValue={setHWebsiteChoice3}
              />
              </div>
              }
          </div>
        </Container>
    )}
  }

  const StartAnalysisBtn  = () => {
    return(
      <Button content='Start Analysis' primary onClick={() => getHeadlineWordFreqs()} textAlign='center'/>
    )
  }


  const RenderAnalysisBtn = () => {
    if(analysisValue == 'wfc' && (hWebsiteChoice1 && hWebsiteChoice2) ){
      return(
        <StartAnalysisBtn />
      )
    }
    if(analysisValue == 'wf' && hWebsiteChoice1){
      return(
        <StartAnalysisBtn />
      )
    }
  }

  const RemoveOptionBtn = () => {
    return(
      <div style={optionBtnStyle}>
        <p style={{fontSize: '18px', margin: '0'}}>Remove Third Option</p>
        <Button
          color='red'
          style={{marginLeft: '2rem'}}
          onClick={()=> setRenderThirdDrop(false)}
          >Remove</Button>
      </div>
    )
  }

  const AddOptionBtn = () => {
    return(
      <div style={optionBtnStyle}>
        <p style={{fontSize: '18px', margin: '0'}}>Add Another Website</p>
        <Button
          color='green'
          style={{marginLeft: '2rem'}}
          onClick={()=> setRenderThirdDrop(true)}
          >Add</Button>
      </div>
    )
  }


  const OptionRenderer = () => {
    if(renderThirdDrop){
      return <RemoveOptionBtn/>
    }else{
      return <AddOptionBtn/>
  }
}

const DropDownSelectorComponent = () => {
    return(
        <div style={{marginTop: '10vh'}}>
            <Header as='h1' textAlign="center">Fetch Historical Results</Header>
            <Header as='h3' textAlign="center">Our database holds an accumulation of word frequencies collected each hour from the past 24 hours for each supported website.   </Header>
            <Container style={{ margin:'2.5rem 0' }} textAlign='center'>
              <Header as='h3'>Select an option to get started</Header>
              <DropDown
                selectOptions={analysisOptions} 
                selectValue={analysisValue}
                setSelectValue={setAnalysisValue} />
              </Container>
              <DropDownWebsites />
              <Container style={{ margin:'2em 0' }} textAlign='center'>
                {/* Not Working.. */}
              {/* <OptionRenderer/> */}
              {/* {OptionRenderer()} */}
              <RenderAnalysisBtn />
              </Container>
        </div> 
      )
}


const HistoricalHomeRenderHelper = () => {
    if(!error){
    if(!loading && !hNewsData){
        return <DropDownSelectorComponent/>
    } else if(loading && !hNewsData){
        return(
        <Loader active>
            Fetching data...
        </Loader>
        );
    }
    else{
        return(
            <Results 
            newsData={hNewsData}
            rawNewsData={null}
            websiteChoice1={hWebsiteChoice1} 
            websiteChoice2={hWebsiteChoice2} 
            websiteChoice3={hWebsiteChoice3} 
            sites={sites} 
            setRawNewsData={null}
            setNewsData={setHNewsData}
            setWebsiteChoice1={setHWebsiteChoice1}
            setHWebsiteChoice2={setHWebsiteChoice2}
            setHWebsiteChoice3={setHWebsiteChoice3}
            setAnalysisValue={setAnalysisValue}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            isSavedResult={isSavedResult}
            setIsSavedResult={setIsSavedResult}
            isHistoricalResult={isHistoricalResult}
            setIsHistoricalResult={setIsHistoricalResult}/>
        )
    }
    }else{
      return(
        <ErrorPage setState1={setHNewsData} setError={setError} errCode={errCode} setErrCode={setErrCode}/>
      )
    }
}



  return <HistoricalHomeRenderHelper />

  }

  const optionBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }


  export default HistoricalResults;