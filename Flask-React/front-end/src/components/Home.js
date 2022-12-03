
import { Container, Header, Button, Loader } from "semantic-ui-react"
import DropDown from "./DropDown";
import Results from "./Results";
import axios from '../api/axios';
import { useState } from "react";
import ErrorPage from "./ErrorPage";

const HomePage = ({ 
              websiteChoice1, 
              websiteChoice2,
              websiteChoice3, 
              setWebsiteChoice1, 
              setWebsiteChoice2, 
              setWebsiteChoice3,
              analysisValue, 
              websitesOptions, 
              analysisOptions,
              currentUser,
              setCurrentUser,
              isSavedResult,
              setIsSavedResult,
              setIsHistoricalResult,
              sites,
            //   setNewsData,
            //   setRawNewsData,
              setAnalysisValue,
            //   setError,
            //   setErrCode
            }) => {


  
  const [newsData, setNewsData] = useState(null)
  const [rawNewsData, setRawNewsData] = useState(null)
  const [renderThirdDrop, setRenderThirdDrop] = useState(false)
  const [error, setError] = useState(null)
  const [errCode, setErrCode] = useState(null)
  const [loading, setLoading] = useState(false);



  const getHeadlineWordFreqs = () => {
    let queryParams = ''
    setLoading(true)
    if(!websiteChoice2 && !websiteChoice3){
      queryParams += '?websites=' + websiteChoice1
    }
    else{
      queryParams += '?websites=' + websiteChoice1 + '&websites=' + websiteChoice2
      if(websiteChoice3){
        queryParams += '&websites=' + websiteChoice3
      } 
    }
  
    axios.get('/word-frequency' + queryParams )
      .then(res => {
        console.log(res)
        return res.data
      })
      .then(data => {
        console.log(data.counted)
        setLoading(false)
        setNewsData(data)
        setRawNewsData(data.uncounted)
      })
      .catch(err => {
        console.log(err)
        setError(true)
        setErrCode(err.response.status)
        
      })

    }

  

  const DropDownWebsites = () =>{ 
    if(analysisValue==='wf'){
      setWebsiteChoice2(null)
      setWebsiteChoice3(null)
      return(
      <Container style={{ marginTop: '1em' }}>
       <Container style={{display: 'flex', justifyContent: 'center', margin: '2rem 0'}}>
              <Header as='h5' textAlign="center">Select a website to find the most frequently used words in their headlines at this moment</Header>
            </Container>
        
              <DropDown
                  selectOptions={websitesOptions} 
                  selectValue={websiteChoice1}
                  setSelectValue={setWebsiteChoice1}
                  />
        </Container>
      )
    }else if(analysisValue === 'wfc'){
      return (
        <Container>
          <div style={{ margin: '1rem 0' }}>
            <Container textAlign="center">
              <Header textAlign="center" as='h5'>Select websites to find the most frequently used words in their headlines at this moment</Header>
            </Container>
          <div style={{ marginTop: '1em' }}>

              <DropDown
                  selectOptions={websitesOptions} 
                  selectValue={websiteChoice1}
                  setSelectValue={setWebsiteChoice1}
                  />
          </div>
          <div style={{ marginTop: '1em' }}>
              <DropDown
                  selectOptions={websitesOptions} 
                  selectValue={websiteChoice2}
                  setSelectValue={setWebsiteChoice2}
                  />
          </div>
            {renderThirdDrop && 
            <div style={{ marginTop: '1em' }}>
              <DropDown
                selectOptions={websitesOptions} 
                selectValue={websiteChoice3}
                setSelectValue={setWebsiteChoice3}
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
    if(analysisValue == 'wfc' && (websiteChoice1 && websiteChoice2) ){
      return(
        <StartAnalysisBtn />
      )
    }
    if(analysisValue == 'wf' && websiteChoice1){
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


const HomePageRenderHelper = () => {
    if(!error){
        if (!loading && !newsData){
            return(
                <div style={{marginTop: '10vh'}}>
                    <Header as='h1' textAlign="center">Welcome to the NewsTrendsAnalyser</Header>
                    <Container style={{ margin:'2.5rem 0' }} textAlign='center'>
                    <Header as='h3'>Select an option to get started</Header>
                    <DropDown
                        selectOptions={analysisOptions} 
                        selectValue={analysisValue}
                        setSelectValue={setAnalysisValue} />
                    </Container>
                    {websitesOptions ?     <DropDownWebsites /> : <Header textAlign="center"> Error: No website data could be retrieved. Please try again.</Header>}
                
                    <Container style={{ margin:'2em 0' }} textAlign='center'>
                        {/* Not Working.. */}
                    {/* <OptionRenderer/> */}
                    {/* {OptionRenderer()} */}
                    <RenderAnalysisBtn />
                    </Container>
                </div>
            )
        }else if(loading && !newsData){
            return(
                <Loader active>
                Collecting data... 
                <br/>
                Please allow for up to 15 seconds for this process to complete...
                <br/>
                {!currentUser && <><br/><>Why not sign in while you wait?</></>}
                </Loader>
            )
        }else{
            return(
                <Results 
                newsData={newsData}
                rawNewsData={rawNewsData}
                websiteChoice1={websiteChoice1} 
                websiteChoice2={websiteChoice2} 
                websiteChoice3={websiteChoice3} 
                sites={sites} 
                setRawNewsData={setRawNewsData}
                setNewsData={setNewsData}
                setWebsiteChoice1={setWebsiteChoice1}
                setWebsiteChoice2={setWebsiteChoice2}
                setWebsiteChoice3={setWebsiteChoice3}
                setAnalysisValue={setAnalysisValue}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                isSavedResult={false}
                setIsSavedResult={setIsSavedResult}
                isHistoricalResult={false}
                setIsHistoricalResult={setIsHistoricalResult}
                />
            )
        }
    }else{
        return(
            <ErrorPage errCode={errCode} />
        )
    }
}



return (
    <>
    <HomePageRenderHelper />
    </>);
}

const optionBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

export default HomePage;