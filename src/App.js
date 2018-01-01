import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI'
import {shelfNames, shelfToList} from './utils';

import './App.css'

class BooksApp extends Component {
  state = {
    shelf_books: {
      read: [],
      currentlyReading: [],
      wantToRead: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      var shelf_books = {
        read: [],
        currentlyReading: [],
        wantToRead: []
      };
      var i;
      for (i = 0; i < books.length; ++i)
        shelf_books[books[i].shelf].push(books[i]);
      this.setState({shelf_books});
    });
  }

  moveBook = (book, src, dst) => {
    if (src === dst)
      return;
    BooksAPI.update(book, dst).then(() => {
      this.setState((state) => {
        var shelf_books = state.shelf_books;
        if (src in this.state.shelf_books)
          shelf_books[src] = shelf_books[src].filter((b) => b.id !== book.id);
        if (dst !== 'none') {
          book.shelf = dst;
          shelf_books[dst].push(book);
        }
        return {shelf_books};
      });
    });
  }

  render() {
    return (
      <div className="app">
      <Route path='/search' render={() => (
          <SearchBooks
            moveBook={this.moveBook}
            shelfList={shelfToList(this.state.shelf_books)}
            />
        )}/>
      <Route exact path='/' render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {
                ['currentlyReading', 'wantToRead', 'read'].map((shelf_id) => (
                  <div className="bookshelf" key={'bs-' + shelf_id}>
                  <h2 className="bookshelf-title" key={'h2-' + shelf_id}>
                    {shelfNames[shelf_id]}
                  </h2>
                  <BookShelf key={shelf_id} shelfId={shelf_id} books={this.state.shelf_books[shelf_id]} moveBook={this.moveBook}/>
                </div>))
              }
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>Add Book</Link>
          </div>
        </div>)}/>
    </div>)
  }
}

export default BooksApp
