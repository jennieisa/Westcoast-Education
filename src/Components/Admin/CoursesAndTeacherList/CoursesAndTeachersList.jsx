import { useContext, useState, useEffect } from "react";

import classes from "./CoursesAndTeachersList.module.css";
import TopicContext from "../../../store/Topic-context";
import Card from "../Card/Card";

const CoursesAndTeachersList = () => {

    const [data, setData] = useState([]);

    const context = useContext(TopicContext)

    const onClickHandler = (value) => {
        context.onChange(value);
        console.log(context.topicToShow)
    }

    const getData = (url) => {
        console.log(url)
        fetch(url)
        .then(response => response.json())
        .then(data => setData(data))
    }

    useEffect(() => {
        if(context.topicToShow === "courses") {
            getData("http://localhost:3010/courses");
        } else if (context.topicToShow === "teachers") {
            getData("http://localhost:3010/teachers")
        }
    }, [context.topicToShow]);

    return(
        <div>
            <h2>Välj mellan kurser och lärare</h2>
            <button 
                onClick={() => onClickHandler("courses")}
                className={context.topicToShow === "courses" ? classes["active"] : classes["inactive"]}
            >
                Kurser
            </button>
            <button 
                onClick={() => onClickHandler("teachers")}
                className={context.topicToShow === "teachers" ? classes["active"] : classes["inactive"]}
            >
                Lärare
            </button>
            <button>Lägg till ny {context.topicToShow === "teachers" ? "lärare" : "kurs"}</button>
            <ul>
                {data.map(item => (
                    data.lenght !== 0 &&
                    <li key={item.id}>
                    
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CoursesAndTeachersList;