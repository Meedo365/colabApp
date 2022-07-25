import React, { useEffect, useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import { Icon } from '@iconify/react';
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navv() {
    let history = useNavigate();
    let [none, SetNone] = useState('none');
    let [userImage, setUser] = useState('');
    let [block, SetBlock] = useState('inline');
    let id = localStorage.getItem('user_id');
    let route = '/profile/' + id;
    useEffect(() => {
        check();
        oneUser();
    }, [])
    let handleLogOut = async () => {
        let url = "https://colab-endpoints.herokuapp.com/logout";
        let data = { email: localStorage.getItem("user_email"), password: localStorage.getItem("user_password") };
        if (window.confirm('Are you sure?')) {
            let result = (await axios.put(url, data)).data;
            if (result.msg) {
                // setError(resulta.msg);
                console.log('error')
            } else {
                history("/");
                localStorage.removeItem("user_id");
                localStorage.removeItem("user_email");
                localStorage.removeItem("user_password");
                localStorage.removeItem("user_name");
                window.location.reload();
            }
        }

    };
    let check = () => {
        let x = localStorage.getItem("user_email");
        if (x === null) {
            SetNone('none')
            SetBlock('inline')
        } else {
            SetNone('inline')
            SetBlock('none')
        }
    };
    let oneUser = () => {
        let url = "https://colab-endpoints.herokuapp.com/user/" + id
        fetch(url)
            .then(e => e.json())
            .then((res) => setUser(res.image))
    };

    return <>
        <div className="cen">


            <Navbar bg="white" id="nav">
                <Navbar.Brand href="/" style={{ color: '#4A5E84', marginLeft: '30px' }}>
                    <img src={logo} alt="EventBuddy" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <div style={{ border: '1px solid black', width: '414px', height: '35px', marginLeft: '220px', background: 'whitesmoke', borderRadius: '20px', padding: '5px' }}>
                    <Icon icon="bi:search" style={{ marginLeft: '13px' }} />
                    <input type='text' placeholder="Search" style={{
                        outline: 'none', border: 'none', marginLeft: "10px", width: '80%', background: 'whitesmoke'
                    }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '244px' }}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <button style={{
                            display: block, width: 'fit-content', height: 'max-content', border: 'none', borderRadius: '20px',
                            cursor: 'pointer', marginRight: '20px',
                            background: '#4A5E84', color: 'white', marginLeft: '25px', marginTop: '21px', marginBottom: '21px'
                        }}>Login / Sign Up</button>
                    </Link>
                    <Link to={route} style={{ display: none }}>
                        <img id="dp" src={userImage} alt="" />
                    </Link>
                    <button onClick={() => handleLogOut()} style={{
                        display: none,
                        width: 'fit-content', height: '36px', border: 'none', borderRadius: '20px', cursor: 'pointer', marginRight: '20px',
                        background: '#4A5E84', color: 'white', marginLeft: '25px', marginTop: '21px', marginBottom: '21px'
                    }}>LogOut</button>
                </div>
            </Navbar>
        </div>
    </>
}

export default Navv;