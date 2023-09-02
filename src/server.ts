import { Server } from "http";
import app from "./app";
import config from "./config";

async function bootstarp() {
    const server: Server = app.listen(config.port, () => {
        console.log(`Server is Running Port ${config.port}`)
    })

    const exitHandler = () => {
        if (server) {
            server.close(() => {
                console.log('Server close')
            })
        }
        process.exit(1)
    }

    const unexpectedHandler = () => {
        console.log("Handler");
        exitHandler();
    };

    process.on('uncaughtException', unexpectedHandler);
    process.on('unhandledRejection', unexpectedHandler);

    process.on('SIGTERM', () => {
        console.log('Sigterm Recieved');
        if (server) {
            server.close();
        }
    })
};


bootstarp();

