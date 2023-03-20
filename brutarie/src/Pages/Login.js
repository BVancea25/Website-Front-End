import React from "react";
import "../CSS/Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { setAuth } = useAuth(); //daca logarea se face cu succes, vom salva stateul de autentificare in contextul global

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef(); //seteaza focusul pe primul input cand se incarca componentul
  const errRef = useRef(); //seteaza focusul pe erroare

  const [email, setEmail] = useState(""); //seteaza valoarea din inputul din Form
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(""); //seteaza mesajul unei erori daca apare una

  useEffect(() => {
    //seteaza focusul pe input doar cand se randeaza componentul
    userRef.current.focus();
  }, []);

  useEffect(() => {
    //daca utilizatorul modifica email-ul sau parola vom sterge mesajul de eroare
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");

    await axios
      .post("http://localhost:3500/login", { email, password })
      .then((res) => {
        const accessToken = res.data.accessToken;
        const role = res.data.role;

        setAuth({ email, password, role, accessToken });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (!err) {
          setErrMsg("No server response");
        } else if (err.response.status === 400) {
          setErrMsg("Username or Password missing");
        } else if (err.response.status === 401) {
          setErrMsg("No account associated with those credentials");
        } else {
          setErrMsg("Login Failed");
        }
      });

    if (errMsg !== "") {
      errRef.current.focus();
    }
  };

  return (
    <div className="LOGform-container">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            ref={userRef}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button className="LOGbutton" variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
