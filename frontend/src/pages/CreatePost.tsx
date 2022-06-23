import React, {SyntheticEvent, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios";


const styleTextarea = {
    height: "100%",
}

const CreatePost = () => {
    const [ingredients, setIngredients] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [subjectSelected, setSubjectSelected] = useState(1);

    const [subjects, setSubjects] = useState([]);


    useEffect(() => {
        const getSubjects = async () => {
            const req = await axios.get('http://localhost:8080/subject', {withCredentials: true});
            setSubjects(req.data);
        }
        getSubjects();
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            "meal": title,
            "description": content,
            "type_id": subjectSelected,
            "ingredients": ingredients
        }

        console.log(data);

        const res = await axios.post('http://localhost:8080/meal', data, {withCredentials: true});
        const resStatus =await res.data;
        console.log(resStatus);
        if (resStatus !== undefined) {
        window.location.href ="/"

        }

    }


    return (
        <>

            <form onSubmit={submit} className="form-signin w-100 m-auto">
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput"
                           placeholder="meal name"
                           onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="floatingInput">ime</label>
                </div>
                <div className="form-floating">
                    <select className="form-control" id="floatingSelect"
                            onChange={(e: any) => setSubjectSelected(e.target.value)}>
                        {subjects.map((subject: any, i) => {
                            return (<option value={subject.id} key={subject.id}>{subject.title}</option>);
                        })}

                    </select>
                    <label htmlFor="floatingSelect">Izberi tip</label>
                </div>
                <div className="form-floating">
                    <textarea className="form-control" id="floatingContent"
                              rows={8}
                              style={styleTextarea}
                              placeholder="Vnesi vsebino"
                              onChange={(e) => setContent(e.target.value)}>
                    </textarea>
                    <label htmlFor="floatingContent">Opis</label>
                </div>
                <div className="form-floating">
                    <textarea className="form-control" id="floatingContent"
                              rows={8}
                              style={styleTextarea}
                              placeholder="Insert ingredients"
                              onChange={(e) => setIngredients(e.target.value)}>
                    </textarea>
                    <label htmlFor="floatingContent">Sestavine</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Shrani</button>
            </form>
        </>
    )
}

export default CreatePost;