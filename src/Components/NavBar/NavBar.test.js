import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NavBar from "./NavBar";

describe("NavBar Component", () => {

    const setUp = () => {
        render(<NavBar />, {wrapper: MemoryRouter});
    };

    describe("NavBar component layout", () => {

        it("should have a heading with the text 'WESTCOAST EDUCATION'", () => {
            setUp();

            const heading = screen.getByRole("heading", {name: "WESTCOAST EDUCATION"});

            expect(heading).toBeInTheDocument();
    
        })
    })
})