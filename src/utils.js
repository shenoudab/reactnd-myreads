//------------------------------------------------------------------------------
// Author: Shenouda Bertel <shenoudab@mobiThought.com>
// Date: 01.01.2018
//------------------------------------------------------------------------------

import findBy from 'array-find-by';

//------------------------------------------------------------------------------
// Shelf Names
//------------------------------------------------------------------------------
export const shelfNames = {
  read: 'Read',
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want To Read',
  none: 'None'
};

//------------------------------------------------------------------------------
// Create a list of shelf books
//------------------------------------------------------------------------------
export function shelfToList(shelf_books) {
  const shelfIds = ['read', 'currentlyReading', 'wantToRead'];
  var bookList = [];
  var i;
  var j;
  for(i = 0; i < shelfIds.length; ++i) {
    var shelf = shelf_books[shelfIds[i]];
    for(j = 0; j < shelf.length; ++j)
      bookList.push({id: shelf[j].id, shelf: shelf[j].shelf});
  }
  return bookList;
}

//------------------------------------------------------------------------------
// Find book by id
//------------------------------------------------------------------------------
export function findBookById(books, id) {
  const book = findBy.call(books, 'id', id);
  if(book.length !== 2)
    return null;
  return book[0];
}
