import express from "express";
const app = express();
const cors = require("cors");
const routers = require("./routers/email.ts");
const port = "8888";

app.use(cors());
app.use(express.json())


app.use("/sendEmail", routers);
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});