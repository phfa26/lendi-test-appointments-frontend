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

const Heading = styled.strong.attrs({ role: "heading", level: 2 })`
	display: block;
	font-size: 20px;
`;

export interface Appointment {
	id: number;
	brokerId: number;
	date: string;
}

interface BrokerDetails {
	id: number;
	name: string;
}

interface BrokerAppointment {
	id: BrokerDetails["id"];
	name: BrokerDetails["name"];
	appointments: Appointment[];
}

type BrokerAppointments = BrokerAppointment[];

const AppointmentSelect = () => {
	const [loadingBrokers, setLoadingBrokers] = useState(true);
	const [brokers, setBrokers] = useState<BrokerDetails[]>([]);

	const [loadingAppointments, setLoadingAppointments] = useState(true);
	const [appointments, setAppointments] = useState<Appointment[]>([]);

	const [brokerAppointments, setBrokerAppointments] =
		useState<BrokerAppointments>([]);

	const [selectedAppointmentDetails, setSelectedAppointmentDetails] =
		useState<Appointment>();

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
								setSelectedAppointment={setSelectedAppointmentDetails}
							/>
						);
					})}
				</ul>
			</SideBar>
			<div>
				{selectedAppointmentDetails ? (
					<React.Fragment>
						<Heading>Appointment details</Heading>
						Appointment ID: {selectedAppointmentDetails.id}
						Date: {selectedAppointmentDetails.date}
						Broker:{" "}
						{
							brokers.find(
								(broker) => broker.id === selectedAppointmentDetails.brokerId
							)?.name
						}
					</React.Fragment>
				) : (
					<></>
				)}
			</div>
		</Wrapper>
	);
};

export default AppointmentSelect;
