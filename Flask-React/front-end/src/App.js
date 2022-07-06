import {useState, useEffect} from 'react';
import DropDown from './components/DropDown'
import NavBar from './components/Navbar';
import ResultTable from './components/ResultTable';
import {Container, Header, Dropdown, Form, Button} from 'semantic-ui-react';
import Home from './components/Home';
import Results from './components/Results';




function App() {

  // const flaskHome =  'http://127.0.0.1:5000/api/v1'


  //Use Effect fetch newsites from api!

  

  const [newsData, setNewsData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const[analysisValue, setAnalysisValue] = useState(null)
  const [websiteChoice, setWebsiteChoice] = useState(null)
  const [websiteChoice1, setWebsiteChoice1] = useState(null)
  const [websiteChoice2, setWebsiteChoice2] = useState(null)





  // const sites = ['BBC', 'The Guardian', 'Fox News']
  const sites = {'bbc': 'BBC', 'guardian': 'The Guardian', 'fox':'Fox News'}

  const websitesOptions = [
    {key: 'bbc', value:'bbc', text: 'the BBC'},
    {key: 'guardian', value: 'guardian', text: 'the Guardian'},
    {key: 'fox', value: 'fox', text: 'Fox News'},
  ]

  const analysisOptions = [
    {key: 'wf', value:'wf', text: 'Word Frequency'},
    {key: 'wfc', value: 'wfc', text: 'Word Frequency Compare'}
  ]


  


  const FrontPageRenderHelper = () => {
    if(!loading && !newsData){
      return(
        <Home
        analysisValue={analysisValue} 
        websiteChoice={websiteChoice}
        websiteChoice1={websiteChoice1}
        websiteChoice2={websiteChoice2}
        setWebsiteChoice={setWebsiteChoice}
        setWebsiteChoice1={setWebsiteChoice1}
        setWebsiteChoice2={setWebsiteChoice2}
        websitesOptions={websitesOptions}
        analysisOptions={analysisOptions}
        setAnalysisValue={setAnalysisValue}
        setLoading={setLoading}
        setNewsData={setNewsData} />
      )
    }else if(loading && !newsData){
      return(
        <Header>Loading...</Header>
      )
    }else{
      return(
        <Results newsData={newsData} websiteChoice={websiteChoice} sites={sites}/>
      )
    }
  }
 



  return (
    <div className="App">
      <Container style={{ marginTop: '1em' }}>
        <NavBar/>
        <Container text style={{ marginTop: '4em' }}> 
        <Container style={{ margin:'2em 0' }} textAlign='center'>
         <FrontPageRenderHelper/>
        </Container>
        
      
         {/* {newsData && <ResultTable newsData={newsData}/>} */}

        </Container>
      </Container>
       
    </div>
  );
  }


export default App;


