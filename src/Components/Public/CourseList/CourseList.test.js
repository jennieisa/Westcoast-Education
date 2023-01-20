import { render, screen } from "@testing-library/react"
import { setupServer } from 'msw/lib/node';
import { rest } from 'msw';

import CourseList from "./CourseList"

describe("CourseList Component", () => {

    const setUp = () => {
        render(<CourseList />);
    };

    describe("CourseList component page layout", () => {

        it("should have", () => {
            setUp();
        })
    })

    describe("CourseList component api request", () => {

        it("should render a list of courses when the api request is successfull", async () => {
            const server = setupServer(
                rest.get("http://localhost:3010/courses", (req, res, context) => {
                    return res(
                        context.json(
                            [
                                {
                                    "id": 1,
                                    "name": "JavaScript", 
                                    "courseNumber": "JS23412",
                                    "length": 50,
                                    "startDate": "2023-04-23T18:25:43.511Z"
                                },
                                {
                                    "id": 2,
                                    "name": "Art", 
                                    "courseNumber": "AT23412",
                                    "length": 50,
                                    "startDate": "2023-02-23T18:25:43.511Z"
                                }
                            ]
                        )
                    )
                })
            );

            server.listen();

            setUp();

            const courses = await screen.findAllByRole("listitem");

            expect(courses).not.toHaveLength(0);

        })
    })
})