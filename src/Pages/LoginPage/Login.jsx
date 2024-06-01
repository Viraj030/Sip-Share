import React, {useState} from "react";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {auth, provider} from "../../firebase";
import "./Login.css"
import { signInWithEmailAndPassword, signInWithPopup,setPersistence, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";
import {toast} from "react-toastify"


export default function Login() {
  const history = useNavigate();
  const [inpValue, setInpValue] = useState({
    email: "",
    password: "",
    rememberMe: false, // Remember Me state
  });
  const [loading, setLoading] = useState(false);

  const getData = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setInpValue((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const login = () => {
    if (!inpValue.email || !inpValue.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    signInWithEmailAndPassword(auth, inpValue.email, inpValue.password)
      .then(async (res) => {
        setLoading(false);
        // Set persistence based on the Remember Me checkbox
        if (inpValue.rememberMe) {
          await setPersistence(auth, browserLocalPersistence);
        } else {
          await setPersistence(auth, browserSessionPersistence);
        }
        toast.success("Login Successful");
        setTimeout(() => {
          history("/");
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const googleLogin = () => {
    setLoading(true); // Set loading to true when Google login starts

    signInWithPopup(auth, provider)
      .then((data) => {
        setLoading(false); // Set loading to false after Google login completion
        history("/");
      })
      .catch((err) => {
        setLoading(false); // Set loading to false on Google login failure
        toast.error(err.message);
      });
  };
  return (
    <>
      <div className=" d-flex loginPage">
          <div className="form-row">
            <h2 className="my-3 text-center">Login for <span style={{color: "gold", fontWeight: "bold"}}>Sip&Share</span></h2>
            <p className="text-center">Unleash your inner mixologist and explore a world of flavors with our handcrafted cocktail recipes.</p>
            <Form>
              
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

              <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              name="rememberMe"
              label="Remember Me"
              checked={inpValue.rememberMe}
              onChange={getData}
            />
          </Form.Group>

              <Button
            variant="success"
            style={{ width: "100%", height: "15%", fontSize: "18px" }}
            onClick={login}
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Logging In..." : "Login"}
          </Button>

              <div className="or-separator text-center mt-2 d-flex align-items-center justify-content-center">
              <span className="line"></span>
              <span className="or-text">OR</span>
              <span className="line"></span>
              </div>

              <div className="mt-2">
              <GoogleButton className="d-flex aligm-items-center justify-content-center" type="light" label="Connect with Google" style={{width: "100%"}}
              onClick={googleLogin}/>
              </div>
            </Form>

            <p className="text-center mt-2">
              Don't have an account ?{" "}
              <span>
                <Link to="/signup" style={{color: "gold", textDecoration: "none", fontWeight: "bold"}}>Sign Up</Link>
              </span>
            </p>
          </div>
          <div className="img-row">
          </div>
        </div>
    </>
  )
}
