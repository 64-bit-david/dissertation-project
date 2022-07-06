from app import create_app, db
import json
import models
import unittest


class TestApp(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        test_config = {
            'SQLALCHEMY_DATABASE_URI': "sqlite:///:memory:",
            'TESTING': True
        }
        cls.app = create_app(test_config)
        cls.app_context = cls.app.app_context()
        cls.app_context.push()
        cls.client = cls.app.test_client()

    @classmethod
    def tearDownClass(cls) -> None:
        cls.app_context.pop()

    def setUp(self) -> None:
        db.create_all()
        db.session.commit()
        
    def tearDown(self) -> None:
        db.drop_all()
        db.session.commit()

    def test_get_books(self):
        book = models.Book(title="Alice's Adventures in Wonderland", author="Lewis Carroll")
        db.session.add(book)
        db.session.commit()
        rv = self.client.get('/books/')
        json_data = json.loads(rv.data)
        self.assertEqual(len(json_data), 1)
        d = book.to_dict()
        self.assertEqual(d['title'], json_data[0]['title'])
        self.assertEqual(d['author'], json_data[0]['author'])
        self.assertEqual(rv.status_code, 200)

    def test_get_book(self):
        book = models.Book(title="Alice's Adventures in Wonderland", author="Lewis Carroll")
        db.session.add(book)
        db.session.commit()
        rv = self.client.get('/books/1')
        json_data = json.loads(rv.data)
        d = book.to_dict()
        self.assertEqual(d['title'], json_data['title'])
        self.assertEqual(d['author'], json_data['author'])
        self.assertEqual(rv.status_code, 200)
        rv = self.client.get('/books/2')
        self.assertEqual(rv.status_code, 500)

    def test_put_book(self):
        book = models.Book(title="Alice's Adventures in Wonderland", author="Lewis Carroll")
        db.session.add(book)
        db.session.commit()
        new_book = models.Book(title="The Hitchhiker's Guide to the Galaxy", author="Douglas Adams")
        rv = self.client.put('/books/1', json=new_book.to_dict())
        self.assertEqual(rv.status_code, 200)
        book = models.Book.query.filter_by(id=book.id).first()
        self.assertEqual(book.title, new_book.title)
        self.assertEqual(book.author, new_book.author)
        rv = self.client.put('/books/2', json=new_book.to_dict())
        self.assertEqual(rv.status_code, 500)

    def test_post_book(self):
        new_book = models.Book(title="The Hitchhiker's Guide to the Galaxy", author="Douglas Adams")
        rv = self.client.post('/books/', json=new_book.to_dict())
        self.assertEqual(rv.status_code, 201)
        book = models.Book.query.first()
        self.assertEqual(book.title, new_book.title)
        self.assertEqual(book.author, new_book.author)

    def test_delete_book(self):
        book = models.Book(title="Alice's Adventures in Wonderland", author="Lewis Carroll")
        db.session.add(book)
        db.session.commit()
        rv = self.client.delete('/books/1')
        self.assertEqual(rv.status_code, 200)
        books = models.Book.query.all()
        self.assertEqual(len(books), 0)
        rv = self.client.delete('/books/1')
        self.assertEqual(rv.status_code, 500)


if __name__ == "__main__":
    unittest.main()
