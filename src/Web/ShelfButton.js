import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom"


const ShelfButton = (props) => {
    // const API_KEY = "https://gifted-chimera-277819.uc.r.appspot.com/api/"
  const API_KEY = "http://127.0.0.1:8000/api/"

  const history = useHistory();
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  function tagBook(id) {
    const book = props.currentBook.volumeInfo
    const data = {
      headers: { Authorization: "Bearer " + props.user.token },
        uniqueBook: props.currentBook.id,
        tag_id: id,
        user_id: props.user.user.id,
        bookTitle: book.title,
        bookImage: book.imageLinks.smallThumbnail,
        bookPage: book.pageCount,
        bookAuthor: book.authors[0],
        bookPubDate: book.publishedDate,
        bookPub: book.publisher,
        bookDescription: book.description
      }
      console.log(data)
    axios.post(API_KEY + 'tagBook', data)
      .then(function (response) {
        props.setBookList(response.data)
        props.storeTags(response.data)
        history.push("/dash")

      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    return (
      <ButtonDropdown className="mt-3" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret size="sm">
          Add to shelf
      </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => tagBook(1)}>want-to-read</DropdownItem>
          <DropdownItem onClick={() => tagBook(2)}>currently-reading</DropdownItem>
          <DropdownItem onClick={() => tagBook(3)}>read</DropdownItem>

        </DropdownMenu>
      </ButtonDropdown>
    );
  }

  export default ShelfButton;