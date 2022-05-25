import React from "react";
import styled from "styled-components";
import { Appointment } from "../AppointmentSelect/AppointmentSelect";

const Wrapper = styled.div`
	background-color: #e7e7e7;
	display: flex;
	font-size: 20px;
	justify-content: space-between;
	padding: 24px 48px;
	box-shadow: 1px 1px 1px #b8b8b8;
	margin-bottom: 48px;
`;

interface NavigationProps {
	selectedAppointmentDetails: Appointment | null;
}

const Navigation = (NavigationDetails: NavigationProps) => {
	return (
		<Wrapper>
			<strong>
				{!!NavigationDetails.selectedAppointmentDetails
					? `Currently selected appointment: ${NavigationDetails.selectedAppointmentDetails.date} with ${NavigationDetails.selectedAppointmentDetails.brokerName}`
					: "Please select an appointment for details"}
			</strong>
			<strong>Welcome to the Lendi Team, Paulo!</strong>
		</Wrapper>
	);
};

export default Navigation;
