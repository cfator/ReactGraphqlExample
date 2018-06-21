import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import React from 'react';

import DateTimeDisplay from '@Components/DateTimeDisplay/DateTimeDisplay';

import './ReservationList.scss';

const ReservationList = (props) => {
	if (props.data.loading) {
		return <div>Loading</div>
	} else if(props.error) {
		return <div>{props.error}</div>
	}

	return (
		<div className="reservation-list">
			<table className="responsive-card-table">
				<thead>
				<tr>
					<th>Guest</th>
					<th>Hotel</th>
					<th>Arrival</th>
					<th>Departure</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				{props.data.reservations && props.data.reservations.map((item, index) => {
					return (
						<tr key={index}>
							<td data-label="Guest">{item.name}</td>
							<td data-label="Hotel"><span>{item.hotelName}</span></td>
							<td data-label="Arrival">
								<DateTimeDisplay datetime={item.arrivalDate} />
							</td>
							<td data-label="Departure">
								<DateTimeDisplay datetime={item.departureDate} />
							</td>
							<td className="edit">
								<Link to={'/details/'+item.id}>details</Link>
							</td>
						</tr>
					)
				})}
				</tbody>
			</table>
		</div>
	)
};

const RESERVATIONS_QUERY = gql`
  query ItemsQuery {
    reservations {
			id
			name
			hotelId
			arrivalDate
			departureDate
    }
  }
`;

export default graphql(RESERVATIONS_QUERY)(ReservationList);
