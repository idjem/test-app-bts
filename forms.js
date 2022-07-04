const {
  getCategoriesSelectOptions,
  getSubCategoriesSelectOptions,
  getSubCategories2SelectOptions,
} = require("./categories");

exports.ticketSolvedOption = {
  type: "option",
  id: "ticket-solved",
  text: "Yes",
};
exports.ticketNotSolvedOption = {
  type: "option",
  id: "ticket-not-solved",
  text: "No",
};
exports.isTicketSolved = {
  type: "single-select",
  id: "is-solved",
  label: "Is issue solved ?",
  options: [this.ticketSolvedOption, this.ticketNotSolvedOption],
  action: { type: "submit" },
};
exports.ticketSubject = (value) => ({
  type: "input",
  id: "ticket-subject",
  label: "Subject",
  placeholder: "Enter subject here...",
  value,
  value: value !== "" ? value : undefined,
});
exports.ticketDescription = (value) => ({
  type: "textarea",
  id: "ticket-description",
  label: "Description",
  placeholder: "Enter text here...",
  value: value !== "" ? value : undefined,
});
exports.ticketType = (value) => ({
  type: "dropdown",
  id: "ticket-case-type",
  label: "Case type",
  options: [
    {
      type: "option",
      id: "option-1",
      text: "Option 1",
    },
    { type: "option", id: "option-2", text: "Option 2" },
  ],
  value: value !== "" ? value : undefined,
});
exports.ticketCategory = (categoryId) => ({
  type: "dropdown",
  id: "ticket-case-category",
  label: "Case category",
  options: getCategoriesSelectOptions(),
  value: categoryId,
  action: { type: "submit" },
});
exports.ticketSubCategories = (categoryId, subCategoryId) => ({
  type: "dropdown",
  id: "ticket-case-subcategory",
  label: "Case Sub-category",
  options: getSubCategoriesSelectOptions(categoryId),
  value: subCategoryId,
  action: { type: "submit" },
});
exports.ticketSubCategories2 = (categoryId, subCategoryId) => ({
  type: "dropdown",
  id: "ticket-case-subcategory2",
  label: "Case Sub-category2",
  options: getSubCategories2SelectOptions(categoryId, subCategoryId),
});
exports.ticketSolvedSubmit = {
  type: "button",
  id: "ticket-submit",
  label: "Submit solved ticket",
  style: "primary",
  action: {
    type: "submit",
  },
};
exports.ticketLevel = (value) => ({
  type: "dropdown",
  id: "ticket-level",
  label: "Ticket level",
  options: [
    { type: "option", id: "ticket-level-1", text: "Level 1" },
    { type: "option", id: "ticket-level-2", text: "Level 2" },
    {
      type: "option",
      id: "ticket-level-escalation",
      text: "Specific escalation",
    },
    { type: "option", id: "ticket-level-decla", text: "Decla" },
  ],
  action: {
    type: "submit",
  },
  value: value !== "" ? value : undefined,
});
exports.ticketCaseSubject = (value) => ({
  type: "input",
  id: "ticket-subject",
  label: "Subject",
  placeholder: "Enter subject here...",
  value: value !== "" ? value : undefined,
});
exports.ticketCaseDescription = (value) => ({
  type: "textarea",
  id: "ticket-description",
  label: "Description",
  placeholder: "Enter text here...",
  value: value !== "" ? value : undefined,
});
exports.ticketCaseComment = (value) => ({
  type: "textarea",
  id: "ticket-comment",
  label: "Comment",
  placeholder: "Enter text here...",
  value: value !== "" ? value : undefined,
});
exports.ticketEscalation = (value) => ({
  type: "dropdown",
  id: "ticket-escalation",
  label: "Specific escalation",
  options: [
    { type: "option", id: "ticket-escalation-1", text: "Escalation 1" },
    { type: "option", id: "ticket-escalation-2", text: "Escalation 2" },
  ],
  value: value !== "" ? value : undefined,
});
exports.ticketEscalationComment = (value) => ({
  type: "textarea",
  id: "ticket-escalation-comment",
  label: "Specific escalation comment",
  placeholder: "Enter text here...",
  value: value !== "" ? value : undefined,
});
exports.ticketDeclaOrganism = (value) => ({
  type: "dropdown",
  id: "ticket-decla-organism",
  label: "Organisme concerné",
  options: [
    { type: "option", id: "ticket-decla-1", text: "Decla 1" },
    { type: "option", id: "ticket-decla-2", text: "Decla 2" },
  ],
  value: value !== "" ? value : undefined,
});
exports.ticketCaseSubmit = {
  type: "button",
  id: "ticket-submit",
  label: "Create new case",
  style: "primary",
  action: {
    type: "submit",
  },
};
