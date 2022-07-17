# Coding Challenge

## Running the app locally
`npm start`
to run the app in dev mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

`npm build` builds the app for production to the `build` folder.

`npm test` to launch the test runner in interactive watch mode. I only really tested the most tricky function of the project.

## Notes
* I used create-react-app to bootstrap the project.
* Libraries used: react-router and tailwind
* Date/time format is ISO 8601
* The answers of the user are saved a a 2D array of bool. It was the simplest structure for solving this problem, however this makes it not very robust to change. E.g: Changing order/inserting new question would invalidate the saved data.
* Although the QuestionView and QuestionReadView are similar, I kept them separate intentionally as this makes them more flexible for future updates.

## Duration for completetion
* 1 day for the initial draft
* Half day for refactoring + improving visuals (adding routes via react-router, improve css with tailwind)
* Half a day for further refactoring + docs + completion
---
**Total**: ~ 2 days

## CRUD endpoints suggestion
This suggestion assumes a token based API:
* GET: **getQuestions**() -> JSON List of question data
* GET: **getIteration**(token, iterationId) -> JSON object representing an iteration: `{title, creationDateString, answers}`
* POST: **createIteration**(token, title, creationDateString, answers) -> Success/Failure response
* PUT: **updateIteration**(token, iterationId, answers)
* DELETE: **removeIteration**(token, iterationId)

The iterationId could be created by the backend in the `createIteration(...)` call and sent back in the success response:
`{"code": 200, "iterationId": "b4gh53"}`
