import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NavBar from "./NavBar";

describe("NavBar Component", () => {

    const setUp = () => {
        render(<NavBar />, {wrapper: MemoryRouter});
    };

    describe("NavBar component layout", () => {

        it("should have a link with the text 'Våra kurser'", () => {
            setUp();

            const link = screen.getByRole("link", {name: "Våra kurser"});

            expect(link).toBeInTheDocument();
        })

        it("should have a link with the text 'Admin'", () => {
            setUp();

            const link = screen.getByRole("link", {name: "Admin"});

            expect(link).toBeInTheDocument();
        })
    })
})