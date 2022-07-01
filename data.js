const {
  isTicketSolved,
  ticketSubject,
  ticketDescription,
  ticketType,
  ticketCategory,
  ticketSubCategories,
  ticketSubCategories2,
  ticketSolvedSubmit,
} = require("./forms");

exports.salesforcePreview = {
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

const isIssueSolvedSelect = (value) => ({
  ...isTicketSolved,
  value,
});

const solvedTicketForm = ({ categoryId, subCategoryId } = {}) => {
  let baseForm = [
    ticketSubject,
    ticketDescription,
    ticketType,
    ticketCategory(categoryId),
  ];
  if (categoryId) {
    baseForm.push(ticketSubCategories(categoryId, subCategoryId));
  }
  if (subCategoryId) {
    baseForm = baseForm.concat([
      ticketSubCategories2(categoryId, subCategoryId),
      {
        type: "spacer",
        size: "m",
      },
      ticketSolvedSubmit,
    ]);
  }
  return baseForm;
};

exports.newSolvedCaseForm = ({
  isTicketSolved,
  categoryId,
  subCategoryId,
} = {}) => {
  let form = [isIssueSolvedSelect(isTicketSolved)];
  if (categoryId || subCategoryId)
    form = form.concat(...solvedTicketForm({ categoryId, subCategoryId }));
  return {
    canvas: {
      content: {
        components: form,
      },
    },
  };
};
