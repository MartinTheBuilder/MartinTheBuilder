import Card from "../components/Card";
import React, {useEffect, useState} from "react";
import axios from "axios";

const Predjedi = () => {
    const [jedi, setJedi] = useState([]);
    useEffect(() => {

        const getJedi = async () => {
            const req = await axios.get('http://localhost:8080/meal/', {withCredentials: true});
            setJedi(req.data);
        }
        getJedi();
    }, []);

    return (<>   {
        jedi.map((jed: any, i) => {
            if (jed.type_id === 1) {
                return (<Card key={jed.id} jed={jed}/>);
            }
        })
    }</>)
}
export default Predjedi