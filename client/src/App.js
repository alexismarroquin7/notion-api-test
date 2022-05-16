
import './App.css';
import { EmployeeForm } from './widgets';

import { Routes, Route } from "react-router";
import { Home, Schedules } from './pages';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route
          path="/new/employee"
          element={
            <EmployeeForm/>
          }
        />
        <Route
          path="/schedules"
          element={
            <Schedules/>
          }
        />
      </Routes>
    </div>
  );

}

export default App;
