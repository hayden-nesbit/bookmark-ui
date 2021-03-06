import React, { useState, useEffect } from 'react';
import ReactNav from './ReactNav'
import Landing from './Landing'
import Footer from './Footer'
import BookView from './BookView'
import UserDash from './UserDash'
import BookSearch from './BookSearch'
import SearchBar from './SearchBar'
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css'

function App() {

  var userData = JSON.parse(localStorage.getItem("userData"));
  userData = userData ? userData : {}
  const [user, setUser] = useState(userData);
  const [tags, setTags] = useState(JSON.parse(localStorage.getItem("tagData")));
  const [books, setBooks] = useState(JSON.parse(localStorage.getItem("bookData")));
  const [bookList, setBookList] = useState([]);
  const [currentBook, setCurrentBook] = useState(JSON.parse(localStorage.getItem("CurrentBookId")));
  var goalData = JSON.parse(localStorage.getItem("goalData"));
  goalData = goalData ? goalData : []
  const [goal, setGoal] = useState(goalData);
 
  function storeTags(props) {
    setTags(props)
    localStorage.setItem("tagData", JSON.stringify(props))
  }

  function storeGoal(props) {
    setGoal(props)
    localStorage.setItem("goalData", JSON.stringify(props))
  }
  
  function setUserData(userFromApi) {
    setUser(userFromApi)
    localStorage.setItem("userData", JSON.stringify(userFromApi))
  }


  function clearLocalStorage(props) {
    setUser(props.user)
    localStorage.removeItem("userData")
  }

  function storeCurrent(props) {
    setCurrentBook(props)
    localStorage.setItem("CurrentBookId", JSON.stringify(props))
  }

  function storeBooks(props) {
    setBooks(props)
    localStorage.setItem("bookData", JSON.stringify(props))
  }

  return (
    <BrowserRouter>
      <ReactNav
        clear={clearLocalStorage}
        setUserData={setUserData}
        user={user}

      />
      <Switch>
        <Route exact path="/">
          <Landing setUserData={setUserData} />
        </Route>
        <Route path='/books'>
          <BookView
            books={books}
            currentBook={currentBook}
            setCurrentBook={setCurrentBook}
            user={user}
            setBookList={setBookList}
            tags={tags}
            storeTags={storeTags}

          />
        </Route>
        <Route path="/(dash|search)/">
          <Home
            setUserData={setUserData}
            user={user}
            currentBook={currentBook}
            storeCurrent={storeCurrent}
            storeBooks={storeBooks}
            bookList={bookList}
            setBookList={setBookList}
            books={books}
            tags={tags}
            storeTags={storeTags}
            goal={goal}
            storeGoal={storeGoal}

          >
          </Home>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
function Home(props) {
  return (
      <div id="main" className="container mt-4">
        <SearchBar storeBooks={props.storeBooks} />
        <Switch>
          <Route path='/dash'>
            <UserDash
              setUserData={props.setUserData}
              user={props.user}
              currentBook={props.currentBook}
              storeCurrent={props.storeCurrent}
              bookList={props.bookList}
              setBookList={props.setBookList}
              books={props.books}
              tags={props.tags}
              storeTags={props.storeTags}
              goal={props.goal}
              storeGoal={props.storeGoal}
                >
            </UserDash>
          </Route>
          <Route path='/search'>
            <BookSearch
              currentBook={props.currentBook}
              storeCurrent={props.storeCurrent}
              books={props.books}
            >
            </BookSearch>
          </Route>
        </Switch>
      </div>
  )
}

export default App;