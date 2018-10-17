import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'

import Admin from './admin'
import Common from './common'
import Login from './pages/login'
import Home from './pages/home'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notifications from './pages/ui/notification'
import Tabs from './pages/ui/tabs'
import Messages from './pages/ui/messages'
import Gallery from './pages/ui/gallery'

import FormLogin from './pages/form/formLogin'
import FormRegister from './pages/form/formRegister'

import BaseTables from './pages/table/baseTables'
import HighTables from './pages/table/highTables'

import City from './pages/city'

import Order from './pages/order'
import OrderDetail from './pages/order/detail'

import User from './pages/user'

import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages//echarts/line'

import Rich from './pages/rich'

import Role from './pages/role'
import NoMatch from './pages/noMatch'

class MyRouter extends Component {
  requireAuth = () => {
    if ( localStorage.getItem("retData") == 'data.retData') { // 未登录
      return <Redirect to="/home" />
    } else {
      return <Redirect to="/login" />;
    }
  }
  render() {
    return (
      <HashRouter>
      	<App>
          <Switch>
        		<Route path='/login' component={Login}></Route>
            <Route path='/common' render={() => 
              <Common>
                <Route path='/common/order/detail/:id' component={OrderDetail}></Route>
              </Common>
            } />

        		<Route path='/' render={() => 
        			<Admin>
                <Switch>
                  
                  <Route path='/home'  component={Home}></Route>
          				<Route path='/ui/buttons' component={Buttons}></Route>
                  <Route path='/ui/modals' component={Modals}></Route>
                  <Route path='/ui/loadings' component={Loadings}></Route>
                  <Route path='/ui/notification' component={Notifications}></Route>
                  <Route path='/ui/messages' component={Messages}></Route>
                  <Route path='/ui/tabs' component={Tabs}></Route>
                  <Route path='/ui/gallery' component={Gallery}></Route>
                  <Route path='/form/formLogin' component={FormLogin}></Route>
                  <Route path='/form/register' component={FormRegister}></Route>
                  
                  <Route path='/table/baseTables' component={BaseTables}></Route>
                  <Route path='/table/highTables' component={HighTables}></Route>
                  <Route path='/city' component={City}></Route>
                  <Route path='/order' component={Order}></Route>
                  
                  <Route path='/user' component={User}></Route>

                  <Route path='/echarts/bar' component={Bar}></Route>
                  <Route path='/echarts/pie' component={Pie}></Route>
                  <Route path='/echarts/line' component={Line}></Route>
                  
                  <Route path='/rich' component={Rich}></Route>
                  <Route path='/role' component={Role}></Route>
                  <Redirect to='/home' />
                  <Route component={NoMatch}></Route>
                </Switch>
        			</Admin>
        		} />
            
            
            
          </Switch>
      	</App>
      </HashRouter>
    );
  }
}

export default MyRouter;
