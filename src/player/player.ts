import { object, string, number, boolean } from "yup";

export interface Player {
	id: string;
	username: string;
	totalWon: number;
	balance: number;
	lives: number;
	banned: boolean;
	phoneNumber: string;
	loggedIn?: boolean;
}

const schema = object().shape({
	id: string().required().strict(true),
	username: string().required().strict(true),
	totalWon: number().required().positive(),
	balance: number().required().positive(),
	lives: number().required().positive().default(0),
	banned: boolean().required().strict(true).default(false),
	phoneNumber: string().required(),
	loggedIn: boolean(),
});

export const validatePlayer = (player: Player) => schema.validate(player);
