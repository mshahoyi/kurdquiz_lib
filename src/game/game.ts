import { object, string, date, number, array, boolean } from "yup";

export interface Game {
	id: string;
	date: Date;
	prize: number;
	questionIds: Array<string>;
	done: boolean;
	numberOfOptions: number;
	timeToAnswer: number;
}

const schema = object().shape({
	id: string().strict(true).required(),
	date: date().required(),
	prize: number().required().positive(),
	questionIds: array().required().min(3).max(30),
	done: boolean().strict(true).required(),
	numberOfOptions: number().required().min(2).max(5),
	timeToAnswer: number().required().max(60).min(5),
});

export const validateGame = (game) => schema.validate(game, { strict: false });
