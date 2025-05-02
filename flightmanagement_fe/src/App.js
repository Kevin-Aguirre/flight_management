import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Flights from "./components/Flights"

import CustomerRegister from './customer/CustomerRegister';
import CustomerLogin from './customer/CustomerLogin'
import MyFlights from './customer/MyFlights'

import Home from './components/Home';

import StaffRegister from './staff/StaffRegister';
import StaffLogin from './staff/StaffLogin'
import CreateFlight from "./staff/CreateFlight"
import AddPlane from "./staff/AddPlane"
import AddAirport from "./staff/AddAirport"
import ViewReports from './staff/ViewReports';

function App() {  
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("data");
    return data ? JSON.parse(data) : null;
  })

  return (
    <BrowserRouter>
      <Navbar 
        user={user}
        setUser={setUser}
      />
      <Routes>
          <Route 
            path="/customer-login" 
            element={
              <CustomerLogin 
                user={user}
                setUser={setUser}
              />
            } 
          />
          <Route 
            path="/staff-login" 
            element={
              <StaffLogin 
                user={user}
                setUser={setUser}
              />
            } 
          />
          <Route 
            path="/customer-register" 
            element={
              <CustomerRegister 
                user={user}
                setUser={setUser}
              />
            } 
          />
          <Route 
            path="/staff-register" 
            element={
              <StaffRegister 
                user={user}
                setUser={setUser}
              />
            } 
          />
          <Route 
            path="/flights" 
            element={
              <Flights 
                user={user}
                setUser={setUser}
              />
            } 
          />
          <Route 
            path="/my-flights" 
            element={
              <MyFlights 
                user={user}
                setUser={setUser}
              />
            } 
          />
          <Route 
            path="/create-flight" 
            element={
              <CreateFlight
                user={user}
                setUser={setUser}
              />
            } 
          />
          <Route 
            path="/add-plane" 
            element={
              <AddPlane 
                user={user}
                setUser={setUser}
              />
            } 
          />
          <Route 
            path="/add-airport" 
            element={
              <AddAirport 
                user={user}
                setUser={setUser}
              />
            } 
          />
          <Route 
            path="/view-reports" 
            element={
              <ViewReports 
                user={user}
                setUser={setUser}
              />
            } 
          />
          <Route 
            path="/" 
            element={
              <Home 
                user={user}
                setUser={setUser}
              />
            } 
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
