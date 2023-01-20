import { render, screen } from "@testing-library/react"

import AddNewForm from './AddNewForm';

describe("AddNewForm Component", () => {

    const setUp = () => {
        render(<AddNewForm />);
    };

    describe("AddNewForm component page layout", () => {

        it("should have a heading with the text 'Välj mellan kurser och lärare'", () => {
            setUp();

            
        })
    })

   
})