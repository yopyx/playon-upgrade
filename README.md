# PLAYON APP

The app project showcases a video streaming app viewing trendy videos based on categories. The app implements video search feature that gives an infinite scrolling page of video results and gets recommended videos based on tags.

#### Table of Contents

- [Project App Overview](#section1)
- [Key Features](#section2)
- [Screenshots](#section3)
- [Live Demo Link](#section4)
- [Tech Stack](#section5)
- [Challenges Manage](#section6)

<a id="section1"></a>

### Project App Overview

#### The aim is to build a video streaming app that allows detailed responsive experience for the user to:

1. search for videos/live streams with showing autocomplete search suggestions.
2. surf infinite list of video cards and choose suggestion category to change the current category of infinite-scrolling videos list.
3. choose a video card to be able to watch the video/live stream.
4. view all comments and have the ability to post a comment in addition to reply to any comment.
5. show recommended videos in "/watch" path based on the current played video's tags.
6. show slow scrolling mode of live chat and have the ability to add a comment.

---

<a id="section2"></a>

### Key Features

- Search feature that shows autocomplete instances for each key written and ensures performance by caching them
- list infinite scrolling : allow render of more video cards upon scrolling down via requesting youtube API via useInfiniteQuery hook to fetch more data
- Nested comments feature that is implemented via tree data structure algorithm (Reddit comments structure)
- Live chat feature for real-time engaging such that debounce logic is used to decrease request calls
- caching feature : allow caching by session for all slices (except for quota slice) via redux-persist to increase performance and improve user experience

---

<a id="section3"></a>

### Screenshots

---

<a id="section4"></a>

### Live Demo Link

[Click here](https://play0n.vercel.app/) to visit the website.

---

<a id="section5"></a>

### Tech Stack

- Frontend: React, Redux, Tailwind CSS, SASS, TypeScript
- Backend: Node.js
- API: YouTube REST APIs
- Libraries: React Router Dom for routing, React Query for handling api requests
- Configuration tools: Vite

---

<a id="section6"></a>

### Challenges Management

#### N-nested comments (Reddit)

Challenge => implement logic for rendering N-nested comments data and posting new comments
Resolve => apply Tree data structure by rendering Comment component inside CommentsList component and at the same time rendering CommentsList component inside Comment component. store new posted comments in comment slice in order to be rendered in their nested right place

#### previous/next page navigation

Problem => when navigate between "/results" paths, the data shown is of the last fetched data which results in unupdated render of the page
Resolve => make the api call get the input from the path name of the current path location

#### api calls need api key of limited quota

problem => limited number of api calls
resolve => create quota slice which stores more than one api key and calculate the quota after every api call and at certain point (near finished quota) the api key is changed with another key, Allowing smooth user experience for much more time
