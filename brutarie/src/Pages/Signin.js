import React from "react";
import { useState } from "react";
import "../CSS/SignIN.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    fname: "",
    phone: "",
    password: "",
    re_enter: "",
    refreshToken: "",
  });

  const [response, setResponse] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3500/signin", { formData })
      .then((res) => {
        setResponse({ status: res.status });
        //console.log(res);
      })
      .catch((error) => console.error(error));
  };

  const handleClick = async (event) => {
    await (response !== null);
    //console.log(response.status);
    if (response.status === 201) {
      return (window.location.href = "http://localhost:3000/login");
    }
  };

  const checkPasswords = (event) => {
    if (formData.password !== formData.re_enter) {
      alert("Password and Re Password have to match!");
    }
  };

  return (
    <div className="form-container">
      <h1 className="h1">Welcome to our website</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRePassword">
          <Form.Label>Re enter</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re Enter Password"
            name="re_enter"
            value={formData.re_enter}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          onClick={handleClick}
          onFocus={checkPasswords}
          className="button"
          variant="secondary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signin;
