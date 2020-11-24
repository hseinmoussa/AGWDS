import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Card, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./Cardsbox.css";

const tee = [
  {
    img: "https://picsum.photos/id/1/100/60.webp",
    title: "Some quick1",
    description:
      " 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
    bigimg: "https://picsum.photos/id/1/400/400.webp",
  },
  {
    img: "https://picsum.photos/id/2/100/60.webp",
    title: "Some quick2",
    description:
      " 222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222",
    bigimg: "https://picsum.photos/id/2/400/400.webp",
  },
  {
    img: "https://picsum.photos/id/3/100/60.webp",
    title: "Some quick3",
    description:
      "333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333",
    bigimg: "https://picsum.photos/id/3/400/400.webp",
  },
  {
    img: "https://picsum.photos/id/4/100/60.webp",
    title: "Some quick4",
    description:
      "444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444",
    bigimg: "https://picsum.photos/id/4/400/400.webp",
  },
  {
    img: "https://picsum.photos/id/5/100/60.webp",
    title: "Some quick5",
    description:
      "5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555",
    bigimg: "https://picsum.photos/id/5/400/400.webp",
  },
];

function Testing() {
  const [Show, setShow] = useState(false);
  const [imglink, setimglink] = useState("");
  const [cardtitle, setcardtitle] = useState("");
  const [pagination, setPagination] = useState({
    data: tee.map((value, index) => ({
      id: index,
      title: value.title,
      description: value.description,
      img: value.img,
      bigimg: value.bigimg,
    })),
    offset: 0,
    numberPerPage: 3,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  return (
    <div className="body">
      <div className="main">
        {pagination.currentData &&
          pagination.currentData.map((item, index) => (
            <div key={index} className="item">
              <Card id="Card" style={{ width: "18rem" }}>
                <Card.Img
                  id="img"
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
                    rootClose="true"
                    overlay={
                      <Popover
                        className="popover"
                        id="popover-positioned-bottom"
                      >
                        <Popover.Title as="h3">Description</Popover.Title>
                        <Popover.Content>{item.description}</Popover.Content>
                      </Popover>
                    }
                  >
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
        pageCount={pagination.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
export default Testing;
