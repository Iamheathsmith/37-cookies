import React from 'react';
import Content from './content';
import Landing from './landing';
import {Provider} from 'react-redux';
// import Navbar from '../component/navbar/index';
import Settings from '../component/settings/index';
import createStore from '../lib/app-create-store';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

const store = createStore();

export default class App extends React.Component {
  componentWillMount() {
    if(localStorage.token)
      store.dispatch({type: 'TOKEN_SET', payload: localStorage.token});
  }


  render() {
    let {token} = store.getState();
    return (
      <main className="application">
        <Provider store={store}>
          <BrowserRouter>
            <React.Fragment>
              {/* <Navbar token={token} /> */}
              <Route exact path="/welcome/:auth" component={Landing}/>
              <Route exact path="/settings" component={Settings}/>
              <Route exact path="/content" component={() =>
                token
                  ? <Content token={token}/>
                  : <Redirect to="/welcome/signup"/>}
              />
            </React.Fragment>
          </BrowserRouter>
        </Provider>
      </main>
    );
  }
}
