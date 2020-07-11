import { validateGame } from "./index";

describe("Game Model", () => {
	const goodGame = () => ({
		id: "81f336e9-332b-4842-8c86-ebe4c048d5b7",
		date: new Date(),
		prize: 1000000,
		questionIds: ["hello", "yellow", "mellow"],
		done: false,
		numberOfOptions: 2,
		timeToAnswer: 10,
	});

	it("checks for an id field which must be a nonempty string", async () => {
		const badone = goodGame();
		delete badone.id;
		const badtwo = goodGame();
		badtwo.id = 2;
		const badthree = goodGame();
		badthree.id = "";

		await expect(validateGame(goodGame())).resolves.toBeDefined();
		await expect(validateGame(badone)).rejects.toBeDefined();
		await expect(validateGame(badtwo)).rejects.toBeDefined();
		await expect(validateGame(badthree)).rejects.toBeDefined();
	});

	it("checks for a date field", async () => {
		const badone = goodGame();
		delete badone.date;
		const badtwo = goodGame();
		badtwo.date = "lsadkj f";

		await expect(validateGame(goodGame())).resolves.toBeDefined();
		await expect(validateGame(badone)).rejects.toBeDefined();
		await expect(validateGame(badtwo)).rejects.toBeDefined();
	});

	it("checks for a prize field which must be a positive number", async () => {
		const badone = goodGame();
		delete badone.prize;
		const badtwo = goodGame();
		badtwo.prize = "sdf";
		const badthree = goodGame();
		badthree.prize = -20;

		await expect(validateGame(goodGame())).resolves.toBeDefined();
		await expect(validateGame(badone)).rejects.toBeDefined();
		await expect(validateGame(badtwo)).rejects.toBeDefined();
		await expect(validateGame(badthree)).rejects.toBeDefined();
	});

	it("checks for a questions field which must be an array of non empty strings larger than 3 and smaller than 30", async () => {
		const badone = goodGame();
		delete badone.questionIds;
		const badtwo = goodGame();
		badtwo.questionIds = ["sd"];

		await expect(validateGame(goodGame())).resolves.toBeDefined();
		await expect(validateGame(badone)).rejects.toBeDefined();
		await expect(validateGame(badtwo)).rejects.toBeDefined();
	});

	it("checks for done field which must be a boolean", async () => {
		const badone = goodGame();
		delete badone.done;
		const badtwo = goodGame();
		badtwo.done = 1;
		const badthree = goodGame();
		badthree.done = "true";

		await expect(validateGame(goodGame())).resolves.toBeDefined();
		await expect(validateGame(badone)).rejects.toBeDefined();
		await expect(validateGame(badtwo)).rejects.toBeDefined();
		await expect(validateGame(badthree)).rejects.toBeDefined();
	});

	it("searches for numberOfOptions field which must be >=2 and <=5", async () => {
		const badone = goodGame();
		delete badone.numberOfOptions;
		const badtwo = goodGame();
		badtwo.numberOfOptions = 6;
		const badthree = goodGame();
		badthree.numberOfOptions = "";

		await expect(validateGame(goodGame())).resolves.toBeDefined();
		await expect(validateGame(badone)).rejects.toBeDefined();
		await expect(validateGame(badtwo)).rejects.toBeDefined();
		await expect(validateGame(badthree)).rejects.toBeDefined();
	});

	it("checks for timeToAnswer which must be a number greater than 5 and less than 60", async () => {
		const badone = goodGame();
		delete badone.timeToAnswer;
		const badtwo = goodGame();
		badtwo.timeToAnswer = 80;
		const badthree = goodGame();
		badthree.timeToAnswer = "sdf";

		await expect(validateGame(goodGame())).resolves.toBeDefined();
		await expect(validateGame(badone)).rejects.toBeDefined();
		await expect(validateGame(badtwo)).rejects.toBeDefined();
		await expect(validateGame(badthree)).rejects.toBeDefined();
	});
});
