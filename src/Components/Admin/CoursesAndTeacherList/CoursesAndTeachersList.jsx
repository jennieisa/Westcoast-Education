import Card from "../Card/Card";

const CoursesAndTeachersList = () => {

    return(
        <div>
            <h2>Välj mellan kurser och lärare</h2>
            <button>Kurser</button>
            <button>Lärare</button>
            <button>Lägg till ny kurs</button>
            <ul>
                <Card />
            </ul>
        </div>
    )
}

export default CoursesAndTeachersList;