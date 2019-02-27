import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import CreateIntervalPage from '../components/CreateIntervalPage'
import DashBoardPage from '../components/DashboardPage'
import LoginPage from '../components/LoginPage'
import NotFoundPage from '../components/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import EditIntervalPage from '../components/EditIntervalPage'
import StartIntervalPage from '../components/StartIntervalPage'

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path='/' component={LoginPage} exact />
        <PrivateRoute path='/dashboard' component={DashBoardPage} exact />
        <PrivateRoute path='/create' component={CreateIntervalPage} exact />
        <PrivateRoute path='/edit/:id' component={EditIntervalPage} />
        <PrivateRoute path='/start/:id' component={StartIntervalPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter 