import { render, screen } from "@testing-library/react"
import { setupServer } from 'msw/lib/node';
import { rest } from 'msw';

import CoursesAndTeachersList from "./CoursesAndTeachersList";

describe("CoursesAndTeachersList Component", () => {

    const setUp = () => {
        render(<CoursesAndTeachersList />);
    };

    describe("CoursesAndTeachersList component page layout", () => {

        it("should have a heading with the text 'Välj mellan kurser och lärare'", () => {
            setUp();

            const heading = screen.getByRole("heading", {name: "Välj mellan kurser och lärare"});

            expect(heading).toBeInTheDocument();
        })
    })

   
})