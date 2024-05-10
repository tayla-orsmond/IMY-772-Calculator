# IMY-772-Calculator
## Goal
A very simple calculator app for an individual workshop assignment for my honours module, IMY 772, to demonstrate application of test-driven development processes and git workflow.  

The calculator app should be able to perform basic arithmetic functions (addition, subtraction, multiplication and division) on a set of hexadecimal numbers. The restrictions for the calculator is that it will only take inputs of up to 3 digits, return answers up to 6 digits, not return any negative answers, and not return any answers with decimal places.

## Functional Requirements
| Category | Functional Requirements |
|----------|-------------------------|
| Arithmetic Operations | Addition <br> Subtraction <br> Multiplication <br> Division |
| Input and Output | Limit input to 3-digit hexadecimal values <br> Limit output to non-negative, whole, 6-digit, hexadecimal values <br> Display input as hexadecimal value equations <br> Display output as hexadecimal values <br> Allow values and operations to be input by pressing buttons <br> |
| Error Handling | Display error for /0 <br> Display error for / Disallow input > 3 digits <br> Display absolute value of output (disallow negative output) <br> Overflow values larger than 6 digits (disallow values > 6 digits) <br> Display error for / Disallow decimal places in input |
| UI | Buttons for letters A-F <br> Buttons for 0-9 <br> Buttons for +,-,/,* <br> Button to backspace / clear value <br> Button to clear equation <br> Button to submit |
<!-- | Database | Connect to a database <br> Store all equations and answers in a database <br> Get values from database <br> Post values to database | -->

## Optional Extras
- Allow values and operations to be input via keyboard
- Store every calculation and answer in a database
- Allow a user to view calculation history
- Display hex values (input, output) as colours