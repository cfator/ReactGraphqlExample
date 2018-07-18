import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Marker } from 'google-maps-react';
import React, { Component } from 'react'

import DateTimeDisplay from '@Components/DateTimeDisplay/DateTimeDisplay';
import Loading from '@Components/Loading/Loading';
import Map from '@Components/Map/Map';

import ReservationQuery from './ReservationQuery';

import './ReservationDetails.scss';

@inject('store')
@observer

class ViewReservation extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  render() {
    return (
      <ReservationQuery id={this.props.match.params.id}>
        {(result) => {
          if (result.loading) {
            return <Loading />;
          } else if (result.error) {
            return <div>{result.error}</div>;
          }

          const reservation = result.reservation;

          // look up hotel details
          const hotel = this.props.store.getHotel(reservation.hotelId);

          return <div className="reservation-details">
            <div className="form">
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
              <Link to='/'>Back to All Reservations</Link>
            </div>
            <div className="map">
              <Map style={{ width: '400px', height: '400px'}} initialCenter={hotel.location} zoom={8}>
                <Marker
                  name={hotel.name}
                  position={hotel.location} />
              </Map>
            </div>
          </div>
        }}
      </ReservationQuery>
    )
  }
};

export default ViewReservation;
