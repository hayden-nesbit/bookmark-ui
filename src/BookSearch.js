import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import apiKey from './apiKey'
import SearchBar from './SearchBar'
import { useHistory } from "react-router-dom"

function BookSearch(props) {

    const history = useHistory();

    function handleClick(e) {
        props.storeCurrent(e.target.id)
        history.push("/books")
    }

    let book = props.books ? props.books.map((item, index) => {
        return (
            <div>
                <div className="card border-0">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-4">
                                {item.volumeInfo.imageLinks ?
                                    <img src={item.volumeInfo.imageLinks.smallThumbnail} />
                                    :
                                    null
                                }
                            </div>
                            <div className="col-sm-8">
                                <h6>{item.volumeInfo.title}</h6>
                                {item.volumeInfo.authors ? 
                                <p>by {item.volumeInfo.authors}</p>
                                :
                                null
                                }
                                <button id={index} onClick={handleClick} className="btn btn-outline-primary btn-sm">View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
        :
        null

    return (
        <div className="row">
            <div className="col-md-8 offset-2 mt-5">
                {book}
            </div>
        </div>


    );
}

export default BookSearch;