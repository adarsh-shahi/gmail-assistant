import dotenv from "dotenv";
dotenv.config();

// Oauth Credentials
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const USER_EMAIL = "adarshshahi1009@gmail.com";

export { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN, USER_EMAIL };
