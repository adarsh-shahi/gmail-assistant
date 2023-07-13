import schedule from "node-schedule";

// Scheduling a callback function 
export default (callback, min, max) => {
	schedule.scheduleJob("*/45 * * * * *", () => {
		// random interval between min and max seconds E.g between 45 to 120 seconds
		const randomInterval = Math.floor(Math.random() * (max - min + 1)) + min;

		setTimeout(() => {
			callback();
		}, randomInterval * 1000);
	});
};
