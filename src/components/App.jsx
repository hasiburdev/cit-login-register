import {Route, Routes} from 'react-router-dom'

import Register from './Register'
import Login from './Login';
import Nav from './Nav';

const appStyle = {
  background: '#A7D7C5',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}


function App() {
  return (
    
      <div className="App" style={appStyle}>
        <Routes>
          <Route path='/' element={<Nav />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        </Routes>
      </div>

    
  );
}

export default App;
