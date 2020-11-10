import mongoose from "mongoose";
import {
    SERVER, DATABASE, API_PATH
} from "../../../config/index";
// TODO setup database
mongoose.Promise = global.Promise;

mongoose
    .connect(DATABASE.URL_DB ? DATABASE.URL_DB : DATABASE.URL_DB_LOCAL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(
        () => {
            console.log(`[ Database =>] Connection to the database successful. ${DATABASE.URL_DB ? DATABASE.URL_DB : DATABASE.URL_DB_LOCAL}`.yellow)
            console.log(`The APIs service running on port ${SERVER.PORT}`.cyan.bold)
            // console.log(`Document API: http://${API_PATH}.yourdomain.com/${SERVER.DOCS_PATH} or http://${SERVER.URL_API_HOST}:${SERVER.PORT}/${SERVER.DOCS_PATH}`.cyan)
        },
        err => console.log(`[ Database =>] The connection to the database failed: ${err}. = ${DATABASE.URL_DB ? DATABASE.URL_DB : DATABASE.URL_DB_LOCAL}`.red)
    );
