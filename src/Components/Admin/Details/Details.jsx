import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import TopicContext from "../../../store/Topic-context";

const Details = () => {
    
    const context = useContext(TopicContext)
    const {id} = useParams();

    const [data, setData] = useState(null);

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
        <article>
            {data && 
                data.courseNumber &&
                <>
                    <h3>{data.name}</h3>
                    <p>{data.courseNumber}</p>
                    <p>{data.length} veckor</p>
                    <p>{data.startDate}</p>
                    <p>{data.description}</p>
                </>
            }
            {data &&
                data.firstName &&
                <>
                    <h3>{data.firstName} {data.lastName}</h3>
                    <p>{data.ssn}</p>
                    <p>{data.email}</p>
                    <p>{data.mobileNumber}</p>
                    {data.competences.map((v, index) => (
                        <p key={index}>{v}</p>
                    ))}
                </>
            }
        </article>
    )
};

export default Details;