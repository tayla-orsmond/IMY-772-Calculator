# IMY-772-Calculator
## Goal
The calculator app should be able to perform basic arithmetic functions (addition, subtraction, multiplication and division) on a set of hexadecimal numbers. The restrictions for the calculator is that it will only take inputs of up to 3 digits, return answers up to 6 digits, not return any negative answers, and not return any answers with decimal places.

## Contents 
- [Goal](#goal)
- [Functional Requirements](#functional-requirements)
- [Optional Extras](#optional-extras)
- [Video](#video)
- [Development server](#development-server)
- [Running unit tests](#running-unit-tests)
- [Running end-to-end tests](#running-end-to-end-tests)

## Functional Requirements
| Category | Functional Requirements |
|----------|-------------------------|
| Arithmetic Operations | Addition <br> Subtraction <br> Multiplication <br> Division |
| Input and Output | Limit input to 3-digit hexadecimal values <br> Limit output to non-negative, whole, 6-digit, hexadecimal values <br> Display input as hexadecimal value equations <br> Display output as hexadecimal values <br> Allow values and operations to be input by pressing buttons <br> |
| Error Handling and Limitations | Display error for /0 <br> Display error for / Disallow input > 3 digits <br> Display absolute value of output (disallow negative output) <br> Disallow values > 6 digits <br> Display error for / Disallow decimal places in input <br> Limit calculations to one operator and two operands at a time (disallow chaining) <br> Disallow answers to be used as input in the next equation (since these are likely > 3 digits) <br> Disallow evaluation of empty / incomplete equations |
| UI | Buttons for letters A-F <br> Buttons for 0-9 <br> Buttons for +,-,/,* <br> Button to backspace / clear value <br> Button to clear equation <br> Button to submit (equals) |
<!-- | Database | Connect to a database <br> Store all equations and answers in a database <br> Get values from database <br> Post values to database | -->

## Optional Extras
- Allow values and operations to be input via keyboard
- Store every calculation and answer in a database
- Allow a user to view calculation history
- Display hex values (input, output) as colours
Please note you need to be part of the University of Pretoria to access. 

## Video
The link to the demonstration video is here: [demonstration video](https://drive.google.com/file/d/1uIrQMNeRpPQg4IuszPdEgdz3zT_no_QT/view?usp=sharing)

## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run test:cypress` to execute the end-to-end / UI tests via cypress.
