import {useState, useEffect} from 'react';
import DropDown from './components/DropDown'
import NavBar from './components/Navbar';
import ResultTable from './components/ResultTable';
import {Container, Header, Dropdown, Form, Button} from 'semantic-ui-react';
import Home from './components/Home';
import Results from './components/Results';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreviousResults from './PreviousResults';
import LogInModal from './components/LogInModal';
import SignUpModal from './components/SignUpModal';



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};




// Modal.setAppElement()
function App() {




  

  const [newsData, setNewsData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const[analysisValue, setAnalysisValue] = useState(null)
  const [websiteChoice, setWebsiteChoice] = useState(null)
  const [websiteChoice1, setWebsiteChoice1] = useState(null)
  const [websiteChoice2, setWebsiteChoice2] = useState(null)
  const [modalLogInIsOpen, setModalLogInIsOpen] = useState(false);
  const [modalSignUpIsOpen, setModalSignUpIsOpen] = useState(false);


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
        <Results 
              newsData={newsData} 
              websiteChoice={websiteChoice} 
              sites={sites} 
              setNewsData={setNewsData}
              setWebsiteChoice={setWebsiteChoice}
              setWebsiteChoice1={setWebsiteChoice1}
              setWebsiteChoice2={setWebsiteChoice2}
              setAnalysisValue={setAnalysisValue}

              />
      )
    }
  }
 



  return (
    <div className="App">
      <Router>
        <NavBar 
              modalLogInIsOpen={modalLogInIsOpen}
              modalSignUpIsOpen={modalSignUpIsOpen}
              setModalLogInIsOpen={setModalLogInIsOpen}
              setModalSignUpIsOpen={setModalSignUpIsOpen}/>
              
        <Routes>
          <Route exact path='/previous-results' element={<PreviousResults/>} />
          <Route path = '/' element={<FrontPageRenderHelper/>} />
      </Routes>
      </Router>    
      <LogInModal modalLogInIsOpen={modalLogInIsOpen} setModalLogInIsOpen={setModalLogInIsOpen}/>
      {/* <SignUpModal /> */}
    </div>
  );
  }


export default App;


