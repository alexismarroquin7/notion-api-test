
function formatDate (timestamp) {
  const date = new Date(timestamp);
  
  const d = date.getDate();
  const day = date.getDay();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const hr = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  function asString ({
    clock = '24hr',
    fullYear = false,
    monthAsString = false,
    includeDay = false,
    includeSeconds = false,
  }){      
    let customString = '';
    
    if(includeDay){
      customString += `${days[day]} `;
    }
    
    if(monthAsString){
      const months = [
        '',
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ];
      customString += `${months[month]} `;
      customString += `${d < 10 ? '0' : ''}${d}, `;
      
    } else {
      customString += `${month < 10 ? '0' : ''}${month}-`
      customString += `${d < 10 ? '0' : ''}${d}-`;

    }
    
    
    if(fullYear) {
      customString += `${year} `
    } else {
      customString += `${`${year}`.slice(2)} `;
    }

    if(clock === '24hr') {

      customString += `${hr < 10 ? '0' : ''}${hr}:${min  < 10 ? '0' : ''}${min}`;
      
      if(includeSeconds) {
        const secToUse = `${sec < 10 ? '0' : ''}${sec} `
        customString += `:${secToUse} `;  
      }
    
    } else if(clock === '12hr') {
      
      if(hr === 0){
        customString += `12:`
      } else if((hr - 12) < 10){
        customString += `0${hr - 12}:`
      }

      const minToUse = `${min < 10 ? '0' : ''}${min}`
      
      customString += `${minToUse}`;
      
      if(includeSeconds) {
        const secToUse = `${sec < 10 ? '0' : ''}${sec} `
        customString += `:${secToUse} `;  
      }

      customString += `${hr < 12 ? 'AM' : 'PM'}`;
      
    }

    return customString;
  }

  return {
    date: d,
    day: days[day],
    month,
    year,
    hr,
    min,
    sec,
    asString 
  }
}


export const ScheduleList = ({schedules, archiveSchedule}) => {
  
  return (
    <div
      style={{
        display: "flex",
        flexFlow: 'column wrap',
        alignItems: "center",
        gap: "1rem"
      }}
    >
      {schedules.map(schedule => {
        const { properties: prop } = schedule;
        
        const [ employee ] = prop.Employee.relation;
        
        const startDate = formatDate(prop.Date.date.start);
        const endDate = formatDate(prop.Date.date.end);

        return (
          <div
            key={schedule.id} 
            style={{
              width: "90%",
              display: "flex",
              flexFlow: 'column wrap',
              border: "1px solid black",
              borderRadius: "35px"
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexFlow: 'row wrap',
                justifyContent: "flex-end"
              }}
            >
              <button
                onClick={() => {
                  archiveSchedule(schedule.id);
                }}
              >x</button>
            </div>
            <p>
              {employee.properties.Name.title[0].text.content}
            </p>

            <p>
              start: {startDate.asString({
                clock: '12hr',
                fullYear: true,
                monthAsString: false,
                includeDay: true,
                includeSeconds: false
              })}
            </p>
            <p>
              end: {endDate.asString({
                clock: '12hr',
                fullYear: true,
                monthAsString: false,
                includeDay: true,
                includeSeconds: false
              })}
            </p>

            
            
          </div>
        )
      })}
      </div>
  )
}