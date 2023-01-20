import { render, screen } from "@testing-library/react"

import Card from "./Card";

describe("Card Component", () => {

    const setUp = () => {
        render(<Card />);
    };

    describe("Card component page layout", () => {

        it("should have a heading with the text 'Välj mellan kurser och lärare'", () => {
            setUp();

            
        })
    })

   
})