# Sprint 4 Planning Meeting
**Date:** July 20, 2021

**Participants:** Luoliang Cai, David Tan, Lara Kristine Gomez, Christopher Suh, Raymond Ma, Hui Zhi

## Sprint Goal
* Instructors can create deliverables, view submissions, and mark submissions
* The user can view assignments and sumbit with a file upload they can also come back later to view the grade of the submission.
* Users can message people privately or in groups
* Users can join confernce meetings from the calendar

## Spikes
* Implementing the messaging features will require using a new technology such as socket.io. 

## Team Capacity
Our team of 6 is planning to commit 35-45 hours in order to complete 34 points.

## Selected User Stories with breakdown
> **Note:** Story points are decided using the card set: 0, 1, 2, 4, 8, 16, 32 , 64

* **IN-7** - As a entrepreneur, I should be able to submit online assignments/deliverables and see when they are due so that I can submit deliverables on time for feedback and evaluation *(Story Points: 4)*
    * Frontend:
        * Connect deliverables pages to the backend
    * Backend:
        * Create a GET request for user's assignments
        * Create a POST request to upload a user's submission

* **IN-8** - As an instructor, I should be able to set up online assignments/deliverables for entrepreneurs to submit with deadlines so that they can submit deliverables for feedback. *(Story Points: 8)*
    * Frontend:
        * Create assignments/deliverables upload page.
        * Connect assignments/deliverables to the backend database
    * Backend:
        * Create the endpoints for creating a new deliverable.
        * Connect the created deliverables to the calendar so that whenever a new deliverable is created it shows up as a calendar event for the correct users (based on visibility).

* **IN-9** - As an instructor, I should be able to return feedback and grades for submission of deliverables so that entrepreneurs can learn from my assessment. *(Story Points: 4)*
    * Frontend:
        * Create a feedback module that has inputs for feedbacks and grades.
        * Connect the feedback module to the backend database.
    * Backend:
        * Create a POST request to return feedback and grades for a submission of deliverables

* **IN-10** - As an instructor, I should be able to view submitted deliverables so that I can judge their work and give helpful feedback. *(Story Points: 8)*
    * Frontend:
        * Create a page that displays all the assignments in order of most recent.
        * Create an expandable/collapsible section that displays all of the submissions for an assignment.
        * Create a search bar in the submissions tab that allows instructors to search for a specific student submission.
        * Make a submission page access the backend database to display submitted deliverables
    * Backend:
        * Create a GET request for user’s submitted deliverable

* **IN-11** - As an entrepreneur, I should be able to view feedback and grades on submissions written by the instructor so that I can improve in the future. *(Story Points: 4)*
    * Frontend:
        * Ensure the posted grade is displayed on the assignment/submission page.
        * Create a modal menu to display feedback and grades for submission of deliverables
        * Link the modal menu to display the correct feedback and grade for the specified submission
        * Make a submission access the backend database to display feedback and grade for a submission
    * Backend:
        * Create a GET request for instructor’s feedback and grades on a submission written by the instructor 

* **IN-1** - As an entrepreneur, I should be able to join an existing video conference so I can participate in live workshops and sessions. *(Story Points: 2)*
    * Frontend:
        * Check if the conference link provided is valid

* **IN-19** - As a user, I should be able to privately message another user so I can keep in contact with members of my team, instructors and potential partners.  *(Story Points: **Spike**)*
    * Frontend:
        * Create a /message page that allows users to select a specific user or group to message.
        * Create a /message/:userId page that displays a chat log between two or more users and allows users to send and receive messages.
    * Backend:
        * Send messages to groups or other users
        * Retrieve a message log, for a certain chat

* **IN-117** - As a user, I want to specify what kind of content I'm interested in so that relevant videos are recommended to me. *(Story Points: 4)*
    * Frontend:
        * Add form to registration that specifies what content the user is interested in
        * Modify what videos are recommended according to content specified at registration
    * Backend:
        * Create/modify schema to store what content a user is interested in
        * Set interests endpoint
        * Get recommended videos endpoint


