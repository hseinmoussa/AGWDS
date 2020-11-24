import React, { useEffect, useState, Suspense, lazy } from "react";

import { ModalProvider } from "styled-react-modal";

// Icons
import { FiCalendar, FiMessageCircle, FiLogOut, FiUsers } from "react-icons/fi";

import { CardDashboard, Card } from "../../../components/Card";
import { Table } from "../../../components/Table";
let ModalForm = () => <></>;

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  const [array, setArray] = useState([]);
  const [arr, setArray2] = useState(0);
  const [OpenForm, setOpenForm] = useState(false);
  const [_id, setId] = useState(0);

  async function toggleModalForm(e, _id) {
    ModalForm = await lazy(() => import("./modalForm"));

    setOpenForm(!OpenForm);
  }

  function submitModalForm() {
    alert("this form was submited");

    setOpenForm(!OpenForm);
  }

  useEffect(() => {
    try {
      console.log(arr);
      fetch("http://localhost:3001/Cards", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((json) => setArray(json.message));
    } catch (err) {
      console.log(err);
    }
  }, [arr]);

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
      <div className="col-12 title">
        <h1>Hello , Welcom to the dashboard page</h1>
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
                  <th className="col-1">#</th>
                  <th className="col-3">Title</th>
                  <th className="col-3">Description</th>
                  <th className="col-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {array.map((item) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>{item._id}</td>
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
        </ModalProvider>
      </Suspense>
    </>
  );
}
