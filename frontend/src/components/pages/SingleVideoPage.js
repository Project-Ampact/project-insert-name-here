import React from "react";
import "./SingleVideoPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/logo.png";
import APIAccess from "../../controller.js";
import { useHistory } from "react-router-dom";
import { AuthService } from "../../util/authService";

function SingleVideoPage() {
  return (
    <div className="container-fluid mb-5">
      <div className="wrapper">
        {" "}
        <img
          id="african-impact-logo"
          src={Logo}
          alt="african impact initiative logo"
        />
      </div>
      <div className="container-xl">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          class="embed-responsive-item"
          src="https://www.youtube.com/embed/eow125xV5-c"
          id="video"
          alllowfullscreen
        ></iframe>
      </div>
      <div className="container-fluid video-info ">
      <div class="d-flex flex-row">
        <h1 className="mt-2 flex-fill" id="title">Bootstrap Tutorial</h1>
        <h2 className="mt-2" id="poster">Posted by: David Tan</h2>
        </div>
        <h3 className="text-secondary" id="subject">Subject: Bootstrap</h3>
        <p className="text-start" id="description">
          Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean quis vulputate felis. Integer laoreet volutpat scelerisque.
          Praesent vel arcu ac magna ultrices consequat in sit amet justo.
          Vestibulum posuere urna lorem, quis hendrerit ante consequat in.
          Aliquam erat volutpat. Cras maximus laoreet massa, ut venenatis sapien
          dapibus quis. Morbi at finibus libero, eget pretium lorem. Aliquam
          semper efficitur vestibulum. Aliquam erat volutpat. Nulla ornare
          libero ac porttitor consectetur. In non dui pulvinar enim iaculis
          sollicitudin eu id nisl. Curabitur placerat risus metus, eget egestas
          ex tincidunt egestas. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Etiam gravida quis lacus et pharetra. Mauris eleifend
          metus non fringilla hendrerit. Nulla ultricies ut massa non
          vestibulum. Praesent vel varius ligula, non pharetra dui. In lacus
          neque, blandit quis augue et, suscipit consectetur nulla. Phasellus in
          libero ac ipsum elementum dignissim et id lectus. Donec nec felis
          maximus, imperdiet turpis non, vehicula libero.
        </p>

        <div class="row align-items-start">
          <div class="col-md">One of three columns</div>
          <div class="col-md">One of three columns</div>
          <div class="col-md">One of three columns</div>
          <div class="col-md">One of three columns</div>
          <div class="col-md">One of three columns</div>
          <div class="col-md">One of three columns</div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default SingleVideoPage;
