import React, {SyntheticEvent, useState} from "react";

import axios from 'axios';
import {Navigate} from "react-router-dom";

import './Register.css';

import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Register = () => {
    const[first_name, setFirstName] = useState('');
    const[last_name, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const[errorText, setErrorText] = useState('');

    const[redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const data = {
            first_name,
            last_name,
            email,
            password
        }
        console.log(data);
        const res = await axios.post('http://localhost:8080/auth/register',data);
        console.log(res);

        if (res.status == 201) {
            //uspešno kreiran user, preusmerim ga na login
            setRedirect(true);
        }

        //FIXME backend s try - catch v primeru errorja
        if (res.status != 201) {
            setErrorText('Napaka v podatkih');
            console.log(errorText);
        }

    }

    if (redirect) {
        return <Navigate to='/login' />
    }

    return (
        <>
                <h2>{errorText}</h2>
                <form onSubmit={submit} className="form-signin w-100 m-auto">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingFirstName"
                               placeholder="First name"
                            onChange={(e) => setFirstName(e.target.value)}/>
                        <label htmlFor="floatingFirstName">First name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingLastName"
                               placeholder="Last name"
                               onChange={(e) => setLastName(e.target.value)}/>
                        <label htmlFor="floatingLastName">Last name</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput"
                               placeholder="name@example.com"
                               onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password"
                               onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                </form>
        </>
    )
}

export default Register;