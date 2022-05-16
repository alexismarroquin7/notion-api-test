import { useState } from "react"
import { axiosInstance } from "../../utils";

const initialValues = {
  name: '',
  phoneNumber: ''
}

export const EmployeeForm = () => {
  const [values, setValues ] = useState(initialValues);
  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axiosInstance()
    .post('/employees', values);
    console.log(res);
  }

  return <form
    onSubmit={handleSubmit}
  >
    <p>employee form</p>
    
    <input
      type="text"
      placeholder="Name"
      name="name"
      value={values.name}
      onChange={handleChange}
    />
    
    <input
      type="text"
      placeholder="Phone"
      name="phoneNumber"
      value={values.phoneNumber}
      onChange={handleChange}
    />
    
    
    <div>
      <button>Cancel</button>
      <button>Submit</button>
    </div>
  
  </form>
}