import React, { useState, memo, useRef, useEffect } from "react";
import Modal from "styled-react-modal";

import { Form } from "../../../components/Form";
import { FiCheckCircle, FiX } from "react-icons/fi";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const StyledModal = Modal.styled`

    max-width: 600px;
    width: 98%;
    height: auto;

    background-color: white;
    position: fixed;
    top: 0;
    margin: 1.75rem auto;
    border-radius: .3rem;

    @keyframes modalFade {
        from {transform: translateY(-50%);opacity: 0;}
        to {transform: translateY(0);opacity: 1;}
    }

    & {
        animation-name: modalFade;
        animation-duration: .3s;
    }

    .modal-header {
        display: -webkit-box;
        display: flex;
        -webkit-box-align: start;
        align-items: flex-start;
        -webkit-box-pack: justify;
        justify-content: space-between;
        padding: 1rem;
        border-bottom: 1px solid #dee2e6;
        border-top-left-radius: calc(.3rem - 1px);
        border-top-right-radius: calc(.3rem - 1px);
        color: #333;

        .modal-title {
            margin-bottom: 0;
            line-height: 1.6;
            font-size: 1.25rem;
            font-weight: normal;

        }

        button.close {
            padding: 0;
            background-color: transparent;
            border: 0;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            align-self: center;
            cursor: pointer;
            font-size: 22px;
        }
    }

    .modal-body {
        // position: relative;
        // flex: 1 1 auto;
        padding: 1rem 1rem;
        max-height: 430px;
        overflow-y: auto;
    }

    .modal-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        padding: .75rem;
        border-top: 1px solid #dee2e6;
        border-bottom-right-radius: calc(.3rem - 1px);
        border-bottom-left-radius: calc(.3rem - 1px);

        .close, .submit {
            margin: 0 3px;
            padding: 7px 14px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 500 !important;
            transition: all 0.2s !important;
            line-height: 1.6;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
                filter: brightness(90%)
            }
        }

        .close {
            border: 1px solid transparent;
            color: #333333c9;
            background: none;
        }

        .submit {
            background-color: #1bbc9b;
            border: 1px solid #1bbc9b;
            color: #fff !important;
        }
    }
`;

function ModalExperience2({ isOpen, toggleModal, submit, arr, setArray2 }) {
  const reference = useRef(null);
  const [sub, setSub] = useState(0);

  const [data, setData] = useState({
    Title: "",
    Description: "",
    Categories: "",
    Image: "",
  });

  function handleInputChange(e) {
    const { value, name } = e.target;
    if (name == "Image") {
      
      setData({
        ...data,
        [name]: e.target.files[0],
      });
    } else
      setData({
        ...data,
        [name]: value,
      });
  }

  function handleSubmit(e) {
    // alert(JSON.stringify(data))
    add();
    e.preventDefault();
    submit();
  }

  const add = () => {
    try {
      const body = new FormData();
      body.append("Title", data.Title);
      body.append("description", data.Description);
      body.append("categories", data.Categories);
      body.append("Image", data.Image);
      body.append("Views", 0);
      console.log(data);
      fetch("http://localhost:3001/AddCard", {
        method: "post",
        credentials: "include",
    
        body: body,
        
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status == 400) alert(json.message);
          else {
            setSub(sub + 1);
            setArray2(arr + 1);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Add new card
        </h5>
        <button type="button" className="close" onClick={toggleModal}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="modal-body" ref={reference}>
          <div className="input-block">
            <label className="required" style={{ textAlign: "left " }}>
              Title <sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              name="Title"
              type="text"
              value={data.Title}
              required="required"
              placeholder="Card Title"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-block">
            <label className="required" style={{ textAlign: "left " }}>
              Description <sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              name="Description"
              type="text"
              value={data.Description}
              required="required"
              placeholder="Card description"
              onChange={handleInputChange}
            />
          </div>

          <div className="input-block">
            <label style={{ textAlign: "left " }}>
              Categories <sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              name="Categories"
              type="text"
              placeholder="Enter all categories , separate them using comma"
              value={data.Categories}
              required="required"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-block">
            <label style={{ textAlign: "left " }}>
              Image <sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              name="Image"
              rows="5"
              type="file"
              required="required"
              onChange={handleInputChange}
            ></input>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="close" onClick={toggleModal}>
            <FiX /> Close
          </button>
          <button type="submit" className="submit">
            <FiCheckCircle /> Submit
          </button>
        </div>
      </Form>
    </StyledModal>
  );
}

export default memo(ModalExperience2);
