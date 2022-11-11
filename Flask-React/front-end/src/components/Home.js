
import { Container, Header, Button } from "semantic-ui-react"
import DropDown from "./DropDown";
import axios from '../api/axios';
import { useEffect, useState } from "react";

const Home = ({ 
              websiteChoice1, 
              websiteChoice2,
              websiteChoice3, 
              setWebsiteChoice1, 
              setWebsiteChoice2, 
              setWebsiteChoice3,
              analysisValue, 
              websitesOptions, 
              analysisOptions,
              setNewsData,
              setLoading,
              setAnalysisValue,
              setError,
              setErrCode}) => {


  
  const [renderThirdDrop, setRenderThirdDrop] = useState(false)

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
        setLoading(false)
        console.log(data)
        setNewsData(data)
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

  const optionBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }


  export default Home;