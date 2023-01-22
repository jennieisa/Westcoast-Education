import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classes from "./CoursesAndTeachersList.module.css";
import TopicContext from "../../../store/Topic-context";
import Modal from "../../Modal/Modal";
import ShowModalContext from "../../../store/ShowModal-context";

const CoursesAndTeachersList = () => {

    const [data, setData] = useState([]);

    const topicContext = useContext(TopicContext)
    const showModalContext = useContext(ShowModalContext)

    const onClickHandler = (value) => {
        topicContext.onChange(value);
        console.log(topicContext.topicToShow)
    };

    const onShowModalHandler = (e) => {
        e.preventDefault();
        showModalContext.onChange();
        console.log(showModalContext.showModal)
    };

    const getData = (url) => {
        console.log(url)
        fetch(url)
        .then(response => response.json())
        .then(data => setData(data))
    };

    useEffect(() => {
        if(topicContext.topicToShow === "courses") {
            getData("http://localhost:3010/courses");
        } else if (topicContext.topicToShow === "teachers") {
            getData("http://localhost:3010/teachers")
        }
    }, [topicContext.topicToShow]);

    return(
        <section className="container">
            {showModalContext.showModal && (
                <Modal/>
            )}

            <h2>Välj mellan kurser och lärare</h2>
            <div className={classes.buttonWrapper}>
                <button 
                    onClick={() => onClickHandler("courses")}
                    className={topicContext.topicToShow === "courses" ? classes["active"] : classes["inactive"]}
                >
                    Kurser
                </button>
                <button 
                    onClick={() => onClickHandler("teachers")}
                    className={topicContext.topicToShow === "teachers" ? classes["active"] : classes["inactive"]}
                >
                    Lärare
                </button>
            </div>
            <button onClick={onShowModalHandler} className={classes.addNewBtn}>Lägg till ny {topicContext.topicToShow === "teachers" ? "lärare" : "kurs"}</button>
            <ul className={classes.list}>
                {data.map(item => (
                
                item.courseNumber ? 
                <li key={item.id} className={classes.listItem}>
                    <Link to={'/courses/'+item.id}>
                        <h3>{item.name}</h3>
                        <p>Kursnummer: {item.courseNumber}</p>
                        <p>{item.length} veckor</p>
                        <p>Startdatum: {item.startDate}</p>
                    </Link>
                </li>
                : 
                <li key={item.id} className={classes.listItem}>
                    <Link to={'/teachers/'+item.id}>
                        <h3>{item.firstName} {item.lastName}</h3>
                        <p>{item.ssn}</p>
                        <p>{item.email}</p>
                        <p>{item.mobileNumber}</p>
                    </Link>
                </li>
                ))}
            </ul>
        </section>
    )
}

export default CoursesAndTeachersList;