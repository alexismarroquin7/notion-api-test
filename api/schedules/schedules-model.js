const notion = require('../../notion');
const Employee = require('../employees/employee-model');

const findAll = async () => {
  const schedules = await notion.databases.query({
    database_id: process.env.NOTION_SCHEDULES_DB_ID,
    sorts: [
      {
        property: 'Date',
        direction: 'ascending'
      }
    ]
  });
  
  let results = schedules
  .results.map(async res => {
    const employee = await Employee.findByEmployeeId(res.properties.Employee.relation[0].id);
    
    return {
      ...res,
      properties: {
        ...res.properties,
        Employee: {
          ...res.properties.Employee,
          relation: [
            employee
          ]
        }
      }
    };
  
  });
  
  return Promise
  .all(results)
  .then((values) => {
    return {
      ...schedules,
      results: values
    }
  })
}

module.exports = {
  findAll
}