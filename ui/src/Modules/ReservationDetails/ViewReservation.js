import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import React, { Component } from 'react'

import DateTimeDisplay from '@Components/DateTimeDisplay/DateTimeDisplay';

import './ReservationDetails.scss';

@inject('store')
@observer

class ViewReservation extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>
    } else if (this.props.error) {
      return <div>{this.props.error}</div>
    }

    const reservation = this.props.data.reservation;

    // look up hotel details
    const hotel = this.props.store.getHotel(reservation.hotelId);

    return <div className="reservation-details">
      <div className="input-group">
        <label className="input-group-label">Guest</label>
        <div className="value">{reservation.name}</div>
      </div>
      <div className="input-group">
        <label className="input-group-label">Hotel</label>
        <div className="value">{hotel.name}</div>
      </div>
      <div className="input-group">
        <label className="input-group-label">Arrival</label>
        <DateTimeDisplay datetime={reservation.arrivalDate}/>
      </div>
      <div className="input-group">
        <label className="input-group-label">Departure</label>
        <DateTimeDisplay datetime={reservation.departureDate}/>
      </div>
      <Link to='/'>All Reservations</Link>
    </div>
  }
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
  options: (props) => ({variables: props.match.params})
})(ViewReservation);
