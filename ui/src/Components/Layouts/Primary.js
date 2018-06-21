import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Create from '@Modules/ReservationDetails/CreateReservation';
import Listing from '@Modules/ReservationList/ReservationList';
import View from '@Modules/ReservationDetails/ViewReservation';

import add from '@Images/add.svg';
import logo from '@Images/logo.svg';

import './Primary.scss';

export default class PrimaryLayout extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div className="primary">
          <div className="app">
            <header className="app-header">
              <img src={logo} className="app-logo" alt="logo" />
              <h1 className="app-title">Reservations</h1>
              <Link to='/create'>
                <img src={add} className="create-reservation-icon" alt="create new reservation" />
              </Link>
            </header>
          </div>
          <main className='app-main'>
            <Route exact path='/' component={Listing} />
            <Route path='/create' component={Create} />
            <Route path='/details/:id' component={View} />
          </main>
        </div>
      </BrowserRouter>
    )
  }
}
