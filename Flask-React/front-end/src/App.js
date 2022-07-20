import {useState, useEffect} from 'react';
import NavBar from './components/Navbar';
import {Container, Header} from 'semantic-ui-react';
import Home from './components/Home';
import Results from './components/Results';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreviousResults from './components/PreviousResults';
import LogInModal from './components/LogInModal';
import SignUpModal from './components/SignUpModal';
import axios from './api/axios'






// Modal.setAppElement()
function App() {

  

  const [newsData, setNewsData] = useState(null)
  const [newsData1, setNewsData1] = useState(null)
  const [newsData2, setNewsData2] = useState(null)
  const [newsData3, setNewsData3] = useState(null)

  const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)
  const[analysisValue, setAnalysisValue] = useState(null)
  const [websiteChoice, setWebsiteChoice] = useState(null)
  const [websiteChoice1, setWebsiteChoice1] = useState(null)
  const [websiteChoice2, setWebsiteChoice2] = useState(null)
  const [websiteChoice3, setWebsiteChoice3] = useState(null)
  const [modalLogInIsOpen, setModalLogInIsOpen] = useState(false);
  const [modalSignUpIsOpen, setModalSignUpIsOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null)

  // useEffect(() => {
  // const getUser =  'http://127.0.0.1:5000/api/v1/'
    
  
 
  // }, [isSignedIn])
  

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

    
  // })


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
        websiteChoice3={websiteChoice3}
        setWebsiteChoice={setWebsiteChoice}
        setWebsiteChoice1={setWebsiteChoice1}
        setWebsiteChoice2={setWebsiteChoice2}
        setWebsiteChoice3={setWebsiteChoice3}
        websitesOptions={websitesOptions}
        analysisOptions={analysisOptions}
        setAnalysisValue={setAnalysisValue}
        setLoading={setLoading}
        setNewsData={setNewsData}
        setNewsData1={setNewsData1}
        setNewsData2={setNewsData2}
        setNewsData3={setNewsData3}
        
        />
      )
    }else if(loading && !newsData){
      return(
        <Header>Loading...</Header>
      )
    }else{
      return(
        <Results 
              newsData={newsData}
              newsData1={newsData1} 
              newsData2={newsData2} 
              newsData3={newsData3} 
              websiteChoice={websiteChoice}
              websiteChoice1={websiteChoice1} 
              websiteChoice2={websiteChoice2} 
              websiteChoice3={websiteChoice3} 
              sites={sites} 
              setNewsData={setNewsData}
              setNewsData1={setNewsData1}
              setNewsData2={setNewsData2}
              setNewsData3={setNewsData3}
              setWebsiteChoice={setWebsiteChoice}
              setWebsiteChoice1={setWebsiteChoice1}
              setWebsiteChoice2={setWebsiteChoice2}
              setWebsiteChoice3={setWebsiteChoice3}
              setAnalysisValue={setAnalysisValue}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              />
      )
    }
  }
 



  return (
    <div className="App">
      <Router>
        <Container>
        <NavBar 
              modalLogInIsOpen={modalLogInIsOpen}
              modalSignUpIsOpen={modalSignUpIsOpen}
              setModalLogInIsOpen={setModalLogInIsOpen}
              setModalSignUpIsOpen={setModalSignUpIsOpen}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              />
              
        <Routes>
          <Route exact path='/previous-results' element={
              <PreviousResults currentUser={currentUser} />
          } />
          <Route path = '/' element={<FrontPageRenderHelper/>} />
      </Routes>
      </Container>
      </Router>    
      <LogInModal
           modalLogInIsOpen={modalLogInIsOpen} 
           setModalLogInIsOpen={setModalLogInIsOpen}
           modalSignUpIsOpen={modalSignUpIsOpen}
           setModalSignUpIsOpen={setModalSignUpIsOpen}
           currentUser={currentUser}
           setCurrentUser={setCurrentUser}
           />
      <SignUpModal 
          modalLogInIsOpen={modalLogInIsOpen} 
          setModalLogInIsOpen={setModalLogInIsOpen}
          modalSignUpIsOpen={modalSignUpIsOpen}
          setModalSignUpIsOpen={setModalSignUpIsOpen}/>
    </div>
  );
  }


export default App;


