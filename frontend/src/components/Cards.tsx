import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "./Card";

const Cards = () => {
    const [jedi, setJedi] = useState([]);
    useEffect(() => {

        const getJedi = async () => {
            const req = await axios.get('http://localhost:8080/meal/', {withCredentials: true});
            setJedi(req.data);
        }
        getJedi();
    }, []);

    return (
        <>
            <div>
            {jedi.map((jed: any, i) => {
                return (<Card key={jed.id} jed={jed}/>);
            })}
            </div>
        </>
    )
}

export default Cards;