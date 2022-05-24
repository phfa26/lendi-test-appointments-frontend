import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";

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

interface Appointment {
	id: number;
	brokerId: number;
	date: string;
}

interface Broker {
	id: number;
	name: string;
}

type BrokerAppointments = {
	id: Broker["id"];
	name: Broker["name"];
	appointments: Appointment[];
}[];

const AppointmentSelect = () => {
	const [loadingBrokers, setLoadingBrokers] = useState(true);
	const [brokers, setBrokers] = useState([]);

	const [loadingAppointments, setLoadingAppointments] = useState(true);
	const [appointments, setAppointments] = useState<Appointment[]>([]);

	useEffect(() => {
		const getBrokers = async () => {
			await axios.get("http://localhost:8080/brokers").then(({ data }) => {
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


	return (
		<Wrapper>
			<SideBar>
				<Heading>Amazing site</Heading>
				TODO: populate brokers
				<ul>
					{/* {brokerAppointments.map((broker) => (
            <Broker key={broker.id} broker={broker} />
          ))} */}
				</ul>
			</SideBar>
			<div>
				<Heading>Appointment details</Heading>
				TODO: get appointment details when clicking on one from the left side
			</div>
		</Wrapper>
	);
};

export default AppointmentSelect;
