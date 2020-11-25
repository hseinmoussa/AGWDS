import React, { useEffect, useState, Suspense, lazy } from "react";

import { ModalProvider } from "styled-react-modal";

// Icons
import { FiCalendar, FiMessageCircle, FiLogOut, FiUsers } from "react-icons/fi";

import { CardDashboard, Card } from "../../../components/Card";
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
    alert("this form was submited");

    setOpenForm(!OpenForm);
  }
  function submitModalForm2() {
    alert("New Card Added");

    setOpenForm2(!OpenForm2);
  }

  useEffect(() => {
    if (sort == "") var url = "http://localhost:3001/Cards";
    else var url = "http://localhost:3001/CardsByViews";
    try {
      console.log(arr);
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
      fetch("http://localhost:3001/DeleteCard", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: _id,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setArray2(arr + 1);
          console.log(arr);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="col-12 title"
        style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}
      >
        <span></span>
        <h1 style={{ display: "inline" }}>
          Hello , Welcom to the dashboard page
        </h1>
        <Table>
          <button
            className="info"
            onClick={() => {
              console.log(11);
              toggleModalForm2();
            }}
          >
            Add
          </button>
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
                Sort by date of adding
              </Button>
            </div>
          </div>
          <div className="card-body">
            <Table>
              <thead>
                <tr>
                  <th className="col-1">Views</th>
                  <th className="col-3">Title</th>
                  <th className="col-3">Description</th>
                  <th className="col-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {array.map((item) => (
                  <tr>
                    <td style={{ textAlign: "center", display: "none" }}>
                      {item._id}
                    </td>
                    <td style={{ textAlign: "center" }}>{item.Views}</td>
                    <td style={{ textAlign: "center" }}>{item.Title}</td>
                    <td style={{ textAlign: "center" }}>{item.description}</td>
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
