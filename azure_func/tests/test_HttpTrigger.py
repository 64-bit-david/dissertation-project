import unittest
import azure.functions as func
from HttpTrigger import fetch_html, get_header_tags, main, word_counter, headline_filter, fetch_html
from os import path 
import os

class TestFunction(unittest.TestCase):

    # def test_my_second_function(self):
    #     req = func.HttpRequest(
    #         method='GET',
    #         body=None,
    #         url='/api/my_second_function',
    #         params={'websites': 'bbc'})


    #     res = main(req)
    #     print(res)
    #     self.assertEqual(
    #         res.status_code,200
    #     )


    def test_word_counter(self):
        """
        GIVEN the word_counter helper function
        WHEN a string containing four unique words and the word 'one' three times
        THEN check the length of the resulting list is 4, each dict in the list has 
        the keys 'count' and 'value' and dict with a value of 'one' has a count of 3
        """
        test_string = "one two three four one one"
        test_result = word_counter(test_string)

        #Each dict in the list should contain the keys 'count' and 'value'
        for result in test_result:
            self.assertIn('count', result)
            self.assertIn('value', result)

            # The dict where value is 'one' should have 'count' equal to num 3 
            if result['value'] == 'one':
                self.assertEqual(result['count'], 3)
        #There are 4 unique words therefor the length of the wordcount list should be 4
        self.assertEqual(len(test_result), 4)
             


    def test_headline_filter(self):
        """
        GIVEN the headline_filter helper function
        WHEN the test string is passed
        THEN the result should be a string with no caps, punctuation or common words
        """

        test_string = 'tHe TeSt of A #String Test'

        test_result1 = headline_filter(test_string)
        correct_result = 'test string test'
        self.assertEqual(test_result1, correct_result)


    
    def test_get_header_tags(self):
        """
        GIVEN the get_header_tags helper function and a dummy html file
        WHEN the function is called with the 'msnbc' name and the html file has the corresponding 'msnbc' html tags
        THEN the value returned should be equal to the expected string
        """
        
        with open('tests/page_test.html', 'r') as f:
            header_tags = get_header_tags(f, 'msnbc')
            self.assertEqual(header_tags, 'Test1 Test2 Test3 ')




