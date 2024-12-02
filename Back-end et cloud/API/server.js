import express from "express";
import {default as Router} from "./route/index.js";

const cors = require('cors');
const app = express();
const port = 3267;

app.use('cors');
app.use(express.json());
app.use(Router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 