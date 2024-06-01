import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { app, auth, provider } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import "./SignUp.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const history = useNavigate();
  const [inpValue, setInpValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getData = (e) => {
    const { name, value } = e.target;
    setInpValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signUp = () => {
    if (!inpValue.name || !inpValue.email || !inpValue.password) {
      toast.error("All Fields are Required", { position: "top-center" });
      return;
    }

    createUserWithEmailAndPassword(auth, inpValue.email, inpValue.password)
      .then(async (res) => {
        const user = res.user;

        const firestore = getFirestore(app); // Using the Firebase app instance
        const userDocRef = doc(firestore, "users", user.uid);

        await setDoc(userDocRef, {
          name: inpValue.name,
          email: inpValue.email,
          // Avoid storing the password directly in the database for security reasons
          // Add more user details if needed
        });

        toast.success("Sign Up Successful");
        setTimeout(() => {
          history("/login");
        }, 2000);
      })
      .catch((err) => toast.error(err.message));
  };

  const googleSignup = () => {
    signInWithPopup(auth, provider).then(() => {
      history("/");
    }).catch((error) => {
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Authentication popup was closed. Please try again.');
      } else {
        // Handle other authentication errors
        console.error('Authentication error:', error);
        toast.error('Authentication failed. Please try again later.');
      }
    });
  };

  return (
    <>
      <div className=" d-flex signUpPage">
        <div className="img-row"></div>
        <div className="signUp-form-row">
          <h2 className="my-3 text-center">
            Sign Up for{" "}
            <span style={{ color: "gold", fontWeight: "bold" }}>Sip&Share</span>
          </h2>
          <p className="text-center">
            Unleash your inner mixologist and explore a world of flavors with
            our handcrafted cocktail recipes.
          </p>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={inpValue.name}
                onChange={getData}
                type="text"
                placeholder="Enter Your Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                value={inpValue.email}
                onChange={getData}
                type="email"
                placeholder="abc@gmail.com"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                value={inpValue.password}
                onChange={getData}
                type="password"
                placeholder="Atleast 6 characters"
              />
            </Form.Group>
            
            <Button
              variant="success"
              style={{ width: "100%", height: "15%", fontSize: "18px" }}
              onClick={signUp}
            >
              Sign Up
            </Button>
            <div className="or-separator text-center mt-2 d-flex align-items-center justify-content-center">
              <span className="line"></span>
              <span className="or-text">OR</span>
              <span className="line"></span>
            </div>

            <div className="mt-2">
              <GoogleButton
                className="d-flex aligm-items-center justify-content-center"
                type="light"
                label="Continue with Google"
                style={{ width: "100%" }}
                onClick={googleSignup}
              />
            </div>
          </Form>
          <p className="mt-2 text-center">
            Already have an account ?{" "}
            <span>
              <Link
                to="/login"
                style={{
                  color: "gold",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
