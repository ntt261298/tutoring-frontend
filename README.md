# Thesis tutoring frontend

### Installation and setup
Install [NodeJS](https://nodejs.org/en/download)

Install all dependencies in the root folder:
    
    npm install && npm run bootstrap

Start the `commons` package in watch mode:

    cd packages/commons
    npm run start

Start Asker portal in dev mode:

    cd packages/asker
    npm run start:dev

Start Expert portal in dev mode:

    cd packages/expert
    npm run start:dev

Start Admin portal in dev mode:

    cd packages/admin
    npm run start:dev

Start socket server:

    cd socket-server
    npm install
    node app.js

Start peer server

    npm install peer -g
    peerjs --port 9001 --key peerjs --path /tutoring


### Ports
- Asker portal: 9000
- Expert portal: 9092
- Admin portal: 3000
