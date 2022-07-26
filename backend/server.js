const express = require("express");
const app = express();
const dotenv=require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser')
const messengerRoute =require('./routes/messengerRoute')




const databaseConnect = require("./config/database");
const authRouter = require("./routes/authRoute");

dotenv.config({
  path: "backend/config/config.env"
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/messenger", authRouter);
app.use('/api/messenger',messengerRoute)


app.get("/", (req, res) => {
  res.send({ data: "Different message from server" });
});

databaseConnect();

const port = 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
