# b.ignited Test Data Generator Project

## Overview
This repository is dedicated to providing automated end-to-end Cypress tests for the IBAN and BIS number generation features within the b.ignited test data generator tool.

## Setup Instructions

Before running the tests, ensure that you have Node.js and the package manager npm or Yarn installed on your system.

### Dependencies Installation

Install the required dependencies using npm:

```bash
npm install
```

Alternatively, if you prefer using Yarn, execute:

```bash
yarn install
```

### Running Cypress Interactively

To launch the Cypress Test Runner for interactive test runs, use the following command with npm:

```bash
npx cypress open
```

Or with Yarn:

```bash
yarn run cypress open
```

## Running Tests in Headless Mode

For headless test execution without the Cypress UI, use the command:

```bash
npm run cypress run
```

Or with Yarn:

```bash
yarn cypress run
```

This will run the tests in a headless Electron browser by default. You can specify a different browser using the `--browser` flag if needed.

## Test Files Overview

- `cypress/e2e/iban_spec.cy.js`: This file comprises a suite of tests focused on the generation of IBAN numbers.
- `cypress/e2e/bis_spec.cy.js`: This file includes tests for validating the BIS number generation process.

Each test case is meticulously designed to validate specific aspects of the number generation, ranging from the successful output of numbers to the proper response when encountering invalid inputs.

## Author Information

**Robbe Caenen**

For any inquiries or further information, you can reach out through the following channels:

- Email: [robbe.caenen.rc@gmail.com](mailto:robbe.caenen.rc@gmail.com)
- LinkedIn: [Connect with Robbe](https://www.linkedin.com/in/robbecaenen/)