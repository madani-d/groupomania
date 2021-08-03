import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Signin from './Containers/Signin/Signin';
import Login from './Containers/Login/Login';
import Profile from './Containers/Profile/Profile';
import Home from './Containers/Home/Home';
import ChatRoom from './Containers/ChatRoom/ChatRoom';
import { useSelector, useDispatch } from 'react-redux';
import { restoreConnection } from './redux/connectedReducer/connectedReducer';
import ReportPage from './Containers/ReportPage/ReportPage';

export default function App() {
  
  const connected = useSelector(state => state.connectedReducer.connected)

  const dispatch = useDispatch()

  // If token in localstorage try reconnection
  if (!connected && localStorage.storageToken) {
    dispatch(restoreConnection())
  }

  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/login'/>
          </Route>
          <Route path='/signin' exact component={Signin} />
          <Route path='/login' exact component={Login} />
          {connected &&
            <>
              <Route path='/home' exact component={Home} />
              <Route path='/chat' exact component={ChatRoom}/>
              <Route path='/profile/:slug' exact component={Profile} />
              <Route path='/ReportPage' exact component={ReportPage}/>
            </>
          }
        </Switch>
      </Router>
    </>
  )
}

