const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY 
});

/*
async function getData() {
  const res = await notion.databases.retrieve({database_id: process.env.NOTION_DB_ID});
  return res;
}

function createSuggestion({ title, description, isProject, tags }) {
  notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DB_ID
    },
    properties: {
      [process.env.NOTION_TITLE_ID]: {
        title: [
          {
            type: "text",
            text: {
              content: title,
            },
          },
        ],
      },
      [process.env.NOTION_DESCRIPTION_ID]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: description,
            },
          },
        ],
      },
      [process.env.NOTION_PROJECT_ID]: {
        checkbox: isProject,
      },
      [process.env.NOTION_VOTES_ID]: {
        number: 0,
      }
      ,
      [process.env.NOTION_TAGS_ID]: {
        multi_select: tags.map(tag => {
          return { id: tag.id }
        }),
      },
    },
  })
}
*/

module.exports = notion;