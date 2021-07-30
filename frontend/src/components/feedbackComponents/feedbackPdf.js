import "./feedback.css";
import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  FaArrowLeft,
  FaArrowRight,

} from "react-icons/fa";

import { 
  RiZoomOutLine,
  RiZoomInLine

} from "react-icons/ri";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function FeedbackPdf(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scaleNumber, setScaleNumber] = useState(1);


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setScaleNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevNumber) => prevNumber + offset);
  }

  function nextPage() {
    changePage(1);
  }

  function previousPage() {
    changePage(-1);
  }

  function changeScale(offset) {
    setScaleNumber((prevNumber) => prevNumber + offset);
  }

  function largerScale() {
    changeScale(0.25);
  }

  function smallerScale() {
    changeScale(-0.25);
  }

  return (
    <div  id="feedbackPdf-wrapper">
      <div>
        <div class="grid-container bg-info rounded-top">
          <button  
            type="button"
            class="btn"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            <FaArrowLeft />
          </button>
          <button
            type="button"
            class="btn"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            <FaArrowRight />
          </button>
          <div id="grid-gap"></div>
          <button
            type="button"
            class="btn"
            disabled={scaleNumber <= 0.75}
            onClick={smallerScale}
          >
            <RiZoomOutLine />
          </button>
          <button
            type="button"
            class="btn"
            disabled={scaleNumber >= 1.5}
            onClick={largerScale}
          >
            <RiZoomInLine />
          </button>
          <h6 id="page-number">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </h6>
        </div>
        <div id="pdf">
          <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} height={1000} scale={scaleNumber} />
          </Document>
        </div>
      </div>
    </div>
    
  );
}

export default FeedbackPdf;
