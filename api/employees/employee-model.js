const notion = require('../../notion');

const findAll = async () => {

  const employees = await notion.databases.query({
    database_id: process.env.NOTION_EMPLOYEE_DB_ID,
    sorts: [
      {
        property: 'Name',
        direction: 'ascending'
      }
    ]
  });

  return employees;
}

const create = async ({name, phoneNumber}) => {
  const res = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_EMPLOYEE_DB_ID
    },
    properties: {
      Name: {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: name
            }
          }
        ]
      },
      'Phone Number': {
        type: 'phone_number',
        phone_number: phoneNumber
      }
    }
  })
  return res;
}

const findByEmployeeId = async (employee_id) => {
  const employees = await findAll();

  const employee = employees.results.filter(emp => emp.id === employee_id);
  
  const match = employee.length === 1;
  
  if(match){
    return employee[0];
  } else {
    return null;
  }
  
}

module.exports = {
  findAll,
  findByEmployeeId,
  create
}