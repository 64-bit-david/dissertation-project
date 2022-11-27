import {useState, useEffect} from 'react';
import axios from './api/axios'
import NavBar from './components/Navbar';
import {Container, Loader} from 'semantic-ui-react';
import Home from './components/Home';
import Results from './components/Results';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreviousResults from './components/PreviousResults';
import LogInModal from './components/LogInModal';
import SignUpModal from './components/SignUpModal';
import ErrorPage from './components/ErrorPage';
import HistoricalResults from './components/HistoricalResults';
import HistoricalHome from './components/HistoricalHome';
import HomePage from './components/HomePage';






// Modal.setAppElement()
function App() {

  

  const [newsData, setNewsData] = useState(null)
  const [rawNewsData, setRawNewsData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const[errCode, setErrCode] = useState(null)
  const[analysisValue, setAnalysisValue] = useState(null)
  const [websiteChoice, setWebsiteChoice] = useState(null)
  const [websiteChoice1, setWebsiteChoice1] = useState(null)
  const [websiteChoice2, setWebsiteChoice2] = useState(null)
  const [websiteChoice3, setWebsiteChoice3] = useState(null)
  const [modalLogInIsOpen, setModalLogInIsOpen] = useState(false);
  const [modalSignUpIsOpen, setModalSignUpIsOpen] = useState(false);
  const[isSavedResult, setIsSavedResult] = useState(false);
  const[isHistoricalResult, setIsHistoricalResult] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const [sites, setSites] = useState(null)
  const [websitesOptions, setWebsitesOptions] = useState(null)
  const [hNewsData, setHNewsData] = useState(null)

  useEffect(() => {
    if(!sites){
    axios.get()
    .then( res => {
      setSites(res.data.data)
    })
  
  
  }
 
  }, [sites])
  
  useEffect(() => {
    if(sites && !websitesOptions){
      const tempArr = []
      for(let site in sites){
        let tempObj = {}
        tempObj['key'] = site
        tempObj['value'] = site
        tempObj['text'] = sites[site]
        tempArr.push(tempObj)
      }
      setWebsitesOptions(tempArr)
    }
  },[sites, websitesOptions])

  // const sites = ['BBC', 'The Guardian', 'Fox News']
  // const sites = {'bbc': 'BBC', 'guardian': 'The Guardian', 'fox':'Fox News'}

  // const websitesOptions = [
  //   {key: 'bbc', value:'bbc', text: 'the BBC'},
  //   {key: 'guardian', value: 'guardian', text: 'the Guardian'},
  //   {key: 'fox', value: 'fox', text: 'Fox News'},
  // ]

  const analysisOptions = [
    {key: 'wf', value:'wf', text: 'Word Frequency'},
    {key: 'wfc', value: 'wfc', text: 'Word Frequency Compare'}
  ]

  


  const FrontPageRenderHelper = () => {
    if(!error){

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
        setRawNewsData={setRawNewsData}
        setError={setError}
        setErrCode={setErrCode}
        setIsHistoricalResult={setIsHistoricalResult}
        />
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
              isSavedResult={isSavedResult}
              setIsSavedResult={setIsSavedResult}
              isHistoricalResult={false}
              setIsHistoricalResult={setIsHistoricalResult}
              />
      )
    }
  } else {
    return <ErrorPage errCode={errCode} setState1={setLoading} setError={setError}/>
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
              <PreviousResults 
                    currentUser={currentUser}
                    isSavedResult={isSavedResult} 
                    setIsSavedResult={setIsSavedResult}
                    setIsHistoricalResult={setIsHistoricalResult}
                    setRawNewsData={setRawNewsData}
                    newsData={newsData}
                    setNewsData={setNewsData}
                    sites={sites}
                    />
          } />
          <Route path = '/' 
            element={
              <Home
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                analysisValue={analysisValue} 
                setAnalysisValue={setAnalysisValue}
                websitesOptions={websitesOptions}
                analysisOptions={analysisOptions}
                setIsSavedResult={setIsSavedResult}
                setError={setError}
                sites={sites}
                setErrCode={setErrCode}
                selectOptions={websitesOptions}
                setWebsiteChoice1={setWebsiteChoice1}
                setWebsiteChoice2={setWebsiteChoice2}
                setWebsiteChoice3={setWebsiteChoice3}
                websiteChoice1={websiteChoice1} 
                websiteChoice2={websiteChoice2} 
                websiteChoice3={websiteChoice3} 
              />}/>
          {/* <Route path = '/' element={<FrontPageRenderHelper/>} /> */}
          <Route exact path = '/historical-results' 
                    element={
                      <HistoricalHome
                        websitesOptions={websitesOptions}
                        analysisOptions={analysisOptions}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        isSavedResult={false}
                        setIsSavedResult={setIsSavedResult}
                        isHistoricalResult={true}
                        setIsHistoricalResult={setIsHistoricalResult}
                        // hNewsData={hNewsData}
                        // setHNewsData={setHNewsData}
                        setRawNewsData={setRawNewsData}
                        sites={sites}
                      />} />
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


