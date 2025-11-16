import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import urlExist from "url-exist";
import URL from "./models/urlModel.js";

const __dirname = path.resolve();

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // This line helps us server static files in the public folder. Here we'll write our CSS and browser javascript code


mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("DB connection error:", err));


app.listen(8000, () => {
    console.log("App listening on port 8000");
});


// Middleware: Validate incoming URL
const validateURL = async (req, res, next) => {
    const { url } = req.body;

    if (!url) {
        return res.json({ message: "URL is required", type: "failure" });
    }

    const isExist = await urlExist(url);
    if (!isExist) {
        return res.json({ message: "Invalid URL", type: "failure" });
    }

    next();
};


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
// POST: Create a short URL
app.post("/link", validateURL, async (req, res) => {
    const { url } = req.body;  

    // Generate a unique id
    const id = nanoid(7);

    // Create MongoDB entry (Model name is URL)
    const newURL = new URL({ url, id });  // FIXED: correct field name

    try {
        await newURL.save();  // FIXED: must use await
        res.json({
            message: `${process.env.DEPLOY_URL}/${id}`,
            type: "success"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred! Please try again.",
            type: "failure"
        });
    }
});





// GET: Redirect short URL → original URL
app.get("/:id", async (req, res) => {
    const id = req.params.id;

    const originalLink = await URL.findOne({ id });

    if (!originalLink) {
        return res.sendFile(__dirname + "/public/404.html");
    }

    res.redirect(originalLink.url);  // FIXED: must match the field saved
});
