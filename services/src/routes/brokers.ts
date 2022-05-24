import { Router } from "express";

const brokers = [
	{ id: 1, name: "Cam" },
	{ id: 2, name: "Jam" },
	{ id: 3, name: "Sam" },
	{ id: 4, name: "Ham" },
];

const router = Router();

router.get("/", (req, res) => {
	const sortedBrokers = brokers.sort((a, b) => {
		return a.id - b.id;
	});
	res.send(sortedBrokers);
});

export default router;
