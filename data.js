const {
  isTicketSolved,
  ticketSubject,
  ticketDescription,
  ticketType,
  ticketCategory,
  ticketSubCategories,
  ticketSubCategories2,
  ticketSolvedSubmit,
  ticketLevel,
  ticketCaseSubmit,
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

const solvedTicketForm = ({ categoryId, subCategoryId, inputValues } = {}) => {
  let baseForm = [
    ticketSubject(inputValues["ticket-subject"]),
    ticketDescription(inputValues["ticket-description"]),
    ticketType(inputValues["ticket-case-type"]),
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
  inputValues,
} = {}) => {
  let form = [isIssueSolvedSelect(isTicketSolved)];
  if (isTicketSolved || categoryId || subCategoryId)
    form = form.concat(
      ...solvedTicketForm({ categoryId, subCategoryId, inputValues })
    );
  return {
    canvas: {
      content: {
        components: form,
      },
    },
  };
};

exports.newCaseForm = ({ isTicketSolved, inputValues } = {}) => {
  let form = [isIssueSolvedSelect(isTicketSolved)];

  if (isTicketSolved) {
    form.push(ticketLevel());
  }

  if (
    inputValues["ticket-level"] === "ticket-level-1" ||
    inputValues["ticket-level"] === "ticket-level-2"
  ) {
    form.push(ticketCaseSubmit);
  }

  return {
    canvas: {
      content: {
        components: form,
      },
    },
  };
};
