import "./GroupProfileEdit.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Form,
  Pagination,
} from "react-bootstrap";
import "../groupComponents/groupProfile/Group.css";
import UserProfileList from "../userProfile/UserProfileList.js";
import PageLayout from "./DefaultPage";

let mock_data;

function SearchUserProfiles() {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [groupData, setGroupData] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/profile/", {
      credentials: 'include'
    })
      .then((response) => {
        //console.log(response.json())
        return response.json();
      })
      .then((data) => {
        // console.log(data)
        mock_data = data;
        setGroupData(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    sendQuery(null);
  }, [page]);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  const updateQuery = (x) => {
    console.log("from updateQuery", x.target.value);
    setQuery(x.target.value);
  };

  async function sendQuery(e) {
    if (e != null) e.preventDefault();
    console.log("inside sendQuery", query);
    if (query !== "") {
      let returnedData = await APIAccess.searchUserProfile(query, page);
      setGroupData(returnedData);
    } else {
      setGroupData(mock_data);
    }
  }

  async function nextPage() {
    console.log("Next page: " + page);
    setPage(page + 1);
  }

  async function prevPage() {
    console.log("Prev page: " + page);
    setPage(page - 1);
  }

  async function firstPage() {
    console.log("First page: " + page);
    setPage(1);
  }

  return (
    <PageLayout>
      <Container className="profile container-fluid">
        <div>
          <h1>User Profiles</h1>
          <Form onSubmit={sendQuery} className="search-group">
            <InputGroup
              size="lg"
              onChange={(event) => {
                updateQuery(event);
              }}
              onSubmit={sendQuery}
            >
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">
                  Search for user profiles
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <Pagination>
            <Pagination.First disabled={page <= 1} onClick={firstPage} />
            <Pagination.Prev disabled={page <= 1} onClick={prevPage} />
            <Pagination.Next onClick={nextPage} />
          </Pagination>
          <UserProfileList profiles={groupData} />
        </div>
      </Container>
    </PageLayout>
  );
}

export default SearchUserProfiles;
