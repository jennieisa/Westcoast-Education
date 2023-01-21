import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { rest } from 'msw';

import Details from "./Details";

describe("Details Component", () => {

    const setUp = () => {
        render(<Details />);
    };

    describe("Details component api request", () => {

        it("should get the clicked item if api request is successfull", async () => {
            const server = setupServer(
                rest.get("http://localhost:3010/teachers/1", (req, res, context) => {
                    return res(
                        context.json(
                            {
                                "id": 1,
                                "firstName": "Agneta",
                                "lastName": "Carlsson",
                                "ssn": 196303041230,
                                "email": "agneta.carlsson@wceducation.com",
                                "mobileNumber": 701112223,
                                "competence": [
                                "JavaScript",
                                "Math",
                                "Art"
                                ]
                            },
                        )
                    )
                })
            );

            server.listen();
            
            setUp();

            const teacher = await screen.findAllByRole("article");
            
            expect(teacher).not.toBeNull();
        })
    })
})