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
exports.ticketSubject = {
  type: "input",
  id: "ticket-subject",
  label: "Subject",
  placeholder: "Enter subject here...",
};
exports.ticketDescription = {
  type: "textarea",
  id: "ticket-description",
  label: "Description",
  placeholder: "Enter text here...",
};
exports.ticketType = {
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
};
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
