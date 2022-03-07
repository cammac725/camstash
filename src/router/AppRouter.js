import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddBook from '../components/AddBook';
import Bookslist from '../components/Bookslist';
import Header from '../components/Header';
import useLocalStorage from '../hooks/useLocalStorage';

const AppRouter = () => {
  const [books, setBooks] = useLocalStorage('books', []);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className='main-content'>
          <Switch>
            <Route 
              render={(props) => (
                <Bookslist {...props} books={books} setBooks={setBooks} />
              )}
              path="/" exact />
            <Route 
              render={(props) => (
                <AddBook {...props} books={books} setBooks={setBooks} />
              )}
              path="/add" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;