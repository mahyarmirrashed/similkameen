# Team SIMILKAMEEN Design Documentation

## Overview

The following design document outlines the design process for Team Similkameen which consists of team members: Ayden Offenloch, Mahyar Mirrashed, Manjyot Kalkat and Owen Burland.  

## Context

The following is the case synopsis provided in the programmming case document:

> You are the Quality Assurance Engineer for the automated crane that is being installed at an
e-commerce company. You have the task to develop a test software for the automated crane that
will make sure that the orders are stacked correctly before they go out for shipment. Your test
software will simulate the updating of orders and rearrange them accordingly.

## Proposed Solution

For our solution, we opted for the use of a full stack web app that would allow a user to provide inputs and see the resulting outputs. The inputs would be sent to the backend via api calls, where they would be processed and return the appropriate outputs. 

## Design Considerations

The following section outlines the specific considerations taken into account during the design process. 

### Front-end Design Decisions

Lorem ipsum dolor sit amet.

### Back-end Design Decisions

NodeJS was chosen for the backend due to its scaleability and its capacity to handle multiple concurrent requests. NodeJS was also one of the 

For Problem 1A, there will be an API endpoint named `execute`. The name conveys that we are simply executing the process configuration onto the input configuration. This endpoint would expect a JSON object with `input` and `process` keys and would return a single JSON object with an `output` key.

Again, Problem 1B only requires a single API endpoint named `investigate`. This name conveys the thought that the process configuration needs to be calculated by investigative algorithms and procedures. This endpoint would expect a JSON object with `input` and `output` keys and would return a single JSON object with a `process` key.

Finally, Problem 1C also only requires a single API endpoint named `randomize`. This name conveys the idea that a input configuration will be randomized by this endpoint. The endpoint would expect a single JSON object with a `input` key and would return a JSON object with an `output` key.

## Timeline

### Problem Definition

The design process started with each team member carefully reading and understanding the presented prompt. Mahyar then opened a drawing application, where the problem was illustrated and each team member made a list of questions to ask to the director if need be. After these questions were answered, the next steps were to brainstorm ideas. 

### Brainstorming

Brainstorming started with each member offering possible ideas on the method to solve the problem. Afterwards, the ideas were narrowed into the creation of a full stack web app. The backend would consist of NodeJS and API endpoints to the three required functions (1A, 1B, and 1C), with the frontend consisting of a user interface allowing input of parameteres, and the display of the calculated return.

### Work Distribution

After a short discussion, it was decided that the group would split into teams of two, one for the front end, and one for the back end. Ayden and Owen decided to work on the front end, utilizing React to create an interactive user experience. Manjyot and Mahyar went on to work on the backend, utilizing NodeJS to provide API endpoints. 

### Work Process

Each team went on to work on their respective sections. The front end team started designing a graphical user interface (GUI), and planning how the API calls would be made. Ayden started on the structure of the webpage while Owen worked on the utility of it. 

Manjyot and Mahyar worked on the logic for the required functions, including the execution of the crane, determining a process configuration, and randomizing the input. They each started by implementing their solution in Python, before moving it over to JavaScript. This was done because Python is more forgiving in its implmentations and easier for error testing. In the JavaScript implementation, arrays were used to store the data representing the input and output. This was chosen due to the ease of implementation, and that arrays would sufice the needs of this problem. For the algoriths used, the execute function operates as a finite state machine (F.S.M) where each iteration of a loop parses and executes a process configuration instruction. The investigate function methodically checks each column to see how many boxes it has, and will either add or move a box until the input matches the output. 

### Documentation and Testing

Finally, the two subteams got back together and connected the back end and front end. The documentation and README were also written at this time. 

### Submission

The design process ended with the team submitting their code and documentation. 