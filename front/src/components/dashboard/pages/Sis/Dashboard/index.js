import React, { useEffect, useState, Suspense, lazy } from "react";

import { ModalProvider } from "styled-react-modal";
import ReactPaginate from "react-paginate";

import { Card } from "../../../components/Card";
import { Table } from "../../../components/Table";
import { Button } from "react-bootstrap";



let ModalForm = () => <></>;
let AddCardModal = () => <></>;
export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  const [array, setArray] = useState([]);
  const [arr, setArray2] = useState(0);
  const [OpenForm, setOpenForm] = useState(false);
  const [OpenForm2, setOpenForm2] = useState(false);
  const [sort, setSort] = useState("");

  const [_id, setId] = useState(0);

  async function toggleModalForm(e, _id) {
    ModalForm = await lazy(() => import("./modalForm"));

    setOpenForm(!OpenForm);
  }
  async function toggleModalForm2(e) {
    AddCardModal = await lazy(() => import("./AddCardModal"));
    setOpenForm2(!OpenForm2);
  }

  function submitModalForm() {
    // alert("this form was submited");

    setOpenForm(!OpenForm);
  }
  function submitModalForm2() {
    // alert("New Card Added");

    setOpenForm2(!OpenForm2);
  }
  const [pagination, setPagination] = useState("");

  useEffect(() => {
    if (sort == "") var url = "http://localhost:3001/Cards";
    else var url = "http://localhost:3001/CardsByViews";
    try {
      
      fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((json) => setArray(json.message));
    } catch (err) {
      console.log(err);
    }
  }, [arr, sort]);

  const del = (_id) => {
    try {
      if (window.confirm("Delete the item?"))
        fetch("http://localhost:3001/DeleteCard", {
          method: "post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
           
          },
          body: JSON.stringify({
            _id: _id,
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.status == 400) {alert(json.message);
              if(json.redirect == true){
                window.location.replace(json.location)
              }
            }
            setArray2(arr + 1);
           
          });
    } catch (err) {
      console.log(err);
    }
  };

  /* Start pagination*/
  useEffect(() => {
    setPagination({
      data: array.map((value, index) => ({
        _id: value._id,
        Title: value.Title,
        description: value.description,
        Image: value.Image,
        Views: value.Views,
      })),
      offset: 0,
      numberPerPage: 5,
      pageCount: 0,
      currentData: [],
    });
  }, [array]);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, array]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  /*End pagination"*/

  return (
    <>
      <div
        className="col-12 title"
        style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}
      >
        <span></span>
        <h1 style={{ display: "inline" }}>
         Dashboard page
        </h1>
        <Table>
          <tbody>
            <tr>
              <td>
                <button
                  className="info"
                  style={{overflowX:"hidden"}}
                  onClick={() => {
                    toggleModalForm2();
                  }}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="col-12 px-auto">
        <Card className="red">
          <div className="card-title">
            <h2>Dashboard</h2>
            <div>
              <Button
                style={{ marginRight: "10px" }}
                onClick={() => {
                  setSort("Views");
                }}
              >
                Sort by views
              </Button>
              <Button
                onClick={() => {
                  setSort("");
                }}
              >
                Sort by date
              </Button>
            </div>
          </div>
          <div className="card-body">
            <Table>
              <thead>
                <tr>
                  <th className="col-1 views">Views</th>
                  <th className="col-3">Image</th>
                  <th className="col-3">Title</th>
                  <th className="col-3">Description</th>
                  <th className="col-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagination.currentData &&
                  pagination.currentData.map((item) => (
                    <tr key={item._id}>
                      <td style={{ textAlign: "center", display: "none" }}>
                        {item._id}
                      </td>
                      <td style={{ textAlign: "center" }} className="views">{item.Views}</td>
                      <td style={{ textAlign: "center" }}>
                        <img
                          height="50px"
                          src={`http://localhost:3001/Image/${item.Image}`}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>{item.Title}</td>
                      <td style={{ textAlign: "center" }}>
                        {item.description}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="edit"
                          onClick={() => {
                            toggleModalForm();
                            setId(item._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="eraser"
                          onClick={() => {
                            del(item._id);
                          }}
                        >
                          Trash
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Card>
        <div style={{ display: "flex" }}>
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
      </div>
      <Suspense fallback={null}>
        <ModalProvider>
          <ModalForm
            isOpen={OpenForm}
            toggleModal={toggleModalForm}
            submit={submitModalForm}
            _id={_id}
            arr={arr}
            setArray2={setArray2}
          />

          <AddCardModal
            isOpen={OpenForm2}
            toggleModal={toggleModalForm2}
            submit={submitModalForm2}
            arr={arr}
            setArray2={setArray2}
          />
        </ModalProvider>
      </Suspense>
    </>
  );
}
