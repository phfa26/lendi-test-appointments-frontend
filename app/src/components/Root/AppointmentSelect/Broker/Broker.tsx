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
	testEnv?: boolean;
}

const AppointmentLine = styled.li`
	display: block;
	cursor: pointer;
	margin: 0.2em 0;
`;

const BrokerBlock = styled.li`
	display: block;
	margin: 1em;
`;

const Line = styled.div`
	margin: 0.2em 0;
`;

const Alert = styled.span`
	font-weight: bold;
	color: red;
	white-space: nowrap;
`;

const Broker = (brokerDetails: BrokerProps) => {
	const [showAppointments, setShowAppointments] = useState<boolean>(true);

	const toggleShowAppointment = () => {
		setShowAppointments(!showAppointments);
	};

	return (
		<BrokerBlock>
			<Line>Broker: {brokerDetails.broker.name}</Line>
			{brokerDetails.broker.appointments.length ? (
				<React.Fragment>
					<Line>appointments:</Line>
					<Line>
						<button
							onClick={toggleShowAppointment}
							data-testid={`broker-${
								showAppointments ? "show" : "hide"
							}-appointments-button`}
						>
							{showAppointments ? "Hide" : "Show"} appointments
						</button>
					</Line>
					{showAppointments ? (
						<ul>
							{brokerDetails.broker.appointments.map((appointment) => {
								if (brokerDetails.broker?.name)
									appointment.brokerName = brokerDetails.broker.name;
								return (
									<AppointmentLine
										key={appointment.id}
										onClick={
											!brokerDetails.testEnv
												? () =>
														brokerDetails.setSelectedAppointment(appointment)
												: toggleShowAppointment
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
				<Alert>No scheduled appointments</Alert>
			)}
		</BrokerBlock>
	);
};

export default Broker;
