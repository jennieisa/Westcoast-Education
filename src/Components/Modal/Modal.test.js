import { render, screen } from "@testing-library/react"

import Modal from "./Modal";

describe("Modal Component", () => {

    const setUp = () => {
        render(<Modal />);
    };

    describe("Modal component page layout", () => {

        it("should have a heading with the text 'Välj mellan kurser och lärare'", () => {
            setUp();

            
        })
    })

   
})