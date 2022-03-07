import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddBook from '../components/AddBook';
import Bookslist from '../components/Bookslist';
import Header from '../components/Header';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className='main-content'>
          <Routes>
            <Route element={<Bookslist/>} path="/" exact />
            <Route element={<AddBook/>} path="/add" />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;