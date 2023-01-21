import { useEffect } from "react";
import { useState } from "react";

import classes from './CourseList.module.css';

const CourseList = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3010/courses")
        .then(response => response.json())
        .then(data => setCourses(data))
    }, []);

    return (
        <section>
            <ul className={classes.list}>
                {courses.map((course) => (
                    <li className={classes.listItem} key={course.id}>
                        <h2>{course.name}</h2>
                        <p>Kursnummer: {course.courseNumber}</p>
                        <p>{course.length} veckor</p>
                        <p>Startdatum: {course.startDate}</p>
                        <button className={classes.button}>Anmäl dig</button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default CourseList;