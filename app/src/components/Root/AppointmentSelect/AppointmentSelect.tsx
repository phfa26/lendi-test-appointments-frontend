import axios from "axios";
import styled from "styled-components";
import React, { useState, useEffect } from "react";

import Broker from "./Broker";

const Wrapper = styled.div`
	display: flex;
`;

const SideBar = styled.div`
	width: 250px;
`;

const AppointmentDetailsContainer = styled.div`
	margin-left: 3em;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 2 })`
	display: block;
	font-size: 20px;
`;

const AppointmentLine = styled.div`
	display: block;
	margin: 0.2em 0;
`;

type BrokerAppointments = BrokerAppointment[];

interface BrokerDetails {
	id: number;
	name: string;
}

interface BrokerAppointment {
	id: BrokerDetails["id"];
	name: BrokerDetails["name"];
	appointments: Appointment[];
}

export interface Appointment {
	id: number;
	brokerId: number;
	date: string;
	brokerName?: string;
}

interface AppointmentSelectProps {
	selectedAppointmentDetails: Appointment | null;
	setSelectedAppointmentDetails: (a: Appointment | null) => void;
}

const AppointmentSelect = (
	appointmentSelectDetails: AppointmentSelectProps
) => {
	const [loadingBrokers, setLoadingBrokers] = useState(true);
	const [brokers, setBrokers] = useState<BrokerDetails[]>([]);

	const [loadingAppointments, setLoadingAppointments] = useState(true);
	const [appointments, setAppointments] = useState<Appointment[]>([]);

	const [brokerAppointments, setBrokerAppointments] =
		useState<BrokerAppointments>([]);

	useEffect(() => {
		const getBrokers = async () => {
			await axios
				.get<BrokerDetails[]>("http://localhost:8080/brokers")
				.then(({ data }) => {
					setBrokers(data);
					setLoadingBrokers(false);
				});
		};
		if (loadingBrokers) {
			getBrokers();
		}
	}, [loadingBrokers]);

	useEffect(() => {
		const getAppointments = async () => {
			await axios
				.get<Appointment[]>("http://localhost:8080/appointments")
				.then(({ data }) => {
					setAppointments(data);
					setLoadingAppointments(false);
				});
		};
		if (loadingAppointments) {
			getAppointments();
		}
	}, [loadingAppointments]);

	useEffect(() => {
		let loadedBrokerAppointments: BrokerAppointment[] = [];
		if (brokers.length && appointments.length) {
			brokers.forEach((broker) => {
				let brokerAppointment: BrokerAppointment = {
					id: broker.id,
					name: broker.name,
					appointments: appointments.filter(
						(appointment) => appointment.brokerId === broker.id
					),
				};
				loadedBrokerAppointments.push(brokerAppointment);
			});
			setBrokerAppointments([...loadedBrokerAppointments]);
		}
	}, [brokers, appointments]);

	return (
		<Wrapper>
			<SideBar>
				<Heading>Amazing site</Heading>
				<ul>
					{brokerAppointments.map((broker) => {
						return (
							<Broker
								key={broker.id}
								broker={broker}
								setSelectedAppointment={
									appointmentSelectDetails.setSelectedAppointmentDetails
								}
							/>
						);
					})}
				</ul>
			</SideBar>
			<AppointmentDetailsContainer>
				{appointmentSelectDetails.selectedAppointmentDetails ? (
					<React.Fragment>
						<Heading>Appointment details</Heading>
						<AppointmentLine>
							{" "}
							Appointment ID:{" "}
							{appointmentSelectDetails.selectedAppointmentDetails.id}
						</AppointmentLine>
						<AppointmentLine>
							{" "}
							Date: {appointmentSelectDetails.selectedAppointmentDetails.date}
						</AppointmentLine>
						<AppointmentLine>
							{" "}
							Broker:{" "}
							{
								brokers.find(
									(broker) =>
										broker.id ===
										appointmentSelectDetails.selectedAppointmentDetails
											?.brokerId
								)?.name
							}
						</AppointmentLine>
						<AppointmentLine>
							<button
								onClick={() =>
									appointmentSelectDetails.setSelectedAppointmentDetails(null)
								}
							>
								Close
							</button>
						</AppointmentLine>
					</React.Fragment>
				) : (
					<Heading>Select an appointment for details</Heading>
				)}
			</AppointmentDetailsContainer>
		</Wrapper>
	);
};

export default AppointmentSelect;
