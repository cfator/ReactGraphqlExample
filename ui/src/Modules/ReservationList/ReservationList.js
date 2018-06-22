import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import React, { Component } from 'react'

import DateTimeDisplay from '@Components/DateTimeDisplay/DateTimeDisplay';
import Loading from '@Components/Loading/Loading';

import './ReservationList.scss';

@inject('store')
@observer

class ReservationList extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  render() {
    if (this.props.data.loading) {
      return <Loading />
    } else if (this.props.error) {
      return <div>{this.props.error}</div>
    }

    const reservations = this.props.data.reservations;

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
          {reservations && reservations.map((reservation, index) => {
            // look up hotel details
            const hotel = this.props.store.getHotel(reservation.hotelId);

            return (
              <tr key={index}>
                <td data-label="Guest">{reservation.name}</td>
                <td data-label="Hotel"><span>{hotel.name}</span></td>
                <td data-label="Arrival">
                  <DateTimeDisplay datetime={reservation.arrivalDate}/>
                </td>
                <td data-label="Departure">
                  <DateTimeDisplay datetime={reservation.departureDate}/>
                </td>
                <td className="edit">
                  <Link to={'/details/'+reservation.id}>details</Link>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
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

export default graphql(RESERVATIONS_QUERY, { options: { fetchPolicy: 'network-only' } })(ReservationList);
