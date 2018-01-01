import React, {Component} from 'react';
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger';
import {findBookById} from './utils';
import sortBy from 'sort-by'

class BookShelf extends Component {
  static propTypes = {
    shelfId: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    shelfList: PropTypes.array
  }

  render() {
    const {books, moveBook, shelfList} = this.props;
    var {
      shelfId
    } = this.props;
    var cn = 'bookshelf-books';
    if (shelfId === 'search-shelf')
      cn = 'search-books-results';

    books.sort(sortBy('title'))

    return (
      <div className={cn}>
      <ol className="books-grid">
        {
          books.map((book) => {
            var shelf = null;
            if (shelfList) {
              const b = findBookById(shelfList, book.id);
              if (b)
                shelf = b.shelf;
              }
            return (<li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${
                      book.imageLinks
                        ? book.imageLinks.thumbnail
                        : 'https://historyexplorer.si.edu/sites/default/files/book-158.jpg'})`
                    }}></div>
                  <ShelfChanger book={book} shelf={shelf ? shelf : shelfId} moveBook={moveBook}/>
                </div>
                <div className="book-title">{book.title}</div>
                {'authors' in book && <div className="book-authors">{book.authors.join(', ')}</div>}
              </div>
            </li>);
          })
        }
      </ol>
    </div>
  );
  }
}

export default BookShelf
