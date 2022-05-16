import { useEffect, useState } from "react"
import { axiosInstance } from "../../utils"

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() =>{
    const fetchData = async () => {
      const res = await axiosInstance().get('/employees');
      setEmployees(res.data.results);
    }
    fetchData();
  }, [])


  return <div>
    {employees.length > 0 && 
      employees.map(employee => {
        const { properties } = employee;
        return <div
          key={employee.id}
          style={{border: "1px solid black"}}
          onClick={() => {
            console.log(employee.id)
          }}
        >
          <p>Name: {properties.Name.title[0].text.content}</p>
          <p>Phone: {properties['Phone Number'].phone_number}</p>
        </div>
      })
    }
  </div>
}