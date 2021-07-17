# Sprint 3 Planning Meeting
**Date:** July 5, 2021

**Participants:** Luoliang Cai, David Tan, Lara Kristine Gomez, Christopher Suh, Raymond Ma, Hui Zhi

## Sprint Goal
* Users of the website can create discussion board posts to support an enriched community environment. The user can specify which roles can view their post.
* Users can comment on discussion board posts and reply to other user's comments.
* Users can view their calendar for upcoming events and schedule new events for themselves or to their group.
* Entrepreneurs can view assignment delieverables and make submissions.

## Spikes
* Implementing the calendar features require using an external API and may take some unexpected amount of time to utilize.

## Team Capacity
Our team of 6 is planning to commit 55-60 hours in order to complete 62 points.

## Selected User Stories with breakdown
> **Note:** Story points are decided using the card set: 0, 1, 2, 4, 8, 16, 32 , 64

* **IN-16** - As a user, I should be able to make posts with different visibilities to a discussion board so that I can ensure discussions are visible to those who it is relevant to. *(Story Points: 16)*
    * Frontend:
        * Create a post component module that gives css layout & styling to a single post
        * Call backend to get posts with their visibility
        * Render posts by type of visibility

    * Backend:
        * Create post schema
        * Get posts by group/visibility??
        * Create posts by group / visibility
        * Delete posts

* **IN-17** - As a user, I should be able to comment on posts and receive replies from other users to have open ended discussions with members of the community. *(Story Points: 16)*
    * Frontend:
        * Create a comment component module that gives css layout & styling to a single comment.
        * Create a remove comment button that is imported into each embed into each comment and reply.
        * Create a comment section component that holds all the comments for a given post.
        * Create a reply component module that gives css layout & styling to a single reply to a given comment.

* **IN-18** - As an instructor, I should be able to monitor the discussion board to ensure that the quality of discussions are appropriate and on topic. *(Story Points: 4)*
    * Frontend:
        * Show delete button to instructors on comments, posts, and replies.
    * Backend:
        * User authentication so that instructors can delete posts

* **IN-3** - As an instructor, I should be able to upload pre recorded content so that the entrepreneurs can learn from them. *(Story Points: 8)*
    * Frontend:
        * Create modal window on calendar page to add calendar event
    * Backend:
        * Create POST request to add event

* **IN-5** - As a user, I should be able to view important events on a calendar so that I can schedule myself accordingly. *(Story Points: 8)*
    * Frontend:
        * Create calendar page loading a user’s events
    * Backend:
        * Create calendar event schema (refer to fullcalendar api for what data fields are needed)
        * Create api get request for user’s events

* **IN-7** - As a entrepreneur, I should be able to submit online assignments/deliverables and see when they are due so that I can submit deliverables on time for feedback and evaluation. *(Story Points: 8)*
    * Frontend:
        * Create an assignment display page showing all the user’s assignments
        * Create an individual assignment submission page showing description, deadline. Have a file upload button.
        * Create an assignment component module.
    * Backend:
        * Get request for a user’s assignments
        * POST request to upload a user’s submissions

* **IN-81** - As a user, I want to ensure that all content associated with my account can only be modified when I am logged into my own account so no one else can change my account associated data.  *(Story Points: 2)*
    * Backend:
        * Only unregistered users can only login / register and nothing else.
        * Only instructors should be able to post deliverables and view all submissions.
        * Comments / posts can only be deleted by the original poster or group owner.
        * User and Group profiles can only be edited by the owner(s) of the profile
        * When user signs out they lose access to account associated content.
