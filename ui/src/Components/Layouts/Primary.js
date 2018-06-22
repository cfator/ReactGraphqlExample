import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Loading from '@Components/Loading/Loading';

import Create from '@Modules/ReservationDetails/CreateReservation';
import Listing from '@Modules/ReservationList/ReservationList';
import View from '@Modules/ReservationDetails/ViewReservation';

import add from '@Images/add.svg';

import './Primary.scss';

@inject('store')
@observer

export default class PrimaryLayout extends Component {
  render() {
    // blocking the app with a loading graphic until all bootstrap info is loaded
    let mainContent;
    if(this.props.store.isLoading) {
      mainContent = <Loading />
    } else {
      mainContent = <main className='app-main'>
        <Route exact path='/' component={Listing}/>
        <Route path='/create' component={Create}/>
        <Route path='/details/:id' component={View}/>
      </main>
    }

    return (
      <BrowserRouter>
        <div className="primary">
          <div className="app">
            <header className="app-header">
              <h1 className="app-title">Reservations</h1>
              <Link to='/create'>
                <img src={add} className="create-reservation-icon" alt="create new reservation"/>
              </Link>
            </header>
          </div>
          {mainContent}
        </div>
      </BrowserRouter>
    )
  }
}
