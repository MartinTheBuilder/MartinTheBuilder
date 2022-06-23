import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";

const Nav = () => {
    const [subjects, setSubjects] = useState([]);
    useEffect(() => {
        const getSubjects = async () => {
            const req = await axios.get('http://localhost:8080/subject', {withCredentials: true});
            setSubjects(req.data);
        }
        getSubjects();
    }, []);
    return (
        <>
            <header className="p-3 bg-dark text-white">
                <div className="container">
                    <div
                        className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                                <a href="#"/>
                            </svg>
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            {subjects.map((subject: any, i) => {
                                return (<li><a href={"/" + subject.title} className="nav-link px-2 text-white" >{subject.title}</a></li>);
                            })}
                            <li><a href="/" className="nav-link px-2 text-white">Home</a></li>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">

                        </form>

                        <div className="text-end">
                            <NavLink className="btn btn-outline-light me-2" to="/Login">Login</NavLink>
                            <NavLink className="btn btn-outline-light me-2" to="/Register">Register</NavLink>
                            <NavLink className="btn btn-outline-light me-2" to="/Create">Create Post</NavLink>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Nav;