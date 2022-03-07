import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const BookForm = (props) => {
  const [book, setBook] = useState({
    bookname: props.book ? props.book.bookname : '',
    author: props.book ? props.book.author : '',
    genre: props.book ? props.book.genre : '',
    published: props.book ? props.book.published : '',
    dateread: props.book ? props.book.dateread : ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const {bookname, author, genre, published, dateread } = book;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [bookname, author, genre, published, dateread];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const book = {
        id: uuidv4(),
        bookname,
        author,
        genre,
        published,
        dateread
      };
      props.handleOnSubmit(book);
    } else {
      errorMsg = 'Please fill out all of the fields.'
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'bookname':
        setBook((prevState) => ({
          ...prevState,
          [name]: value
        }));
        break;
      case 'author':
        setBook((prevState) => ({
          ...prevState,
          [name]: value
        }));
        break;
      case 'genre':
        setBook((prevState) => ({
          ...prevState,
          [name]: value
        }));
      break;
      default:
        setBook((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="bookname"
            value={bookname}
            placeholder="Enter name of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Book Author</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="author"
            value={author}
            placeholder="Enter name of author"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="genre"
            value={genre}
            placeholder="Enter genre"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="published">
          <Form.Label>Publish Date</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="published"
            value={published}
            placeholder="Enter the year the book was published"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="dateread">
          <Form.Label>Date Read</Form.Label>
          <Form.Control
            className="input-control"
            type="date"
            name="dateread"
            value={dateread}
            placeholder="Enter the date the book was finished"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;