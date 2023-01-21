import { useRef } from "react";
import { useContext } from "react";

import classes from './AddNewForm.module.css';
import TopicContext from "../../../store/Topic-context";
import { useState } from "react";

const AddNewForm = (props) => {
    
    const context = useContext(TopicContext);

    const [competences, setCompetences] = useState([]);

    const courseNameInputRef = useRef();
    const courseNumberInputRef = useRef();
    const courseLengthInputRef = useRef();
    const courseStartInputRef = useRef();
    const courseDescriptionInputRef = useRef();

    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const ssnInputRef = useRef();
    const emailInputRef = useRef();
    const mobileInputRef = useRef();
    const competencesInputRef = useRef();

    const onSaveCompetenceHandler = (e) => {
        e.preventDefault();

        setCompetences(competences => [...competences, competencesInputRef.current.value]);
    };

    const clearForm = () => {
        if(context.topicToShow === "courses") {
            courseNameInputRef.current.value = "";
            courseNumberInputRef.current.value = "";
            courseLengthInputRef.current.value = "";
            courseStartInputRef.current.value = "";
        } else if (context.topicToShow === "teachers") {
            firstNameInputRef.current.value = "";
            lastNameInputRef.current.value = "";
            ssnInputRef.current.value = "";
            emailInputRef.current.value = "";
            mobileInputRef.current.value = "";
            competencesInputRef.current.value = "";
        }
    };

    const postData = (object) => {

        let url;

        context.topicToShow === "courses" ? url = "http://localhost:3010/courses" : url = "http://localhost:3010/teachers";

        fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
            },
            body: JSON.stringify(object),
        });
    };

    const onSubmitHandler = (e) => {
        if(context.topicToShow === "courses") {
            const name = courseNameInputRef.current.value;
            const courseNumber = courseNameInputRef.current.value;
            const length = courseLengthInputRef.current.value;
            const startDate = courseStartInputRef.current.value;
            const description = courseDescriptionInputRef.current.value;

            e.preventDefault();

            const course = {
                name,
                courseNumber,
                length,
                startDate,
                description
            };

            postData(course);

        } else if(context.topicToShow === "teachers") {
            const firstName = firstNameInputRef.current.value;
            const lastName = lastNameInputRef.current.value;
            const ssn = ssnInputRef.current.value;
            const email = emailInputRef.current.value;
            const mobileNumber = mobileInputRef.current.value;

            e.preventDefault();

            const teacher = {
                firstName,
                lastName,
                ssn,
                email,
                mobileNumber,
                competences
            };

            console.log(competencesInputRef.current)

            postData(teacher);
        }

        clearForm();
    };

    const onCancelClickedHandler = (e) => {
        e.preventDefault();
        clearForm();
        
    };

    console.log(props.showModal);

    return(
        <form onSubmit={onSubmitHandler} className={classes.modal}>
            {context.topicToShow === "courses" ?
                <>
                    <label htmlFor="name">Kursnamn:</label> 
                    <input id="name" type="text" name="name" ref={courseNameInputRef} />
                    <label htmlFor="courseNumber">Kursnummer:</label>
                    <input id="courseNumber" type="text" name="courseNumber" ref={courseNumberInputRef}/>
                    <label htmlFor="length">Längd på kursen (veckor):</label>
                    <input id="length" type="number" name="length" ref={courseLengthInputRef}/>
                    <label htmlFor="description">Kursbeskrivning:</label>
                    <textarea name="description" id="description" cols="30" rows="2" ref={courseDescriptionInputRef}></textarea>
                    <label htmlFor="startDate">Startdatum för kursen:</label>
                    <input id="startDate" type="date" name="startDate" ref={courseStartInputRef}/>
                </>
            :
                <>
                    <label htmlFor="firstName">Förnamn:</label>
                    <input id="firstName" name="firstName" ref={firstNameInputRef} type="text" />
                    <label htmlFor="lastName">Efternamn:</label>
                    <input type="text" id="lastName" name="lastName" ref={lastNameInputRef}/>
                    <label htmlFor="ssn">Personnummer:</label>
                    <input type="number" id="ssn" name="ssn" ref={ssnInputRef} placeholder="19xxxxxxxxxx"/>
                    <label htmlFor="email">E-post:</label>
                    <input type="email" id="email" name="email" ref={emailInputRef} />
                    <label htmlFor="mobileNumber">Mobilnummer:</label>
                    <input type="tel" id="mobileNumber" name="mobileNumber" ref={mobileInputRef}/>
                    <div>
                        <label htmlFor="competences">Kompetenser (ange en åt gången och klicka spara emellan):</label>
                        <input type="text" id="competences" name="competences" ref={competencesInputRef}/>
                        <button onClick={onSaveCompetenceHandler}>Spara kompetens</button>
                        <p>{competences.join(", ")}</p>
                    </div>
                </>
            } 
            <button type="submit">Lägg till {context.topicToShow === "courses" ? "kurs" : "lärare"} </button>
            <button onClick={onCancelClickedHandler}>Avbryt</button>
        </form>
    )
};

export default AddNewForm;