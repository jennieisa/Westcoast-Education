import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";

import classes from './AddNewForm.module.css';
import TopicContext from "../../../store/Topic-context";
import ShowModalContext from "../../../store/ShowModal-context";

const AddNewForm = () => {
    
    const topicContext = useContext(TopicContext);
    const showModalContext = useContext(ShowModalContext)

    const [competences, setCompetences] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

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
        if(topicContext.topicToShow === "courses") {
            courseNameInputRef.current.value = "";
            courseNumberInputRef.current.value = "";
            courseLengthInputRef.current.value = "";
            courseStartInputRef.current.value = "";
            courseDescriptionInputRef.current.value = "";
        } else if (topicContext.topicToShow === "teachers") {
            firstNameInputRef.current.value = "";
            lastNameInputRef.current.value = "";
            ssnInputRef.current.value = "";
            emailInputRef.current.value = "";
            mobileInputRef.current.value = "";
            competencesInputRef.current.value = "";
            setCompetences([]);
        }
    };

    const postData = (object) => {

        let url;

        console.log(object)

        topicContext.topicToShow === "courses" ? url = "http://localhost:3010/courses" : url = "http://localhost:3010/teachers";

        fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
            },
            body: JSON.stringify(object),
        });
    };

    const validateForm = (form) => {

        let isValid = false;
        const values = Object.values(form);

        for(let i = 0; i < values.length; i++) {
            if(values[i] === "") {
                isValid = false;
                break;
            } else {
                isValid = true;
            }
        }

        return isValid;
    };

    const onSubmitHandler = (e) => {
        if(topicContext.topicToShow === "courses") {
            const name = courseNameInputRef.current.value;
            const courseNumber = courseNumberInputRef.current.value;
            const length = parseInt(courseLengthInputRef.current.value);
            const startDate = courseStartInputRef.current.value;
            const description = courseDescriptionInputRef.current.value;

            e.preventDefault();

            const course = {
                name,
                courseNumber,
                length,
                description,
                startDate
            };

            const validate = validateForm(course);

            if(validate) {
                postData(course);
                clearForm();
                setErrorMessage("");
            } else {
                setErrorMessage("Du behöver fylla i varje fält innan du kan lägga till kursen.")
            }

        } else if(topicContext.topicToShow === "teachers") {
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

            const validate = validateForm(teacher);

            if(validate) {
                postData(teacher);
                clearForm();
                setErrorMessage("");
            } else {
                setErrorMessage("Du behöver fylla i varje fält innan du kan lägga till läraren.")
            }
        }
    };

    const onCancelClickedHandler = (e) => {
        e.preventDefault();
        clearForm();
    };

    return(
        <form onSubmit={onSubmitHandler} className={classes.modal}>
            <button className={classes.closeBtn} onClick={() => showModalContext.onChange()}>X</button>
            {topicContext.topicToShow === "courses" ?
                <>
                    <label htmlFor="name">Kursnamn:</label> 
                    <input id="name" type="text" name="name" ref={courseNameInputRef}/>
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
                    <div className={classes.inputWrapper}>
                        <label htmlFor="competences">Kompetenser (ange en åt gången och klicka spara emellan):</label>
                        <input type="text" id="competences" name="competences" ref={competencesInputRef}/>
                        <button className={classes.saveCompetenceBtn} onClick={onSaveCompetenceHandler}>Spara kompetens</button>
                        <p className="competenceOutput">{competences.join(", ")}</p>
                    </div>
                </>
            } 
            <button className={classes.button} type="submit">Lägg till {topicContext.topicToShow === "courses" ? "kurs" : "lärare"} </button>
            <button className={classes.button} onClick={onCancelClickedHandler}>Avbryt</button>
            <p>{errorMessage}</p>
        </form>
    )
};

export default AddNewForm;