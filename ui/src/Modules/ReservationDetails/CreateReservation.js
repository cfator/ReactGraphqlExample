import Datetime from 'react-datetime';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react'

import HotelSelect from '@Components/HotelSelect/HotelSelect';

import 'react-datetime/css/react-datetime.css';
import './ReservationDetails.scss';

const CreateReservation = class CreateReservation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      hotelId: '',
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

    this.props.createReservation(this.state.name, this.state.hotelName, this.state.arrivalDate, this.state.departureDate)
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
    if (this.props.error) {
      return <div>{this.props.error}</div>
    }

    return <div className="reservation-details">
      <div>
        {this.state.message !== undefined &&
        <div className="save-message">{this.state.message}</div>
        }
        {this.state.message === undefined &&
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <label className="input-group-label" htmlFor="name">Guest Name</label>
            <input type="text" value={this.state.name} onChange={this.handleChange} placeholder="Enter Guest Name"
                   name="name"/>
          </div>
          <div className="input-group">
            <label className="input-group-label" htmlFor="hotelName">Hotel</label>
            <HotelSelect name="hotelName" value={this.state.hotelName} onChange={this.handleChange}/>
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
      </div>
      <Link to='/'>All Reservations</Link>
    </div>
  }
};

const RESERVATION_CREATE = gql`
  mutation ItemCreate($name: String!, $hotelId: ID!, $arrivalDate: String!, $departureDate: String!) {
    createReservation(name: $name, hotelId: $hotelId, arrivalDate: $arrivalDate, departureDate: $departureDate)
  }
`;

export default graphql(RESERVATION_CREATE, {
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
})(CreateReservation);
