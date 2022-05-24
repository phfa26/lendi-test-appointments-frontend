import { Router } from "express";

const appointments = [
	{ id: 1, brokerId: 1, date: "15/10/2021" },
	{ id: 2, brokerId: 3, date: "22/11/2021" },
	{ id: 3, brokerId: 3, date: "23/11/2021" },
	{ id: 4, brokerId: 4, date: "10/5/2021" },
	{ id: 5, brokerId: 3, date: "10/5/2022" },
];

const router = Router();

export default router;

router.get("/", (req, res) => {
	const sortedAppointments = appointments.sort((a, b) => {
		const [dayA, monthA, yearA] = a.date.split("/");
		const [dayB, monthB, yearB] = b.date.split("/");
		const dateA = new Date(Number(yearA), Number(monthA) - 1, Number(dayA));
		const dateB = new Date(Number(yearB), Number(monthB) - 1, Number(dayB));
		return dateB.valueOf() - dateA.valueOf();
	});

	res.send(sortedAppointments);
});
