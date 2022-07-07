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
                 sites, 
                 setAnalysisValue, 
                 setWebsiteChoice, 
                 setWebsiteChoice1, 
                 setWebsiteChoice2}) => {

    const [value, setValue] = useState('table');

    const goBackEventHandler = () => {
        setNewsData(null)
        setAnalysisValue(null)
        setWebsiteChoice(null)
        setWebsiteChoice1(null)
        setWebsiteChoice2(null)
        setNewsData(null)
        
    }


    const RenderResultView = () => {
        if (value == 'table'){
            return <ResultTable newsData={newsData}/>
        }
        if (value == 'wordcloud'){
            return <ResultWordCloud newsData={newsData}/>
        }
        if (value == 'bar'){
            return <ResultBar newsData={newsData}/>
        }
        if (value == 'pie'){
            return <ResultPie newsData={newsData}/>
        }
    }

    const handleChange = (event, {value}) => setValue(value);

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
            <Button >Save Result</Button>
            </Container>
        </Container>
    )
};

export default Results