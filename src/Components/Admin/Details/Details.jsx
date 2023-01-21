import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import TopicContext from "../../../store/Topic-context";
import classes from "./Details.module.css";

const Details = () => {
    
    const context = useContext(TopicContext)
    const {id} = useParams();

    const [data, setData] = useState(null);

    const navigate = useNavigate();

    const getData = (url, id) => {
        fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(data => setData(data))
    };

    useEffect(() => {
        if(context.topicToShow === "courses") {
            getData("http://localhost:3010/courses", id);
        } else if (context.topicToShow === "teachers") {
            getData("http://localhost:3010/teachers", id)
        }
    }, [context.topicToShow, id]);

    return(
        <article className="container">
            <button className={classes.goBackBtn} onClick={() => navigate(-1)}>Gå tillbaka</button>
            {data && 
                data.courseNumber &&
                <>
                    <h2>{data.name}</h2>
                    <p className={classes.heading}>Kursnummer:</p>
                    <p className={classes.text}>{data.courseNumber}</p>
                    <p className={classes.heading}>Kurslängd:</p>
                    <p className={classes.text}>{data.length} veckor</p>
                    <p className={classes.heading}>Startdatum:</p>
                    <p className={classes.text}>{data.startDate}</p>
                    <p className={classes.heading}>Kursbeskrivning:</p>
                    <p className={classes.text}>{data.description}</p>
                </>
            }
            {data &&
                data.firstName &&
                <>
                    <h2>{data.firstName} {data.lastName}</h2>
                    <p className={classes.heading}>Personnummer:</p>
                    <p className={classes.text}>{data.ssn}</p>
                    <p className={classes.heading}>E-post:</p>
                    <p className={classes.text}>{data.email}</p>
                    <p className={classes.heading}>Mobilnummer:</p>
                    <p className={classes.text}>{data.mobileNumber}</p>
                    <p className={classes.heading}>Kompetenser:</p>
                    <p className={classes.text}>{data.competences.join(", ")}</p>
                </>
            }
        </article>
    )
};

export default Details;