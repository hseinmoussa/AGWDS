import React, { useEffect, useState } from "react";

// Icons
import { FiCalendar, FiMessageCircle, FiLogOut, FiUsers } from "react-icons/fi";

import { CardDashboard, Card } from "../../../components/Card";
import { Table } from "../../../components/Table";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  const [array, setArray] = useState([]);
  const [arr, setArray2] = useState(0);

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
      <div className="col-3 px-0">
        <CardDashboard className="red">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="title">Card One</div>
                <div className="number pulsate">34</div>
              </div>
              <div className="col-auto">
                <FiCalendar size="3em" />
              </div>
            </div>
          </div>
        </CardDashboard>
      </div>
      <div className="col-3 px-0">
        <CardDashboard className="blue">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="title">Card Two</div>
                <div className="number pulsate">0</div>
              </div>
              <div className="col-auto">
                <FiMessageCircle size="3em" />
              </div>
            </div>
          </div>
        </CardDashboard>
      </div>
      <div className="col-3 px-0">
        <CardDashboard className="green">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="title">Mensagens</div>
                <div className="number pulsate">0</div>
              </div>
              <div className="col-auto">
                <FiMessageCircle size="3em" />
              </div>
            </div>
          </div>
        </CardDashboard>
      </div>
      <div className="col-3 px-0">
        <CardDashboard className="orange">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="title">Users</div>
                <div className="number pulsate">0</div>
              </div>
              <div className="col-auto">
                <FiUsers size="3em" />
              </div>
            </div>
          </div>
        </CardDashboard>
      </div>
      <div className="col-12 px-0">
        <Card className="red">
          <div className="card-title">
            <h3>Tables</h3>
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
                      <button className="edit">Edit</button>
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
    </>
  );
}
