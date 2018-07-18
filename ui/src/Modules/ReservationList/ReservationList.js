import { Link } from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import React, { Component } from 'react'

import DateTimeDisplay from '@Components/DateTimeDisplay/DateTimeDisplay';
import Loading from '@Components/Loading/Loading';

import ReservationsQuery from './ReservationsQuery';

import './ReservationList.scss';

@inject('store')
@observer

class ReservationList extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  render() {
    return (
      <ReservationsQuery>
        {(result) => {
          if (result.loading) {
            return <Loading />;
          } else if (result.error) {
            return <div>{result.error}</div>;
          }

          const reservations = result.reservations || [];

          return <div className="reservation-list">
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
              {reservations.map((reservation, index) => {
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
        }}
      </ReservationsQuery>
    )
  }
};

export default ReservationList;
