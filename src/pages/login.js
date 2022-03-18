import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

function Login() {
    let [fullname, setFullName] = useState("");
    let [funFacts, setFunFacts] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [emails, setEmails] = useState("");
    let [passwords, setPasswords] = useState("");
    let [error, setError] = useState("");
    let [errorUp, setErrorUp] = useState("");
    let history = useNavigate();

    let handleLogin = async () => {
        let url = "https://colab-endpoints.herokuapp.com/login";
        let data = { email: emails, password: passwords };
        let result = (await axios.put(url, data)).data;
        let resulta = { msg: "Invalid Email or Password" };

        if (result.msg) {
            setError(resulta.msg);
        } else {
            setError("");
            localStorage.setItem("user_id", result._id);
            localStorage.setItem("user_email", result.email);
            localStorage.setItem("user_password", result.password);
            localStorage.setItem("user_name", result.fullname);
            history("/");
        }
    };

    // let handleLogOut = async () => {
    //     let id = cookie.id;
    //     let email = cookie.email;
    //     let passwd = cookie.password;
    //     let active = false;
    //     let url = mainUrl + id;
    //     let data = { email, passwd, active };
    //     if (window.confirm('Are you sure, you want to LogOut?')) {
    //         await axios.put(url, data).data;
    //         removeCookie();
    //         history.push("/login")
    //     }
    // };

    let signUp = async () => {
        let url = "https://colab-endpoints.herokuapp.com/register";
        let data = { fullname, email, password, funFacts };
        let result = (await axios.post(url, data)).data;
        let result1 = { msg: "Email Invalid or Registered" };

        if (result.msg) {
            setErrorUp(result1.msg);
        } else {
            setError("Account Created, Now You Can Login");
            setErrorUp("")
            history.push("/");
        }
    }

    return <div className="login">
        <div className="login-center">
            <div className="login-head">
                <img src={logo} alt="EventBuddy" />
            </div>
            <div className="flex login-form">
                <div className="">
                    <p>Sign up with email</p>
                    <div>{errorUp ? <div>{errorUp}</div> : ""}</div>
                    <form enctype="multipart/form-data" action="https://colab-endpoints.herokuapp.com/register" method="POST">
                        <input type="text" name="fullname" placeholder="What would you like to be called?" value={fullname} onChange={(e) => setFullName(e.target.value)} /> <br />
                        <input type="text" name="funFacts" placeholder="Fun Facts About You" value={funFacts} onChange={(e) => setFunFacts(e.target.value)} /> <br />
                        <input type="text" name="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                        <input type="password" name="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                        <div className="flex">
                            <label>Profile Pic</label>
                            <input type="file" name="url" required alt="" />
                        </div>
                        <button onClick={signUp}> Sign Up</button>
                    </form>
                </div>
                <div className="">
                    <div style={{ 'color': 'red' }}>{error ? <div>{error}</div> : ""}</div>
                    <p>Sign-in with email</p>
                    <input type="text" name="emails" placeholder="Your email" value={emails} onChange={(e) => setEmails(e.target.value)} /> <br />
                    <input type="password" name="passwords" placeholder="Your password" value={passwords} onChange={(e) => setPasswords(e.target.value)} /> <br />
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    </div >

}

export default Login;