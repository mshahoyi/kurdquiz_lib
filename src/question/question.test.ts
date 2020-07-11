import { validateQuestion } from "./index";

describe("Question Class", () => {
	it("validates for id", async () => {
		await expect(validateQuestion(goodQuestion())).resolves.toBeDefined();
		await expect(validateQuestion({ id: "" })).rejects.toBeDefined();
		await expect(validateQuestion({})).rejects.toBeDefined();
	});

	it("validates for title", async () => {
		const badQ = goodQuestion();
		delete badQ.title;

		await expect(validateQuestion(goodQuestion())).resolves.toBeDefined();
		await expect(validateQuestion(badQ)).rejects.toBeDefined();
	});

	it("validates for a difficulty field with values between 0 to 4 inclusive", async () => {
		const badq1 = goodQuestion();
		delete badq1.difficulty;
		const badq2 = goodQuestion();
		badq2.difficulty = 6;
		const badq3 = goodQuestion();
		badq3.difficulty = -2;
		const badq4 = goodQuestion();
		badq4.difficulty = "hello";

		await expect(validateQuestion(goodQuestion())).resolves.toBeDefined();
		await expect(validateQuestion(badq1)).rejects.toBeDefined();
		await expect(validateQuestion(badq2)).rejects.toBeDefined();
		await expect(validateQuestion(badq3)).rejects.toBeDefined();
		await expect(validateQuestion(badq4)).rejects.toBeDefined();
	});

	it("validates for a used field which must be boolean", async () => {
		const badq1 = goodQuestion();
		delete badq1.used;
		const badq2 = goodQuestion();
		badq2.used = "yes";
		const badq3 = goodQuestion();
		badq3.used = 1;

		await expect(validateQuestion(goodQuestion())).resolves.toBeDefined();
		await expect(validateQuestion(badq1)).rejects.toBeDefined();
		await expect(validateQuestion(badq2)).rejects.toBeDefined();
		await expect(validateQuestion(badq3)).rejects.toBeDefined();
	});

	it("validates for an answer field which must be an array of 3 objects with fields 'text', 'id' and 'correct'", async () => {
		// a bad question without answers at all
		const badq1 = goodQuestion();
		delete badq1.answers;

		// a bad question with answers not having 3 objects
		const badq2 = goodQuestion();
		badq2.answers = [].concat(goodQuestion().answers.slice(0, 2));

		// a bad question with answers having more than one correct answer
		const badq3 = goodQuestion();
		badq3.answers[1].correct = true;

		// a bad question with no true answer
		const badq4 = goodQuestion();
		badq4.answers[0].correct = false;

		// a bad question with answers missing or incorrect field
		const badq5 = goodQuestion();
		const badq6 = goodQuestion();
		const badq7 = goodQuestion();
		const badq8 = goodQuestion();
		delete badq5.answers[0].id;
		delete badq6.answers[0].text;
		delete badq7.answers[0].correct;
		badq8.answers[0].correct = "yes";

		await expect(validateQuestion(goodQuestion())).resolves.toBeDefined();
		await expect(validateQuestion(badq1)).rejects.toBeDefined();
		await expect(validateQuestion(badq2)).rejects.toBeDefined();
		await expect(validateQuestion(badq3)).rejects.toBeDefined();
		await expect(validateQuestion(badq4)).rejects.toBeDefined();
		await expect(validateQuestion(badq5)).rejects.toBeDefined();
		await expect(validateQuestion(badq6)).rejects.toBeDefined();
		await expect(validateQuestion(badq7)).rejects.toBeDefined();
		await expect(validateQuestion(badq8)).rejects.toBeDefined();
	});

	const goodQuestion = () => ({
		id: "a string",
		title: "what is your name?",
		difficulty: 1,
		used: true,
		answers: [
			{ text: "Mohammed", id: "a true id", correct: true },
			{ text: "Abdulla", id: "abdo id", correct: false },
			{ text: "flan", id: "flan id", correct: false },
		],
	});
});
