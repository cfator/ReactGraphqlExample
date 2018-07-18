import Datetime from 'react-datetime';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Marker } from 'google-maps-react';
import React, { Component } from 'react';

import HotelSelect from '@Components/HotelSelect/HotelSelect';
import Map from '@Components/Map/Map';

import CreateReservationMutation from './CreateReservationMutation';

import 'react-datetime/css/react-datetime.css';
import './ReservationDetails.scss';

class CreateReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      hotelId: '',
      hotelName: '',
      hotelLocation: undefined,
      arrivalDate: undefined,
      departureDate: undefined,
      message: undefined
    };
  }

  handleChange = (e) => {
    let stateChange = {};
    stateChange[e.target.name] = e.target.value;
    this.setState(stateChange);
  };

  handleHotelChange = (hotel) => {
    this.setState({
      hotelName: hotel.name,
      hotelId: hotel.id,
      hotelLocation: hotel.location
    });
  };

  handleDateChange = (which, moment) => {
    if (which === 'arrival') {
      this.setState({
        arrivalDate: moment
      });
    } else {
      this.setState({
        departureDate: moment
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // simple validation
    if (this.state.name === '' || this.state.hotelName === '' || !this.state.arrivalDate || !this.state.departureDate) {
      window.alert('One ore more require fields are empty.');
      return;
    }

    this.props.createReservation(this.state.name, this.state.hotelId, this.state.arrivalDate, this.state.departureDate)
      .then(this.handleSaveSucess)
      .catch(this.handleSaveFailure);
  };

  handleSaveSucess = (props) => {
    this.setState({message: 'Your reservation was save successfully.'});
  };

  handleSaveFailure = (props) => {
    this.setState({message: 'We were unable to save your reservation.'});
  };

  render() {
    return (
      <CreateReservationMutation>
        {(execute) => {
          return (<div className="reservation-details">
            <div className="form">
              {this.state.message !== undefined &&
                <div className="save-message">{this.state.message}</div>
              }
              {this.state.message === undefined &&
                <form onSubmit={() => execute(this.state.name, this.state.hotelId, this.state.arrivalDate, this.state.departureDate)}>
                  <div className="input-group">
                    <label className="input-group-label" htmlFor="name">Guest Name</label>
                    <input type="text" value={this.state.name} onChange={this.handleChange} placeholder="Enter Guest Name"
                           name="name"/>
                  </div>
                  <div className="input-group">
                    <label className="input-group-label" htmlFor="hotelName">Hotel</label>
                    <HotelSelect name="hotelName" value={this.state.hotelName} onChange={this.handleHotelChange}/>
                  </div>
                  <div className="input-group">
                    <label className="input-group-label">Arrival</label>
                    <Datetime selected={this.state.arrivalDate} onChange={this.handleDateChange.bind(this, 'arrival')}
                              closeOnSelect={true}/>
                  </div>
                  <div className="input-group">
                    <label className="input-group-label">Departure</label>
                    <Datetime selected={this.state.departurelDate} onChange={this.handleDateChange.bind(this, 'departure')}
                              closeOnSelect={true}/>
                  </div>
                  <div className="input-group">
                    <button type="submit">Submit</button>
                  </div>
                </form>
              }
              <Link to='/'>Back to All Reservations</Link>
            </div>
            <div className="map">
              {this.state.hotelLocation &&
                <Map style={{ width: '400px', height: '400px'}} initialCenter={this.state.hotelLocation} center={this.state.hotelLocation} zoom={8}>
                  <Marker
                    name={this.state.hotelName}
                    position={this.state.hotelLocation}/>
                </Map>
              }
            </div>
          </div>
          )
        }}
      </CreateReservationMutation>
    )
  }
}

export default CreateReservation;

/*graphql(RESERVATION_CREATE, {
  props: ({ ownProps, mutate }) => ({
    createReservation: (name, hotelId, arrivalDate, departureDate) => {
      let updateData = {
        __typename: 'Reservation',
        name: name,
        hotelId: hotelId,
        arrivalDate: arrivalDate,
        departureDate: departureDate
      };
      return mutate({
        variables: {name, hotelId, arrivalDate, departureDate},
        update: ((newReservation, cache, data) => {
          cache.writeData({data: newReservation});
        }).bind(this, updateData)
      })
    }
  })
})(CreateReservation);*/
