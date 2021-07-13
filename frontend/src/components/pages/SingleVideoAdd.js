import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from 'react-bootstrap/Dropdown'
import "./Registration.css";

import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import NavigationBar from "../NavigationBar";

function SingleVideoAdd(props) {
  return (
    <div>
    <NavigationBar/>

    <div className="register">
      <form id="register-form">
        <fieldset>
          <header>
            <h1 className="register-title">Ampact</h1>
          </header>
          <main>
          <h2 className="register-subtitle">Add a new post</h2>
          <div class="wrapper-register">
              <label for="videotitle">Title:</label>
                <input
                  type="register"
                  name="videotitle"
                  id="videotitle"
                  placeholder="Enter the title here"
                />
              <label for="lastName">Video Link:</label>
                <input
                  type="register"
                  name="lastName"
                  id="lname"
                  placeholder="Enter YouTube link (Optional)"
                  required
                />

              <label for="videodesc">Description:</label><br></br>
              <div>
                <textarea
                  type="register"
                  name="videodesc"
                  id="videodesc"
                  placeholder="Write description of the video here..."
                  style={{ height: '200px',width: '90%' }}
                />
              </div>
              <div>
          
              <label for="taginput">Tag:</label>
              <input
                type="register"
                name="taginput"
                id="taginput"
                placeholder="Enter the Tag"
              />
              </div>
             
            </div>
           
            <button type="submit" /*onClick={update}*/ className="submit-button">
              Submit
            </button>

            <button type="reset" className="submit-button">
              Reset
            </button>

           
          </main>
        </fieldset>
      </form>
    </div>

  </div>

    
  );
}

export default SingleVideoAdd;
