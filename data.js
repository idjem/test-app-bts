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
  ticketCaseDescription,
  ticketCaseSubject,
  ticketEscalation,
  ticketEscalationComment,
  ticketDeclaOrganism,
} = require("./forms");

exports.salesforceUser = ({ payfitAdminUser, contact, billingAccount }) => ({
  canvas: {
    content: {
      components: [
        {
          type: "data-table",
          items: [
            {
              type: "field-value",
              field: "Contact Name",
              value: `${payfitAdminUser.FirstName__c} ${payfitAdminUser.LastName__c}`,
            },
            {
              type: "field-value",
              field: "Account Name",
              value: contact.Account_Name__c ?? "null",
            },
            {
              type: "field-value",
              field: "Segment",
              value: billingAccount.Client_Segment__c ?? "null",
            },
            {
              type: "field-value",
              field: "Number of people",
              value: billingAccount.nb_of_people__c?.toString() ?? "null",
            },
            {
              type: "field-value",
              field: "Extra care / client at risk",
              value: contact.Account.Extra_Care__c ? "Yes" : "No",
            },
            {
              type: "field-value",
              field: "Current payroll month",
              value: billingAccount.Current_Run_Payroll_Month__c ?? "null",
            },
            {
              type: "field-value",
              field: "Next payroll",
              value: billingAccount.Next_Payroll__c ?? "null",
            },
            {
              type: "field-value",
              field: "Open cases",
              value: "Value 3 ",
            },
            {
              type: "field-value",
              field: "Name of CSM",
              value: billingAccount.Account_Customer_Care_owner__c ?? "null",
            },
            {
              type: "field-value",
              field: "Billing account name",
              value: billingAccount.Name ?? "null",
            },
            {
              type: "field-value",
              field: "First revenue date",
              value: billingAccount.First_revenue_date__c ?? "null",
            },
            {
              type: "field-value",
              field: "Plan",
              value: billingAccount.Plan__c ?? "null",
            },
          ],
        },
      ],
    },
  },
});

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
    const subCategories2Field = ticketSubCategories2(categoryId, subCategoryId);

    if (subCategories2Field) baseForm.push(subCategories2Field);
    baseForm = baseForm.concat([
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
    form.push(ticketLevel(inputValues["ticket-level"]));
  }

  if (inputValues["ticket-level"] !== undefined) {
    // common fields for all ticket level
    form = form.concat([
      ticketCaseSubject(inputValues["ticket-subject"]),
      ticketCaseDescription(inputValues["ticket-description"]),
    ]);
  }

  if (
    inputValues["ticket-level"] === "ticket-level-1" ||
    inputValues["ticket-level"] === "ticket-level-2"
  ) {
    form.push(ticketCaseSubmit);
  } else if (inputValues["ticket-level"] === "ticket-level-escalation") {
    form = form.concat([
      ticketEscalation(inputValues["ticket-escalation"]),
      ticketEscalationComment(inputValues["ticket-escalation-comment"]),
      ticketCaseSubmit,
    ]);
  } else if (inputValues["ticket-level"] === "ticket-level-decla") {
    form = form.concat([
      ticketDeclaOrganism(inputValues["ticket-decla-organism"]),
      ticketCaseSubmit,
    ]);
  }

  return {
    canvas: {
      content: {
        components: form,
      },
    },
  };
};
