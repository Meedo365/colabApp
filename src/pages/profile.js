import React, { useEffect, useState } from "react";
import Navv from "../components/nav";
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from "axios";

function ProfilePage() {
    let id = useParams();
    let [user_id,] = useState(localStorage.getItem("user_id"));
    let [userOne, setOneUser] = useState({
        intrest: []
    });
    let [facebook, setFacebook] = useState('');
    let [twitter, setTwitter] = useState('');
    let [hide, setHide] = useState('none');
    let [show, setShow] = useState('block');
    let [noEdit, setNoEdit] = useState('block');
    let [ig, setIg] = useState('');

    let [userName, setUserName] = useState('');
    let [userAge, setUserAge] = useState('');
    let [userGender, setUserGender] = useState('');
    let [userInterest, setUserInterest] = useState();
    let [funFact, setFunFact] = useState('');

    useEffect(() => {
        oneUser();
        userCheck();
    }, []);

    let oneUser = () => {
        let url = "https://colab-endpoints.herokuapp.com/user/" + id.id
        fetch(url)
            .then(e => e.json())
            .then((res) => setOneUser(res));
    };

    let showEdit = () => {
        setShow('none');
        setHide("block");
    };

    let closeEdit = () => {
        setShow('block');
        setHide("none");
    };

    let userCheck = () => {
        { user_id === id.id ? setNoEdit('block') : setNoEdit('none') }
        setUserName(userOne.fullname);
        setUserAge(userOne.age);
        setUserGender(userOne.gender);
        setFunFact(userOne.funFacts);
        setUserInterest(userOne.intrest);
        setFacebook(userOne.facebookUrl)
        setTwitter(userOne.twitterUrl)
        setIg(userOne.instagramUrl)
    };

    let addInterest = (e) => {
        let small = e.toLowerCase();
        if (!userInterest.includes(small)) {
            userInterest.push(small)
        }
        return userInterest;
    };



    let updateUser = async () => {
        let url = "https://colab-endpoints.herokuapp.com/user/" + id.id;
        let data = {
            gender: userGender,
            age: userAge,
            intrest: userInterest,
            fullname: userName,
            funFacts: funFact,
            facebookUrl: facebook,
            twitterUrl: twitter,
            instagramUrl: ig
        }
        let result = (await axios.put(url, data)).data;
        if (result.msg) {
            console.log('error')
        } else {
            oneUser();
            closeEdit();
        }
    };

    return <>
        <div className="cen" >
            <Navv />
            <div style={{ paddingTop: '199px', marginBottom: '230px' }}>
                <div className="flex" style={{ marginLeft: '328px', marginRight: '325px' }}>
                    <span>
                        <img id="dpp" src={userOne.image} alt="" />
                    </span>

                    <div>
                        {/* profile */}
                        <div style={{ marginLeft: '80px', display: show }}>
                            < span style={{
                                fontWeight: '900', fontSize: '31px', lineHeight: '42.35px', color: '#464646',
                                letterSpacing: '1.5px', paddingTop: '40px'
                            }}>
                                {userOne.fullname}
                            </span>

                            <div className="flex" style={{ paddingTop: '25px' }}>
                                <a onClick={() => window.open(userOne.instagramUrl)}>
                                    <Icon style={{ cursor: 'pointer', width: '38px', height: '38px', marginRight: '24px' }} icon="icon-park-outline:instagram" color="#4a5e84" />
                                </a>
                                <a onClick={() => window.open(userOne.facebookUrl)}>
                                    <Icon style={{ cursor: 'pointer', width: '38px', height: '38px', marginRight: '24px' }} icon="icon-park-outline:facebook" color="#4a5e84" />
                                </a>
                                <a onClick={() => window.open(userOne.twitterUrl)}>
                                    <Icon style={{ cursor: 'pointer', width: '38px', height: '38px', marginRight: '24px' }} icon="icon-park-outline:twitter" color="#4a5e84" />
                                </a>
                            </div>

                            <p onClick={() => showEdit()} style={{
                                color: '#1461F8', textDecoration: 'underline', cursor: 'pointer', fontSize: '16px', lineHeight: '21.86px', fontWeight: '900',
                                width: "186px", height: '20px', marginTop: '48px', marginBottom: '30px', display: noEdit
                            }}>
                                Edit Profile
                            </p>

                            <div style={{ paddingBottom: '24px', paddingTop: '24px' }}>
                                <h4 style={{ color: '#464646', fontSize: '20px', lineHeight: '27.32px', paddingBottom: '6px', fontWeight: '900' }}>Age</h4>
                                <p style={{ color: '#464646', fontSize: '20px', lineHeight: '27.32px', fontWeight: '500' }}>{new Date().getFullYear() - new Date(userOne.age).getFullYear()}</p>
                            </div>

                            <div style={{ paddingBottom: '24px' }}>
                                <h4 style={{ color: '#464646', fontSize: '20px', lineHeight: '27.32px', paddingBottom: '6px', fontWeight: '900' }}>Gender</h4>
                                <p style={{ color: '#464646', fontSize: '20px', lineHeight: '27.32px', fontWeight: '500' }}>{userOne.gender}</p>
                            </div>

                            <div style={{ paddingBottom: '24px' }}>
                                <h4 style={{ color: '#464646', fontSize: '20px', lineHeight: '27.32px', paddingBottom: '6px', fontWeight: '900' }}>Fun Facts</h4>
                                <p style={{ color: '#464646', fontSize: '20px', lineHeight: '27.32px', fontWeight: '500', width: '481px' }}>{userOne.funFacts}</p>
                            </div>

                            <div style={{ paddingBottom: '24px' }}>
                                <h4 style={{ color: '#464646', fontSize: '20px', lineHeight: '27.32px', paddingBottom: '6px', fontWeight: '900' }}>Interests</h4>
                                <div className="interest">
                                    {userOne?.intrest.map((e, i) =>
                                        <p key={i} style={{ color: 'white', fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', background: '#4a5e84', borderRadius: '20px', marginRight: '20px', textTransform: 'capitalize' }}>
                                            {e}
                                        </p>
                                    )}

                                </div>
                            </div>

                        </div>
                        {/* edit profile */}
                        <div className="editProfile" style={{ marginLeft: '80px', display: hide }}>
                            < span style={{
                                fontWeight: '800', fontSize: '31px', lineHeight: '42.35px', color: '#464646',
                                letterSpacing: '1.5px', paddingTop: '40px'
                            }}>
                                Edit Profile
                            </span>

                            <br /> <br />

                            <input type="text" placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} /> <br /> <br />
                            <input type="date" placeholder="Age" value={userAge} onChange={(e) => setUserAge(e.target.value)} /> <br /> <br />
                            <select id="sslt" onChange={(e) => setUserGender(e.target.value)}>
                                <option>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select><br /> <br /> <br />
                            {/* Interests */}
                            <div style={{ paddingBottom: '24px' }}>
                                <h4 style={{ color: '#464646', fontSize: '20px', lineHeight: '27.32px', paddingBottom: '6px', fontWeight: '900' }}>Interests</h4> <br />
                                <h5 style={{ color: '#7E7C7C', fontSize: '16px', lineHeight: '21.86px', paddingBottom: '6px', fontWeight: '900' }}>Your Interests</h5>
                                <div className="interest" style={{ width: '450px' }}>

                                    {userOne?.intrest.map((e, i) =>
                                        <p key={i} style={{ color: 'white', fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', background: '#4a5e84', borderRadius: '20px', marginRight: '20px', textTransform: 'capitalize' }}>
                                            {e}
                                        </p>
                                    )}
                                </div>

                                <br />
                                <hr />
                                <br />

                                <h5>Add Interests</h5>

                                <br />

                                <div className="interest1" style={{ width: '450px' }}>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >music</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >fitness</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >kayaking</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >dance</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >television</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >visual art</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >film</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >stand up</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >shopping</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >food</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >swimming</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >reading</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >workout</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >comedy</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >social media</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >video games</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >online</p>
                                    <p onClick={(e) => addInterest(e.target.innerText)} style={{ fontSize: '16px', lineHeight: '21.86px', fontWeight: '500', width: 'max-content', padding: '10px', borderRadius: '20px', marginRight: '20px', cursor: 'pointer' }} >hangout</p>
                                </div>

                            </div>
                            {/* Social Media */}
                            <div style={{ paddingBottom: '24px' }}>
                                <h4 style={{ color: '#464646', fontSize: '20px', lineHeight: '27.32px', paddingBottom: '6px', fontWeight: '900' }}>Social Media Profile</h4>
                                <h5 style={{ color: '#7E7C7C', fontSize: '16px', lineHeight: '21.86px', paddingBottom: '6px', fontWeight: '900' }}>Your Social Media Profile Links</h5><br />
                                <input type='text' placeholder="Facebook Link" value={facebook} onChange={(e) => setFacebook(e.target.value)} /><br /><br />
                                <input type='text' placeholder="Instagram Link" value={ig} onChange={(e) => setIg(e.target.value)} /><br /><br />
                                <input type='text' placeholder="Twitter Link" value={twitter} onChange={(e) => setTwitter(e.target.value)} /><br /><br />
                            </div>
                            {/* funFacts */}
                            <div>
                                <h4 style={{ color: '#464646', fontSize: '20px', lineHeight: '27.32px', paddingBottom: '6px', fontWeight: '900' }}>Fun Fact</h4>
                                <h5 style={{ color: '#7E7C7C', fontSize: '16px', lineHeight: '21.86px', paddingBottom: '6px', fontWeight: '900' }}>You can edit your fun fact down below</h5><br />
                                <textarea placeholder="Edit Fun Fact" rows='5' style={{ outline: 'none' }}
                                    value={funFact} onChange={(e) => setFunFact(e.target.value)}>
                                </textarea>
                            </div>
                            {/* save button */}

                            <button onClick={() => updateUser()}>
                                Save Changes
                            </button>

                            <button onClick={() => closeEdit()}>
                                Cancel
                            </button>
                        </div>

                    </div>


                </div>
            </div>

        </div >
    </>
}

export default ProfilePage;