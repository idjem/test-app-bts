const express = require("express");
const app = express();

const data = {
  canvas: {
    content: {
      components: [
        {
          type: "data-table",
          items: [
            {
              type: "field-value",
              field: "Contact Name",
              value: "Value 1",
            },
            {
              type: "field-value",
              field: "Account Name",
              value: "Value 2",
            },
            {
              type: "field-value",
              field: "Segment",
              value: "Value 3",
            },
            {
              type: "field-value",
              field: "Number of people",
              value: "Value 3",
            },
            {
              type: "field-value",
              field: "Extra care / client at risk",
              value: "Value 3",
            },
            {
              type: "field-value",
              field: "Current payroll month",
              value: "Value 3",
            },
            {
              type: "field-value",
              field: "Next payroll",
              value: "Value3",
            },
            {
              type: "field-value",
              field: "Open cases",
              value: "Value 3 ",
            },
            {
              type: "field-value",
              field: "Name of CSM",
              value: "Value 3 ",
            },
            {
              type: "field-value",
              field: "Billing account name",
              value: "Value 3 ",
            },
            {
              type: "field-value",
              field: "First revenue date",
              value: "Value 3 ",
            },
            {
              type: "field-value",
              field: "Plan",
              value: "Value 3",
            },
            {
              type: "field-value",
              field: "Current TNPS",
              value: "Value 3 ",
            },
            {
              type: "field-value",
              field: "Last NPS",
              value: "Value 3",
            },
            {
              type: "field-value",
              field: "Last CSAT",
              value: "Value 3",
            },
          ],
        },
      ],
    },
  },
};

app.post("/salesforce", (req, res) => {
  let  data = ''
  req.on('data', (d) => {
    data = data + d
  })
  req.on('end', () => {
    console.log(data)
    res.json(data);
  })
  
  
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
