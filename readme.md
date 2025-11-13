Play Beat is a front-end web application that provides an interactive music-listening experience. Users can browse tracks, search for songs, manage playlists, read music news, register an account, and view their profile. The project uses HTML, CSS, and JavaScript, including animations, DOM manipulation, theming, and localStorage for basic authentication.

Features

1. index.html — Home Page

Serves as the main entry point of the website.

Contains the logo, project description, and navigation buttons.

Includes a visually animated vinyl disk created using CSS.

Provides navigation to:

Start Listening

About

News

Includes a light/dark theme toggle.



2. listen.html — Music Player

Contains a functional music player.

Features a search system implemented using JavaScript arrays.

Includes a “My Playlist” section where users can add tracks.

Uses a dedicated CSS file songInfo.css for the modal window that displays song information.

Modal includes:

Smooth opacity transitions (show/hide classes)

Overlay background

Styled headings, buttons and links

Demonstrates use of:

Element selectors

Class selectors

ID selectors

Descendant selectors

Box model properties such as padding, margins, and box-sizing



3. about.html — About Page

Explains the purpose of the Play Beat project.

Describes the concept of a personal music platform where users can listen to tracks, create playlists, and discover new music.

Lists core features such as:

Top tracks

Personalized playlists

Music discovery

Consistent navigation and responsive UI



4. news.html — News Page

Contains up-to-date music industry news.

Uses a clear card layout with article titles and descriptions.

Includes examples such as album releases, festivals, and trending tracks.

Features a carousel for rotating highlighted news items.

Maintains consistent styling with light/dark theme support.



5. profile.html — User Profile Page

Displays user information stored in localStorage:

Username

Phone

Email

Avatar

Redirects users to the registration page if no profile is detected.

Includes:

A log-out button

Placeholder sections such as friends and settings

The avatar is styled to be circular and responsive.



6. register.html — Registration Page

Contains a user registration form with:

Username

Phone number

Email

Password

Confirm password

Validates matching password fields.

Saves user data to localStorage and redirects to the profile page on success.

Includes navigation back to the home page.



JavaScript Functionality
register.js

Handles user registration and profile visibility logic.

Main functions:

Checks localStorage for existing user data.

Shows or hides registration and profile icons based on login status.

Collects form input and validates fields.

Stores user data in localStorage:

Username

Phone

Email

Password

Avatar placeholder

Empty friends list

Redirects the user to profile.html after successful registration.

Provides a logout() function to clear saved data.



toggleTheme.js / assignment7.js

Manage theme switching across all pages.

Control interactivity such as button events, menu toggles, and navigation