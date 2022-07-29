
import { Container, Header, Button } from "semantic-ui-react"
import DropDown from "./DropDown"
import axios from '../api/axios'

const Home = ({websiteChoice, 
              websiteChoice1, 
              websiteChoice2,
              websiteChoice3, 
              setWebsiteChoice, 
              setWebsiteChoice1, 
              setWebsiteChoice2, 
              setWebsiteChoice3,
              analysisValue, 
              websitesOptions, 
              analysisOptions,
              setNewsData,
              setLoading,
              setAnalysisValue}) => {





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
  
    axios.get('/word_frequency' + queryParams )
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
        console.log(err.message)
      })

    }

  const DropDownWebsites = () =>{ 
    if(analysisValue==='wf'){
      setWebsiteChoice2(null)
      setWebsiteChoice3(null)
      return(
      <Container style={{ marginTop: '1em' }}>
        <p>Select a website to find the most frequently used words in their headlines at this moment</p>
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
          <div style={{ marginTop: '1em 0' }}>
        <p>Select a website to find the most frequently used words in their headlines at this moment</p>

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
            {/* Need a button here to optionally render third drop down! */}
          </div>
        </Container>
    )}
  }


  return(
    <>
        <Header as='h1'>Welcome to the NewsTrendsAnalyser</Header>
        <Container style={{ margin:'2em 0' }} textAlign='center'>
          <DropDown
            selectOptions={analysisOptions} 
            selectValue={analysisValue}
            setSelectValue={setAnalysisValue} />
          </Container>
          <DropDownWebsites />
          <Container style={{ margin:'2em 0' }} textAlign='center'>
          <Button content='Start Analysis' primary onClick={() => getHeadlineWordFreqs()} textAlign='center'/>
          </Container>
    </>
  )

  }


  export default Home;