from models import WebsiteData

def test_created_user_fixture(created_user):
    """
    GIVEN a User model
    WHEN a new User is created
    THEN check the username created correctly, and that the password goes through some hashing
     process (plaintext password provided by user should not be same as hash_password property)
    """
    #username is created
    assert created_user.username == 'test_user'
    #If password is hashed it will not be equal to the plain text password used to created user.
    assert created_user.hashed_password != 'test_password'


def test_created_word_frequency():
    """  
    GIVEN a WebsiteData Model
    WHEN a new word frequency is created
    THEN check the fields are as expected
      """
    
    
    w_f = WebsiteData(id=5, 
                        user_id = 1, 
                        website_1 = 'website1', 
                        word_count_1 = 'here is some data',
                        website_2 = 'website2', 
                        word_count_2 = 'here is some more data')
    assert w_f.id == 5
    assert w_f.user_id == 1
    assert w_f.website_1 == 'website1'
    assert w_f.word_count_1 == 'here is some data'
    assert w_f.website_2 == 'website2'
    assert w_f.word_count_2 == 'here is some more data'
