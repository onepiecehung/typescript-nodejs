const mongoose = require("mongoose");
// TODO setup database
mongoose.Promise = global.Promise;

mongoose
    .connect(`mongodb://localhost:27017/malllog`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(
        () => {
            console.log(`[ Database =>] Connection to the database successful`)
        });
