import React, {useState} from 'react';
import ResultTable from './ResultTable';
import { Form, Radio, Container, Header, Button } from 'semantic-ui-react'
import ResultWordCloud from './ResultWordCloud';
import ResultBar from './ResultBar';
import ResultPie from './ResultPie';





const Results = (
                {newsData,
                 setNewsData, 
                 websiteChoice,
                 websiteChoice1, 
                 websiteChoice2, 
                 websiteChoice3, 
                 sites, 
                 setAnalysisValue, 
                 setWebsiteChoice, 
                 setWebsiteChoice1, 
                 setWebsiteChoice2,
                 setWebsiteChoice3,
                 currentUser,
                 setCurrentUser}) => {

    const [value, setValue] = useState('table');
    const [saved, setSaved] = useState(false);


    const goBackEventHandler = () => {
        setNewsData(null)
        setAnalysisValue(null)
        setWebsiteChoice(null)
        setWebsiteChoice1(null)
        setWebsiteChoice2(null)
        setWebsiteChoice3(null)
        setNewsData(null)
    }


    const RenderResultView = () => {
        if (value == 'table'){
            
            if(websiteChoice){
                return <ResultTable newsData={newsData}/>
            }else if(websiteChoice1 && websiteChoice2){
                return(
                <>
                    <ResultTable newsData={newsData[websiteChoice1]}/>
                    <ResultTable newsData={newsData[websiteChoice2]}/>
                </>);
            }
        }
        if (value == 'wordcloud'){
            if (websiteChoice){
            return <ResultWordCloud newsData={newsData}/>
            } else if(websiteChoice1 && websiteChoice2){
                return(
                    <>
                        <ResultWordCloud newsData={newsData[websiteChoice1]}/>
                        <ResultWordCloud newsData={newsData[websiteChoice2]}/>
                    </>);
            }
        }
        if (value == 'bar'){
            if (websiteChoice){
                return <ResultBar newsData={newsData}/>
                } else if(websiteChoice1 && websiteChoice2){
                    return(
                        <>
                            <ResultBar newsData={newsData[websiteChoice1]}/>
                            <ResultBar newsData={newsData[websiteChoice2]}/>
                        </>);
                }
        }
        if (value == 'pie'){
            if (websiteChoice){
                return <ResultPie newsData={newsData}/>
                } else if(websiteChoice1 && websiteChoice2){
                    return(
                        <>
                            <ResultPie newsData={newsData[websiteChoice1]}/>
                            <ResultPie newsData={newsData[websiteChoice2]}/>
                        </>);
                }
        }
    }

    const handleChange = (event, {value}) => setValue(value);

    const postResultData = () => {

        const createReqBody = () => {
            const body = {}
            if(websiteChoice){
                body['word_frequencies_1'] = newsData
                body['website_1'] = websiteChoice
            }else if(websiteChoice1 && websiteChoice2){
                    body['word_frequencies_1'] = newsData[websiteChoice1]
                    body['website_1'] = websiteChoice1
                    body['word_frequencies_2'] = newsData[websiteChoice2]
                    body['website_2'] = websiteChoice2
            }else if(websiteChoice1 && websiteChoice2 & websiteChoice3){
                body['word_frequencies_1'] = newsData[websiteChoice1]
                body['website_1'] = websiteChoice1
                body['word_frequencies_2'] = newsData[websiteChoice2]
                body['website_2'] = websiteChoice2
                body['word_frequencies_3'] = newsData[websiteChoice3]
                body['website_3'] = websiteChoice3
            }
            return body
        }
    
        const postDataUrl = 'http://127.0.0.1:5000/api/v1/add_word_frequency'
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
            })


    }



    const SaveElement = () => {
        if(saved){
            return <p>Result saved!</p>
        } else{
            return <Button onClick={()=> postResultData()}>Save Result</Button>
        }
    }



    
    return (
        <Container>
            <Header as='h2'>Word Frequency website results from the front page of {sites[websiteChoice]} </Header>
            <Form>
                <Form.Field>
                    Selected value: <b>{value}</b>
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Table'
                        name='radioGroup'
                        value='table'
                        checked={value === 'table'}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Word Cloud'
                        name='radioGroup'
                        value='wordcloud'
                        checked={value === 'wordcloud'}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Bar Chart'
                        name='radioGroup'
                        value='bar'
                        checked={value === 'bar'}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Pie Chart'
                        name='radioGroup'
                        value='pie'
                        checked={value === 'pie'}
                        onChange={handleChange}
                    />
                </Form.Field>
            </Form>
            <RenderResultView/>
            <Container>
            <Button onClick={()=> goBackEventHandler()}>Go Back</Button>
            <SaveElement />
            </Container>
        </Container>
    )
};

export default Results