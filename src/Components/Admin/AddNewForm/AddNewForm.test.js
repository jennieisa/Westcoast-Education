import { render, screen } from "@testing-library/react"
import { setupServer } from 'msw/lib/node';
import { rest } from 'msw';
import userEvent from "@testing-library/user-event";

import AddNewForm from './AddNewForm';

describe("AddNewForm Component", () => {

    const setUp = () => {
        render(<AddNewForm />);
    };

    describe("AddNewForm component page layout", () => {

        it("should have a button with the text 'Lägg till kurs'", () => {
            setUp();

            const button = screen.getByRole("button", {name: "Lägg till kurs"});

            expect(button).toBeInTheDocument();
        })
    })

    describe("Form interactions", () => {

        it("should save a new course when 'Lägg till kurs' button is clicked", async () => {
            let reqBody;

            const server = setupServer(
                rest.post("http://localhost:3010/courses", (req, res, context) => {
                    req.json().then((data) => reqBody = data);
                    return res(context.status(201));
                })
            );

            server.listen();

            setUp();

            const courseNameInput = screen.getByLabelText("Kursnamn:");
            const courseNumberInput = screen.getByLabelText("Kursnummer:");
            const lengthInput = screen.getByLabelText("Längd på kursen (veckor):");
            const courseDescInput = screen.getByLabelText("Kursbeskrivning:");
            const startDateInput = screen.getByLabelText("Startdatum för kursen:");
            const addCourseBtn = screen.getByRole("button", {name: "Lägg till kurs"});

            await userEvent.type(courseNameInput, "Bild");
            await userEvent.type(courseNumberInput, "BD12312");
            await userEvent.type(lengthInput, "30");
            await userEvent.type(courseDescInput, "Lorem ipsum lorem ipsum");
            await userEvent.type(startDateInput, "2022-03-02");
            await userEvent.click(addCourseBtn);

            expect(reqBody).toEqual({
                name: "Bild",
                courseNumber: "BD12312",
                length: 30,
                description: "Lorem ipsum lorem ipsum",
                startDate: "2022-03-02",
            });

        })
    })
   
})