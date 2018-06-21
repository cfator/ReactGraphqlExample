import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import React from 'react';

import DateTimeDisplay from '@Components/DateTimeDisplay/DateTimeDisplay';

import './ReservationDetails.scss';

const ViewReservation = (props) => {
		if (props.data.loading) {
			return <div>Loading</div>
		} else if(props.error) {
			return <div>{props.error}</div>
		}

		return <div className="reservation-details">
			<div className="input-group">
				<label className="input-group-label">Guest</label>
				<div className="value">{props.data.reservation.name}</div>
			</div>
			<div className="input-group">
				<label className="input-group-label">Hotel</label>
				<div className="value">{props.data.reservation.hotelName}</div>
			</div>
			<div className="input-group">
				<label className="input-group-label">Arrival</label>
				<DateTimeDisplay datetime={props.data.reservation.arrivalDate} />
			</div>
			<div className="input-group">
				<label className="input-group-label">Departure</label>
				<DateTimeDisplay datetime={props.data.reservation.departureDate} />
			</div>
			<Link to='/'>All Reservations</Link>
		</div>
};

const ITEM_QUERY = gql`
  query ItemQuery($id: ID!) {
    reservation(id: $id) {
			id
			name
			hotelId
			arrivalDate
			departureDate
    }
  }
`;

export default graphql(ITEM_QUERY, {
	// url param match will have an id property for the specific reservation
	options: (props) => ({ variables: props.match.params })
})(ViewReservation);
