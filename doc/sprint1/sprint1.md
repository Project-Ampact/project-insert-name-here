# Sprint Planning Meeting
**Date:** June 1, 2021

**Participants:** Luoliang Cai, David Tan, Lara Kristine Gomez, Christopher Suh, Raymond Ma, Annas Rahuma, Hui Zhi

## Sprint Goal
* Account registration and login system completed and working correctly
* Users can create and customize their profiles. Further, users can create groups with other users and create a group profile.
* Selected user stories are complete and successfully demoed in tutorial.

## Spikes
* Many of the tasks require the team members learning new technologies/frameworks

## Team Capacity
Our team of 7 is planning to commit 55-60 hours in order to complete 52 points.

## Selected User Stories with breakdown
> **Note:** Story points are decided using the card set: 0, 1, 2, 4, 8, 16, 32 , 64

* **IN 12** - As a user, I should be able to register an account with a username and password so that I can securely access information that is relevant to me and have a personalized account. *(Story Points: 4)*
    * Develop User class
    * Create Registration forom on website for 
        * For instructors
        * For entrpreneurs, join/create a team
        * For partners
    * Develop registration validation
    * Create prototypes to access login database
    * Create landing page for login/registration
    * Create registration form

* **IN 13** - As a user, I should be able to login to an account I’ve already registered so that I have an easier time accessing the platform after registration. *(Story Points: 8)*
    * Develop login authorization
    * Create login form on the website

* **IN-20** - As a user, I should be able to make and join groups to have a convenient way to contact multiple users at the same time. *(Story Points: 16)*
    * Develop group class
        *  Add members to group 
        * Remove members from group 
    * Set profile picture
    * Set company biography
    * Show list of members

* **IN-14** - As a user, I should be able to customize my profile page and make posts to it so that potential partners and team members get a better understanding of my goals as a user and learn more about me. *(Story Points: 16)*
    * Develop profile class
    * Set profile picture
    * Create an about me bio

* **IN-15** - As a partner, I should be able to view provided information about entrepreneurs to have a further understanding of who I am collaborating with. *(Story Points: 8)*
    * Make users/user-profiles indexable
    * Make company/group profiles indexable