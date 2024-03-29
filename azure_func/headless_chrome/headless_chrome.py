from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager



class HeadlessChrome:
    """
    A class to provide access to a headless Chrome browser.
    """
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-dev-shm-usage")
        # self.driver = webdriver.Chrome(options=chrome_options)
        # self.driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)
        self.driver = webdriver.Chrome(options=chrome_options, service=Service(ChromeDriverManager().install()))


    def quit(self):
        """
        A function to shutdown the Chrome browser.
        """
        self.driver.quit()

    def get(self, url_str):
        """
        A function to get the source of an HTML page.
        """
        self.driver.get(url_str)
        return self.driver.page_source

    def stuff(self):
        print('at least this shit works')


if __name__ == "__main__":
    """
    A test program to create a Chrome instance and stop it.
    """
    h = HeadlessChrome()
    h.quit()
