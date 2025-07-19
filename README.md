# Server Connect - WebRTC Video Chat

Server Connect is a real-time video and audio chat application that allows users to connect with each other in two ways: by sharing a personal code or by connecting with a random stranger. It uses WebRTC for peer-to-peer communication, ensuring low-latency connections.

-----

## Features

  * **Direct Calling**: Connect with a friend by sharing your unique "Personal Code".
  * **Stranger Connect**: Opt-in to be discoverable and connect with another random user who is also looking to chat.
  * **Real-time Communication**: High-quality video and audio streaming directly between users.
  * **Simple Interface**: A clean and easy-to-use interface for a seamless user experience.

-----

## Tech Stack

  * **Frontend**: HTML, CSS, vanilla JavaScript
  * **Backend**: Node.js, Express.js
  * **Signaling**: Socket.IO
  * **Peer-to-Peer Connection**: WebRTC

-----

## How It Works

This application uses a Node.js server with Socket.IO as a **signaling server**. The server does not process the video or audio streams but is responsible for setting up the call.

1.  When a user opens the application, they connect to the Socket.IO server and receive a unique ID.
2.  To call a friend, one user shares their ID with another. The application sends a "call offer" through the signaling server to the specified ID.
3.  To connect with a stranger, the user's ID is added to an "available" pool. The server then randomly pairs two users from this pool.
4.  Once the two users agree to connect, the signaling server helps them exchange the necessary WebRTC metadata (like network information and media capabilities).
5.  After the initial setup, a direct **peer-to-peer (P2P) connection** is established via WebRTC, and the video/audio data flows directly between the users' browsers.

-----

## Setup and Installation

To run this project on your local machine:

1.  **Clone the repository**:
    ```sh
    git clone <your-repository-url>
    ```
2.  **Navigate to the project directory**:
    ```sh
    cd <your-project-folder>
    ```
3.  **Install dependencies**:
    ```sh
    npm install
    ```
4.  **Start the server**:
    ```sh
    node app.js
    ```
5.  Open your web browser and go to `http://localhost:3000`.

-----

## Deployment

This application is built as a monolithic service where the Node.js server both handles the signaling logic and serves the frontend files. It is designed for deployment on platforms that support persistent Node.js web services.

**Example for Render**:

  * **Build Command**: `npm install`
  * **Start Command**: `node app.js`
