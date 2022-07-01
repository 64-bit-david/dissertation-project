import {useState, useEffect} from 'react';
import {TagCloud} from 'react-tagcloud';
import DropDown from './components/DropDown'
import NavBar from './components/Navbar';
import {Container, Header, Dropdown, Form} from 'semantic-ui-react';



function App() {

  const flaskHome =  'http://127.0.0.1:5000/api/v1/word_frequency?website=fox'

  //Use Effect fetch newsites from api!

  

  const [newsData, setNewsData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // const [newsWebsites, setNewsWebsites] = []
  const[ analysisValue, setAnalysisValue] = useState('')
  const [websiteChoice, setWebsiteChoice] = useState('')
  const [websiteChoice1, setWebsiteChoice1] = useState('')
  const [websiteChoice2, setWebsiteChoice2] = useState('')





  // const sites = ['BBC', 'The Guardian', 'Fox News']
  const sites = [{'bbc': 'BBC'}, {'guardian': 'The Guardian'}, {'fox':'Fox News'}]

  const websitesOptions = [
    {key: 'bbc', value:'bbc', text: 'BBC'},
    {key: 'guardian', value: 'guardian', text: 'The Guardian'},
    {key: 'fox', value: 'fox', text: 'Fox News'},

  ]

  const analysisOptions = [
    {key: 'wf', value:'wf', text: 'Word Frequency'},
    {key: 'wfc', value: 'wfc', text: 'Word Frequency Compare'}
  ]

  console.log(websiteChoice)

  const getNewsData = () => {
    setLoading(true)
  fetch(flaskHome).then(res => {
      console.log('data recieved!')
      return res.json()
  }).then(data => {
      console.log(data)
      setLoading(false)
      setNewsData(data)
  })}  



  

  const WebsiteDropdown = () => {
    if(analysisValue==='wf'){
      return(
      <Container style={{ marginTop: '1em' }}>
        <p>Select a website to find the most frequently used words in their headlines at this moment</p>
          <DropDown
              selectOptions={websitesOptions} 
              selectValue={websiteChoice}
              setSelectValue={setWebsiteChoice}
          />
        </Container>
      )
    }else if(analysisValue === 'wfc'){
      return (
        <>
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
          </div>
        </>


      )
    }
  } 
 



  return (
    <div className="App">
      <Container style={{ marginTop: '1em' }}>
        <NavBar/>
        <Container text style={{ marginTop: '4em' }}>
        {/* {loading && <p>Loading....</p>} */}

        <Header as='h2' textAlign='center'>
          Welcome to the News Trends Analyser
        </Header>
        <Container text style={{ margin:'.5em 0 5em 0' }}>
          <Header as='h3' textAlign='center'>
            Choose an option below to get started
          </Header>
        </Container>
        <Container style={{ margin:'2em 0' }} textAlign='center'>
          <DropDown
            selectOptions={analysisOptions} 
            selectValue={analysisValue}
            setSelectValue={setAnalysisValue} />
          </Container>

        
        <Container style={{ margin:'2em 0' }} textAlign='center'>
          
          <WebsiteDropdown />
        </Container>

        <button onClick={()=> getNewsData()}>click me for news!</button>

        
        <div>{newsData &&  
                <TagCloud
                  minSize={12}
                  maxSize={35}
                  tags={newsData}
                  onClick={tag => alert(`'${tag.value}' was selected!`)}
                 />}
         </div>

        </Container>
      </Container>
       
    </div>
  );
  }


export default App;


