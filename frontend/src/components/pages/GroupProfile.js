import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Group from "../groupProfile/Group.js";
import GroupMemberList from "../group_members/GroupMemberList.js";
import "../groupProfile/Group.css";
import APIAccess from "../../controller.js";

const DUMMY_DATA1 = {
  name: "AlphaTeam",
  image: "https://picsum.photos/200/100",
  about: "We are AlphaTeam",
};

const DUMMY_DATA2 = {
  name: "BetaTeam",
  image: "https://picsum.photos/200/100",
  about: "We are BetaTeam",
};

const mock_data = [
  {
    _id: "0000000001",
    name: "test person",
    role: "Instructor",
  },
  {
    _id: "0020000301",
    name: "t2et person",
    role: "Student",
  },
  {
    _id: "0020000301",
    name: "t22t person",
    role: "Student",
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student",
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student",
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student",
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student",
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student",
  },
];
let groupData;
function GroupProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedGroupData, setLoadedGroupData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/group/60c148db4df89114682f519f")
      .then((response) => {
        let jsonRes= response.json();
        setIsLoading(false);
        setLoadedGroupData({name: jsonRes.name, about: jsonRes.about, members: jsonRes.members, picture: jsonRes.picture});
      })
     /* .then((data) => {
        setIsLoading(false);
        setLoadedGroupData(data);
      });*/
  }, []);

  /*if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }*/
  return (
    <Container className="mt-3 profile container-fluid">
      <Group groupData={loadedGroupData} />
      <GroupMemberList members={mock_data} />
    </Container>
  );
}

export default GroupProfile;

/*
function getGroups() {
    console.log("made it")
  //  let groupData
   // useEffect(() => {
      // Update the document title using the browser API
     
      try {
        groupData = APIAccess.getGroup('60c148db4df89114682f519f');
        console.log(groupData);
      } catch (err) {
        console.log(err);
      }
    }
      //document.title = `You clicked ${count} times`;
    //});
   
 // };

*/
