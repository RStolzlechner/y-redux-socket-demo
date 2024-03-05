# y-redux-socket-demo
This sample demonstrates the implementation of a concept known as Y-Redux-Socket. The aim of this concept is to enhance code maintainability for collaborative web applications, focusing on client-server communication using the WebSocket protocol and client-side state management. Further details about the concept are available in the Y-Redux-Socket bachelor thesis, which can be accessed here:  [YReduxSocket bachelor thesis](./YReduxSocket-bachelor-thesis.pdf) (in German).

## Prerequisites
- git 2.44
- docker 25.0
- docker compose 2.24
- dotnet 8.0
- node 20.11
- npm 10.2
- Angular CLI: 17.2

## Setup
1. Clone the repository `git clone git@github.com:RStolzlechner/y-redux-socket-demo.git`
2. Navigate to the database directory `cd y-redux-socket-demo/database`
3. Start the database `docker-compose up -d`
4. Navigate to the server directory `cd ../DemoServer`
5. Start the server `dotnet run`
6. Navigate to the client directory `cd ../demo-client
7. Install the dependencies `npm install`
8. Start the client `ng serve`
9. Open the browser and navigate to `http://localhost:4200`
