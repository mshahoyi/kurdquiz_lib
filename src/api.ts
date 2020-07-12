import { Player } from "./player";
// require("dotenv").config();

export const api = {
	postSignup: (player: Player) =>
		fetch("https://dazzling-cray-623147.netlify.app" + "/.netlify/functions/players", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(player),
		}),
};
