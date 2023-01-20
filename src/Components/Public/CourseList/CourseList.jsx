import { useEffect } from "react";
import { useState } from "react";

const CourseList = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3010/courses")
        .then(response => response.json())
        .then(data => setCourses(data))
    }, []);

    return (
        <main>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        <h2>Kursnamn: {course.name}</h2>
                        <p>Kursnummer: {course.courseNumber}</p>
                        <p>{course.length} poäng</p>
                        <p>Startdatum: {course.startDate}</p>
                        <button>Anmäl dig</button>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default CourseList;