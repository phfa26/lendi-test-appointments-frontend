import { screen, render } from "@testing-library/react";
import { Appointment } from "../AppointmentSelect";

import Broker from "./Broker";

const testBroker = {
	name: "bob",
	id: 1,
	appointments: [{ brokerId: 1, date: "24/11/2021", id: 1 }],
};

describe("Broker Component", () => {
	test("should hide and show appointments on button click", () => {
		render(
			<Broker
				broker={testBroker}
				setSelectedAppointment={function (a: Appointment) {
					throw new Error("Function not implemented.");
				}}
				testEnv={true}
			/>
		);

		const showAppointmentsButton = screen.getByTestId(
			"broker-show-appointments-button"
		);

		const hideAppointmentsButton = screen.getByTestId(
			"broker-hide-appointments-button"
		);
		const appointmentsList = screen.getByTestId("broker-appointments-list");
	});
});

/* 
	Sorry, but I am having a hard time figuring out how to simulate the click and change the test ID. 
	I will get back to it as soon as I have more time available.
*/
