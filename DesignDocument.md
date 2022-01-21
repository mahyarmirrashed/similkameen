# Team SIMILKAMEEN Design Documentation

## Overview

Lorem ipsum dolor sit amet.

## Context

The following is the case synopsis provided in the programmming case document:

> You are the Quality Assurance Engineer for the automated crane that is being installed at an e-commerce company. You have the task to develop a test software for the automated crane that will make sure that the orders are stacked correctly before they go out for shipment. Your test software will simulate the updating of orders and rearrange them accordingly.

## Proposed Solution

For our solution, we opted for the use of a full stack web app that would allow a user to provide inputs and see the resulting outputs. The inputs would be sent to the backend via api calls, where they would be processed and return the appropriate outputs.

## Design Considerations

Lorem ipsum dolor sit amet.

### Front-end Design Decisions

Lorem ipsum dolor sit amet.

### Back-end Design Decisions

For Problem 1A, there will be an API endpoint named `execute`. The name conveys that we are simply executing the process configuration onto the input configuration. This endpoint would expect a JSON object with `input` and `process` keys and would return a single JSON object with an `output` key.

Again, Problem 1B only requires a single API endpoint named `investigate`. This name conveys the thought that the process configuration needs to be calculated by investigative algorithms and procedures. This endpoint would expect a JSON object with `input` and `output` keys and would return a single JSON object with a `process` key.

Finally, Problem 1C also only requires a single API endpoint named `randomize`. This name conveys that the idea that a input configuration will be randomized by this endpoint. The endpoint would expect a single JSON object with a `input` key and would return a JSON object with an `output` key.

## Timeline

Lorem ipsum dolor sit amet.
