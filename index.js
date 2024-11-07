const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const cors = require("cors");


const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/admin", adminRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})