import styled from "styled-components"
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils";

const initialValues = {
  employee: {
    id: ''
  },
  date: {
    start: {
      date: '',
      hr: '0',
      min: '0',
      timeOfDay: ''
    },
    end: {
      date: '',
      hr: '0',
      min: '0',
      timeOfDay: ''
    }
  },
}

const StyledScheduleForm = styled.form`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  width: 100%;

  
  .StyledScheduleForm__Container {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    gap: 1rem;
  }
  
  .StyledScheduleForm__Container__Row {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    width: 50%
  }
`;

const initialOptions = {
  employees: [],
  timeOfDay: [
    {
      name: '--select--',
      value: '',
    },
    {
      name: 'AM',
      value: 'AM'
    },
    {
      name: 'PM',
      value: 'PM'
    }
  ]
}

export const ScheduleForm = ({props}) => {
  const [values, setValues] = useState(initialValues);
  const [options, setOptions] = useState(initialOptions);
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosInstance().get('/employees');
        

        setOptions(o => {
          return {
            ...o,
            employees: [
              {
                id: 0,
                name: '--select--'
              },
              ...res.data.results.map(emp => {
                return {
                  name: emp.properties.Name.title[0].text.content,
                  id: emp.id
                }
              })
            ]
          }
        });

      } catch (err) {
        console.log(err);
      }
    }

    if(values.date.start.date === ''){
      const date = new Date();
      const year = date.getFullYear();
      const currdate = date.getDate();
      const month = date.getMonth() + 1;

      setValues(v => {
        return {
          ...v,
          date: {
            ...v.date,
            start: {
              ...v.date.start,
              date: `${year}-${month < 10 ? '0' : ''}${month}-${currdate < 10 ? '0' : ''}${currdate}`
            }
          }
        }
      });
    }
    
    if(values.date.end.date === ''){
      const date = new Date();
      const year = date.getFullYear();
      const currdate = date.getDate();
      const month = date.getMonth() + 1;

      setValues(v => {
        return {
          ...v,
          date: {
            ...v.date,
            end: {
              ...v.date.end,
              date: `${year}-${month < 10 ? '0' : ''}${month}-${currdate < 10 ? '0' : ''}${currdate}`
            }
          }
        }
      });
    }
    
    fetchEmployees();
  }, []);

  const handleChange = e => {
    const {name, value} = e.target;
    if(name === 'employee'){
      setValues({
        ...values,
        employee: {
          id: value
        }
      });
    } else if (name === 'startDate'){
      setValues({
        ...values,
        date: {
          ...values.date,
          start: {
            ...values.date.start,
            date: value
          },
          end: {
            ...values.date.end,
            date: value
          }
        }
      });
    } else if (name === 'endDate'){
      setValues({
        ...values,
        date: {
          ...values.date,
          end: {
            ...values.date.end,
            date: value
          }
        }
      });

    } else if (name === 'startDateHr'){
      setValues({
        ...values,
        date: {
          ...values.date,
          start: {
            ...values.date.start,
            hr: value
          }
        }
      });

    } else if (name === 'endDateHr'){
      setValues({
        ...values,
        date: {
          ...values.date,
          end: {
            ...values.date.end,
            hr: value
          }
        }
      });
    
    } else if (name === 'startDateMin'){
      setValues({
        ...values,
        date: {
          ...values.date,
          start: {
            ...values.date.start,
            min: value
          }
        }
      });

    } else if (name === 'endDateMin'){
      setValues({
        ...values,
        date: {
          ...values.date,
          end: {
            ...values.date.end,
            min: value
          }
        }
      });
    } else if (name === 'startDateTimeOfDay'){
      setValues({
        ...values,
        date: {
          ...values.date,
          start: {
            ...values.date.start,
            timeOfDay: value
          }
        }
      });
    } else if (name === 'endDateTimeOfDay'){
      setValues({
        ...values,
        date: {
          ...values.date,
          end: {
            ...values.date.end,
            timeOfDay: value
          }
        }
      });

    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const createSchedule = async () => {
      try {
        const res = await axiosInstance()
        .post(
          '/schedules',
          {
            employee_id: values.employee.id,
            date: {
              start: `${values.date.start.date}T${values.date.start.timeOfDay === 'PM' ? `${Number(values.date.start.hr) + 12}` : `${values.date.start.hr}`}:${Number(values.date.start.min) < 10 ? `0${values.date.start.min}` : `${values.date.start.min}`}:00.000Z`, // 2011-10-05T14:48:00.000Z format
              end: `${values.date.end.date}T${values.date.end.timeOfDay === 'PM' ? `${Number(values.date.end.hr) + 12}` : `${values.date.end.hr}`}:${Number(values.date.end.min) < 10 ? `0${values.date.end.min}` : `${values.date.end.min}`}:00.000Z`, // 2011-10-05T14:48:00.000Z format
              // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
              time_zone: 'America/Los_Angeles'
            }
          }
        );
        console.log(res);

      } catch (err) {
        console.log(err.response.data);
      }

    }
    
    createSchedule();

  }
  
  return <StyledScheduleForm 
    {...props} 
    onSubmit={handleSubmit}
  >
    <div className="StyledScheduleForm__Container">
  
      <div className="StyledScheduleForm__Container__Row">
        <label>Employee</label>
        <select 
          name="employee"
          value={values.employee.id}
          onChange={handleChange}
        >
          {options.employees.map(emp => {
            return <option key={emp.id} value={emp.id}>{emp.name}</option>
          })}
        </select>
      </div>

      <div className="StyledScheduleForm__Container__Row">
        <label>Start</label>
        <input 
          type="date"
          name="startDate"
          value={values.date.start.date}
          onChange={handleChange}
        />
      </div>
      
      <div className="StyledScheduleForm__Container__Row">
        <label>Hour</label>
        <input 
          type="number" 
          name="startDateHr"
          value={values.date.start.hr} 
          onChange={handleChange}
        />
      </div>
      
      <div className="StyledScheduleForm__Container__Row">
        <label>Min</label>
        <input 
          type="number" 
          name="startDateMin"
          value={values.date.start.min} 
          onChange={handleChange}
        />
      </div>

      <div className="StyledScheduleForm__Container__Row">
        <label>Time Of Day</label>
        <select
          name="startDateTimeOfDay"
          value={values.date.start.timeOfDay}
          onChange={handleChange}
        >
          {options.timeOfDay.map(item => {
            return <option key={item.name}>
              {item.name}
            </option>
          })}
        </select>
      </div>
      
      <div className="StyledScheduleForm__Container__Row">    
        <label>End</label>
        <input 
          type="date"
          name="endDate"
          value={values.date.end.date}
          onChange={handleChange}
          min={values.date.start.date}
        />
      </div>

      <div className="StyledScheduleForm__Container__Row">
        <label>Hour</label>
        <input 
          type="number" 
          name="endDateHr"
          value={values.date.end.hr} 
          onChange={handleChange}
        />
      </div>
      
      <div className="StyledScheduleForm__Container__Row">
        <label>Min</label>
        <input 
          type="number" 
          name="endDateMin"
          value={values.date.end.min} 
          onChange={handleChange}
        />
      </div>
      

      <div className="StyledScheduleForm__Container__Row">
        <label>Time Of Day</label>
        <select
          name="endDateTimeOfDay"
          value={values.date.end.timeOfDay}
          onChange={handleChange}
        >
          {options.timeOfDay.map(item => {
            return <option key={item.name}>
              {item.name}
            </option>
          })}
        </select>
      </div>
      
      <div>
        <button>Cancel</button>
        <button>Submit</button>
      </div>
    
    </div>

  </StyledScheduleForm>
}