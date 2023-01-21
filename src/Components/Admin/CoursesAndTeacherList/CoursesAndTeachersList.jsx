import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classes from "./CoursesAndTeachersList.module.css";
import TopicContext from "../../../store/Topic-context";
import Modal from "../../Modal/Modal";

const CoursesAndTeachersList = () => {

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const context = useContext(TopicContext)

    const onClickHandler = (value) => {
        context.onChange(value);
        console.log(context.topicToShow)
    };

    const onShowModalHandler = (e) => {
        e.preventDefault();
        setShowModal(true);
        console.log(showModal)
    };

    const getData = (url) => {
        console.log(url)
        fetch(url)
        .then(response => response.json())
        .then(data => setData(data))
    };

    useEffect(() => {
        if(context.topicToShow === "courses") {
            getData("http://localhost:3010/courses");
        } else if (context.topicToShow === "teachers") {
            getData("http://localhost:3010/teachers")
        }
    }, [context.topicToShow]);

    return(
        <section className="container">
            {showModal && (
                <Modal/>
            )}

            <h2>Välj mellan kurser och lärare</h2>
            <div className={classes.buttonWrapper}>
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
            </div>
            <button onClick={onShowModalHandler} className={classes.addNewBtn}>Lägg till ny {context.topicToShow === "teachers" ? "lärare" : "kurs"}</button>
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
                <li key={item.id}>
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