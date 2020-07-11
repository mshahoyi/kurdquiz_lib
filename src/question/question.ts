import { object, string, array, number, boolean } from "yup";

export type Answer = { id: string; text: string; correct: boolean };

export interface Question {
	id: string;
	title: string;
	answers: Array<Answer>;
	difficulty: number;
	used: boolean;
}

const schema = object().shape({
	id: string().required().strict(true),
	title: string().required(),
	difficulty: number().min(0).max(4).required(),
	used: boolean().required().strict(true),
	answers: array(
		object().shape({
			id: string().required().strict(true),
			text: string().required().strict(true),
			correct: boolean(),
		})
	)
		.min(3)
		.max(3)
		.required()
		.test({
			name: "one-correct",
			// params: { answers },
			message: "${path} must have one correct answer",
			test: (answers) => {
				let trueAlreadySeen = false;
				for (const answer of answers) {
					if (answer.correct && trueAlreadySeen) return false;
					if (answer.correct) trueAlreadySeen = true;
				}
				if (!trueAlreadySeen) return false;
				return true;
			},
		}),
});

export const validateQuestion = (question) => schema.validate(question);
