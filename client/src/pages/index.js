
import { useNavigate } from "react-router"
import { EmployeeList } from "../widgets"

export * from "./schedules";

export const Home = () => {
  const navigate = useNavigate();
  
  return <div>
    <button 
      onClick={() => {
        navigate(`/new/employee`);
      }}
    >New</button>
    <EmployeeList/>
  </div>
}