import React from "react";
import { Appointment } from "../AppointmentSelect";

export interface BrokerProps {
	broker: {
		name: string;
		id: number;
		appointments: Appointment[];
	};
}

const Broker = (broker: BrokerProps) => {
  return (
    <li>
      [broker name]
      <br />
      appointments:
      <button>Hide appointments</button>
      <ul>
        <li>[appointment date]</li>
      </ul>
    </li>
  );
};

export default Broker;
