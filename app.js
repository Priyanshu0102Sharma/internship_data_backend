require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const router = require("./Routes/router");
const PORT = process.env.PORT || 6010


app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("./uploads"));
app.use("/files",express.static("./public/files"));

app.use(router);

// Your code
if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
            if(err) {
                res.status(500).send(err)
            }
        });
    })
}
// Your code


app.listen(PORT,()=>{
    console.log(`Server start at port no ${PORT}`)
})