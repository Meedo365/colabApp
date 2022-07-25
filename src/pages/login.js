import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

function Login() {
    let [fullname, setFullName] = useState("");
    let [funFacts, setFunFacts] = useState("");
    let [email, setEmail] = useState("");
    let [image, setImage] = useState(null);
    let [password, setPassword] = useState("");
    let [emails, setEmails] = useState("");
    let [passwords, setPasswords] = useState("");
    let [error, setError] = useState("");
    let [errorUp] = useState("");
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

    function signUp(e) {
        e.preventDefault();
        let url = "https://colab-endpoints.herokuapp.com/register";
        const formData = new FormData();
        formData.append('fullname', fullname)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('funFacts', funFacts)
        formData.append('image', image)

        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        history.push("/login")
    };

    return <div className="login">

        <div className="login-center">
            <div className="login-head">
                <img src={logo} alt="EventBuddy" />
            </div>
            <div className="flex login-form">

                <div className="">
                    <p>Sign up with email</p>
                    <div>{errorUp ? <div>{errorUp}</div> : ""}</div>
                    <form encType="multipart/form-data" >
                        <input type="text" name="fullname" placeholder="What would you like to be called?" value={fullname} onChange={(e) => setFullName(e.target.value)} /> <br />
                        <input type="text" name="funFacts" placeholder="Fun Facts About You" value={funFacts} onChange={(e) => setFunFacts(e.target.value)} /> <br />
                        <input type="text" name="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                        <input type="password" name="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                        <div className="flex">
                            <label style={{ 'color': '#4a5e84' }}><b>Profile Pic</b></label>
                            <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} required alt="" />
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