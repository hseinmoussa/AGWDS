import React, { useEffect, useState, Suspense, lazy } from "react";

import ReactPaginate from "react-paginate";

import { Card } from "../../../components/Card";
import { Table } from "../../../components/Table";

export default function All_Admins() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  const [array, setArray] = useState([]);
  const [arr, setArray2] = useState(0);


  // const [_id, setId] = useState(0);


  const [pagination, setPagination] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/AllAdmins", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //facebook: this.state.input,
      }),
    })
      .then((res) => res.json())
      .then((json) =>
      setArray(json.message)
      );
  }, [arr]);

  const del = (_id) => {
    try {
      if (window.confirm("Delete this admin?"))
        fetch("http://localhost:3001/DeleteAdmin", {
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
        FirstName: value.FirstName,
        LastName: value.LastName,
        email: value.email,
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
         Admin page
        </h1>
     
      </div>

      <div className="col-12 px-auto">
        <Card className="red">
          <div className="card-title">
            <h2>Dashboard</h2>
         
          </div>
          <div className="card-body">
            <Table>
              <thead>
                <tr>
                  <th className="col-3 views">FirstName</th>
                  <th className="col-3">LastName</th>
                  <th className="col-3">Email</th>
                  <th className="col-3">Delete</th> 
                </tr>
              </thead>
              <tbody>
                {pagination.currentData &&
                  pagination.currentData.map((item) => (
                    <tr key={item._id}>
                      <td style={{ textAlign: "center", display: "none" }}>
                        {item._id}
                      </td>
                      <td style={{ textAlign: "center" }} className="views">{item.FirstName}</td>
                   
                      <td style={{ textAlign: "center" }}>{item.LastName}</td>
                      <td style={{ textAlign: "center" }}>
                        {item.email}
                      </td>
                       <td style={{ textAlign: "center" }}>
                       
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
 
    </>
  );
}
