BunqChat
=======================
BunqChat is a simple chat application FE built using the React library and utilizing React Hooks.The application leverages on a REST API and the FE polls every 3 seconds to get new messages. If after the first minute of polling there's no new message, the polling time is doubled and FE polls every 6 mins. While polling, if a new message comes in, the poll time is reduced to 3 seconds. If there's no message activity for 15 mins, polling is stopped and the user would need to click on the `CHECK FOR NEW MESSAGES` to get new messages and resume polling.

Features
--------------
- Users can create personal conversations
- Users can create group conversations
- Users can send simple text messages to other users

Limitations of the project
--------------
- Users cannot view last seen
- The application uses localStorage as a cache layer. (Redis would have been way better)
- Only 20 of the most recent chat messages are displayed (I didn't have enough time to implement infinite scrolling)
- Only 30 of the most recent conversations are displayed (I didn't have enough time to implement infinite scrolling)
- Project does not notify users of message status (Sent, Delivered, Read)
- The project does not contain unit texts

Assumptions made while working on this project
--------------
- A personal conversation can only be between two users
- The server will be receiving a lot of requests therefore I have to reduce the number of request sent to the server by stopping polling when there's no new chat message for 15 mins
- The get conversation endpoint ideally should be paginated for a large dataset like this
- BE already handles the edge case of 2 users not having more than 1 personal conversations


Getting Started
--------------
- Requirements
  - An installation of node.js is required to run the app locally
- Setting up the project
  - Clone the repo `git clone https://github.com/joel-ace/bunq-chat.git`
  - Run `cd bunq-chat` to change into bunq-chat directory
  - Run `npm install` to install all dependencies
- For Local Development
  - Run `npm run dev`
- To run the application
  - Run `npm start` and view the app on `http://localhost:3000`
- To build for production
  - Run `npm run build`

Author
--------------
- Joel Akwevagbe
