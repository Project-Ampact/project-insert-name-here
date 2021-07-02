# Sprint 2 Planning Meeting
**Date:** June 20, 2021

**Participants:** Luoliang Cai, David Tan, Lara Kristine Gomez, Christopher Suh, Raymond Ma, Hui Zhi

## Sprint Goal
* Instructor can upload and categorize pre-recorded content for other users.
* Users can go to the video browser and filter videos by tags. Users can also view a video and any relevant information tied to it.
* Users can view their own profile as well as other people’s profiles.
* Selected user stories are complete and successfully demoed in tutorial. 


## Spikes
* Some of the user stories and tasks maybe blocked by other tasks requring team coordination and planning.

## Team Capacity
Our team of 6 is planning to commit 55-60 hours in order to complete 52 points.

## Selected User Stories with breakdown
> **Note:** Story points are decided using the card set: 0, 1, 2, 4, 8, 16, 32 , 64

* **IN 67** - As a user, I should be able to view mine and other people’s user profiles so I can see other entrepreneurs I am working with. *(Story Points: 8)*
    * Frontend:
        * Display profile picture on user page 
        * Display default profile picture for the user if there is none set
        * Link profile page to dashboard
        * Edit user profile page
    * Backend:
        * API endpoints to edit user profile
        * Connect login schema with user info schema.

* **IN 73** - As a user, I can specify a user role for myself during registration. *(Story Points: 4)*
    * Frontend:
        * Create a dropdown menu with the roles on the registration page.
    * Backend:
        * Tie the roles to constant values for the user schema instead of just a string

* **IN-6** - As a entrepreneur, I should be able to access pre recorded content posted by instructors so that I can learn from them to improve my business. *(Story Points: 16)*
    * Frontend:
        * Create an individual video page with schema info presented nicely
    * Backend:
        * Create video schema
        * API endpoint to fetch video information

* **IN-2** - As an instructor, I should be able to upload pre recorded content so that the entrepreneurs can learn from them. *(Story Points: 8)*
    * Frontend:
        * Create upload video page or modal window from video browser page
        * Make sure instructors can only add videos
    * Backend:
        * API endpoints to add new video entry to database

* **IN-4** - As an instructor, I should be able to categorize my pre recorded contents into modules and list the sequential order required for entrepreneurs to view. *(Story Points: 8)*
    * Frontend:
        * Create sections that display videos based on categories (tags); such as Marketing, Funds raising, etc..
        * Link video browser to website
    * Backend:
        * Create new endpoint for return videos with tags

* **IN-55** - As a partner, I should be able to view provided information about entrepreneurs to have a further understanding of who I am collaborating with. *(Story Points: 8)*
    * Frontend:
        * Add search functionality in the groups page
        * Link backend results to frontend display
    * Backend:
        * Make users/user-profiles indexable
        * Make company/group profiles indexable
