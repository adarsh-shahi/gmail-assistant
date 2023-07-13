import { transporter, oauth2Client } from "./oauthClient.js";

import { google } from "googleapis";

const USER_EMAIL = "adarshshahi1009@gmail.com";

// Gmail API client
const gmail = google.gmail({ version: "v1", auth: oauth2Client });

// Checks for new emails and send replies
export default async () => {
	try {
		// Get the list of unread emails
		const response = await gmail.users.messages.list({
			userId: "adarshshahi1009@gmail.com",
			q: "is:unread",
		});

		const messages = response.data.messages;

		// if there exists atleast one unread message
		if (messages && messages.length > 0) {
			for (const message of messages) {
				const email = await gmail.users.messages.get({
					userId: "adarshshahi1009@gmail.com",
					id: message.id,
				});

				const headers = email.data.payload.headers;
				const isInbox = headers.find(
					(header) =>
						header.name === "X-Gmail-Labels" && header.value.includes("INBOX")
				);
				const isReplied = headers.find(
					(header) =>
						header.name === "Subject" && header.value.startsWith("Re:")
				);
				const threadId = email.data.threadId;

				if (isInbox && !isReplied) {
					// Send reply
					const replySubject = `Re: ${
						headers.find((header) => header.name === "Subject").value
					}`;
					const replyBody =
						"hey there I am on a vaccation will get back to you in morning";

					const replyEmail = {
						from: USER_EMAIL,
						to:
							headers.find((header) => header.name === "Reply-To")?.value ||
							headers.find((header) => header.name === "From").value,
						subject: replySubject,
						text: replyBody,
					};

					await transporter.sendMail(replyEmail);

					// Moving email to a label
					await gmail.users.threads.modify({
						userId: "adarshshahi1009@gmail.com",
						id: threadId,
						requestBody: {
							addLabelIds: ["visit later"],
						},
					});
				}
			}
		}
	} catch (error) {
		console.error("Error checking and replying to emails:", error);
	}
};
