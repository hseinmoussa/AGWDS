import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Card, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Spinner from 'react-bootstrap/Spinner'
import "./Cardsbox.css";
import hollway from "../About-us/img/statue.jpg";


var cards = []

function Cardsbox() {
  const [Show, setShow] = useState(false);
  const [imglink, setimglink] = useState("");
  const [cardtitle, setcardtitle] = useState("");
  const [Pagination, setPagination] = useState({
    data: cards.map((value, index) => ({
      id: index,
      title: value.Title,
      description: value.description,
      img:value.Image,
      bigimg: value.Image,
    })),
    offset: 0,
    numberPerPage: 3,
    pageCount: 0,
    currentData: [],
  });

  

  useEffect(() => {
  try {
    fetch("http://localhost:3001/Cards", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      }),
    }).then((res) => res.json())
      .then((json) => 
    setPagination({data: json.message.map((value, index) => ({
      id: index,
      title: value.Title,
      description: value.description,
      img: "http://localhost:3001/Image/" + value.Image,
      bigimg: "http://localhost:3001/Image/" + value.Image,
    })),
    offset: 0,
    numberPerPage: 4,
    pageCount: 0,
    currentData: [],
  }))

  }
  catch (err) {
    console.log(err)
  }
  },[]);


  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(
        Pagination.offset,
        Pagination.offset + Pagination.numberPerPage
      ),
    }));
}, [Pagination.numberPerPage, Pagination.offset]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * Pagination.numberPerPage;
    setPagination({ ...Pagination, offset });
  };




  if (Pagination.data.length == 0) {
    return <Spinner animation="grow" variant="warning" />
  }else {
  return (
    <div className="body">
      <h1>Home Page</h1>
       <img
              src={hollway}
              alt="3"
              className="img11"
            />
      <div className="main">
     
        {Pagination.currentData &&
          Pagination.currentData.map((item, index) => (
            <div key={index} className="item">
              <Card id="Card" style={{ width: "18rem" }}>
                <Card.Img
                  id="img"
                  width="100"
                  height="150"
                  variant="top"
                  src={item.img}
                  alr=""
                  onClick={() => {
                    setShow(true);
                    setimglink(item.bigimg);
                    setcardtitle(item.title);
                  }}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>

                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    rootClose={true}
                    overlay={
                      <Popover
                        className="popover"
                        id="popover-positioned-bottom">
                        <Popover.Title as="h3">Description</Popover.Title>
                        <Popover.Content>{item.description}</Popover.Content>
                      </Popover> }>

                    <Button id="card--btn" variant="warning">
                      Read more
                    </Button>
                  </OverlayTrigger>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
      <Modal
        show={Show}
        onHide={() => setShow(false)}
        size="l"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <p id="titlee">{cardtitle}</p>
        <img alt="" src={imglink} className="img-fluid" />
      </Modal>
      <ReactPaginate
        previousLabel={" ← Previous"}
        nextLabel={"Next → "}
        pageCount={Pagination.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
                    }      
}
export default Cardsbox;
