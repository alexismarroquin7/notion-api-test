
import './App.css';
import { EmployeeForm } from './widgets';

import { Routes, Route } from "react-router";
import { Home, Schedules } from './pages';
import { NewSchedule } from './pages/new/schedules';

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
          path="/new/schedule"
          element={
            <NewSchedule/>
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
