

def test_created_user(created_user):
    """
    GIVEN a User model
    WHEN a new User is created
    THEN check the username created correctly, and that the password goes through some hashing process (plaintext password provided by user should not be same as hash_password property)
    """

    #username is created
    assert created_user.username == 'test_user'
    #If password is hashed it will not be equal to the plain text password used to created user.
    assert created_user.hashed_password != 'test_password'
    
