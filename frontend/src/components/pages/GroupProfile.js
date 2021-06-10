import React from 'react';
import Link from "react-router-dom/Link";
import logo from '../../assets/logo.png'
import { Row, Col, Card } from 'react-bootstrap'
import './Landing.css'

/*function GroupProfileContent() {
    return (
     
    )
  }*/

function GroupProfile() {
return (
   <Row>
       <div class="card">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

   </Row>
    )
}

export default GroupProfile;