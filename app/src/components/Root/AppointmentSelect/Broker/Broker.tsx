import React, { useState } from "react";
import { Appointment } from "../AppointmentSelect";
import styled from "styled-components";

export interface BrokerProps {
	broker: {
		name: string;
		id: number;
		appointments: Appointment[];
	};
	setSelectedAppointment: (a: Appointment) => any;
}

const AppointmentLine = styled.li`
	display: block;
	cursor: pointer;
`;

const Broker = (brokerDetails: BrokerProps) => {
	const [showAppointments, setShowAppointments] = useState<boolean>(true);

	const toggleShowAppointment = () => {
		setShowAppointments(!showAppointments);
	};

	return (
		<li>
			Broker: {brokerDetails.broker.name}
			<br />
			{brokerDetails.broker.appointments.length ? (
				<React.Fragment>
					appointments:
					<button onClick={toggleShowAppointment}>
						{showAppointments ? "Hide" : "Show"} appointments
					</button>
					{showAppointments ? (
						<ul>
							{brokerDetails.broker.appointments.map((appointment) => {
								return (
									<AppointmentLine
										key={appointment.id}
										onClick={() =>
											brokerDetails.setSelectedAppointment(appointment)
										}
									>
										- {appointment.date}
									</AppointmentLine>
								);
							})}
						</ul>
					) : (
						<></>
					)}
				</React.Fragment>
			) : (
				<span>No scheduled appointments</span>
			)}
		</li>
	);
};

export default Broker;
