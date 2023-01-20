import { render, screen } from "@testing-library/react"

import CardDetails from "./CardDetails";

describe("CardDetails Component", () => {

    const setUp = () => {
        render(<CardDetails />);
    };

    describe("CardDetails component page layout", () => {

        it("should have a heading with the text 'Välj mellan kurser och lärare'", () => {
            setUp();

            
        })
    })

   
})