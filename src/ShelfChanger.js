//------------------------------------------------------------------------------
// Author: Shenouda Bertel <shenoudab@mobiThought.com>
// Date: 01.01.2018
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { shelfNames } from './utils';

//------------------------------------------------------------------------------
// Chelf changer
//------------------------------------------------------------------------------
class ShelfChanger extends Component {
  //----------------------------------------------------------------------------
  // Property types
  //----------------------------------------------------------------------------
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  //----------------------------------------------------------------------------
  // Render
  //----------------------------------------------------------------------------
  render() {
    const opts = ['read', 'currentlyReading', 'wantToRead', 'none'];
    var shelf = this.props.shelf !== 'search-shelf' ? this.props.shelf : 'none';

    return (
      <div className="book-shelf-changer">
        <select
          defaultValue={shelf}
          onChange={(event) => {
            const { book, shelf, moveBook } = this.props;
            var target = event.target.value;
            moveBook(book, shelf, target);
          }}>
          <option value="disabled" disabled>Move to...</option>
          {opts.map((opt) => (
            <option
              key={opt}
              value={opt}>
              {shelfNames[opt]}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default ShelfChanger;
