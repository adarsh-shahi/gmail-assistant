import { google } from "googleapis";
import nodemailer from "nodemailer";
const { OAuth2 } = google.auth;

import {
	CLIENT_ID,
	CLIENT_SECRET,
	REFRESH_TOKEN,
	REDIRECT_URL,
	USER_EMAIL,
} from "./credentials.js";

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//  Nodemailer transporter
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		type: "OAuth2",
		user: USER_EMAIL,
		clientId: CLIENT_ID,
		clientSecret: CLIENT_SECRET,
		refreshToken: REFRESH_TOKEN,
		accessToken: oauth2Client.getAccessToken(),
	},
});

export { oauth2Client, transporter };
