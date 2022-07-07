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
      id: "ticket-case-type-incident",
      text: "Incident, bug, erreur",
    },
    {
      type: "option",
      id: "ticket-case-type-unavailable-action",
      text: "Action non disponible dans l'app côté client",
    },
    {
      type: "option",
      id: "ticket-case-type-help",
      text: "Une demande d’information, conseil, aide",
    },
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
exports.ticketSubCategories2 = (categoryId, subCategoryId) => {
  const subCategories2Options = getSubCategories2SelectOptions(
    categoryId,
    subCategoryId
  );
  // intercom yields an error if dropdown has less than 2 options
  if (subCategories2Options.length < 2) return;
  return {
    type: "dropdown",
    id: "ticket-case-subcategory2",
    label: "Case Sub-category2",
    options: subCategories2Options,
  };
};
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
exports.ticketEscalation = (value) => ({
  type: "dropdown",
  id: "ticket-escalation",
  label: "Specific escalation",
  options: [
    {
      type: "option",
      id: "ticket-escalation-new-company",
      text: "J’ai besoin de créer un nouvel établissement > OBS",
    },
    {
      type: "option",
      id: "ticket-escalation-mass-import",
      text: "J’ai besoin d’importer des employés en masse sont exclus : les absences, bonus et et autres variables récurrentes > OBS",
    },
    {
      type: "option",
      id: "ticket-escalation-edit-billing",
      text: "J’ai besoin de modifier mes informations de facturation > Finance",
    },
    {
      type: "option",
      id: "ticket-escalation-comeback",
      text: "Je me suis désabonné et je voudrais revenir sur PayFit > Finance",
    },
    {
      type: "option",
      id: "ticket-escalation-contract-negociaiton",
      text: "J’ai besoin de négocier mon contrat opportunités d’up-sell et de cross-sell, churn > CSM",
    },
    {
      type: "option",
      id: "ticket-escalation-learning",
      text: "Je souhaite être formé sur [...] > APS Filtre",
    },
    {
      type: "option",
      id: "ticket-escalation-webhelp",
      text: "Webhelp - CCR",
    },
    {
      type: "option",
      id: "ticket-escalation-cem",
      text: "J’aimerais que le CEM reprenne la main > CEM",
    },
    {
      type: "option",
      id: "ticket-escalation-cem-call",
      text: "J’aimerais être accompagné(e) sur le call > CEM",
    },
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
    { type: "option", id: "ticket-decla-cpam", text: "CPAM" },
    { type: "option", id: "ticket-decla-dgfip", text: "DGFIP" },
    { type: "option", id: "ticket-decla-mutual", text: "Mutuelle" },
    { type: "option", id: "ticket-decla-provident-fund", text: "Prévoyance" },
    { type: "option", id: "ticket-decla-pole-emploi", text: "Pôle Emploi" },
    { type: "option", id: "ticket-decla-urssaf", text: "URSSAF" },
    {
      type: "option",
      id: "ticket-decla-retirement",
      text: "Retraite Complémentaire",
    },
    {
      type: "option",
      id: "ticket-decla-retirement-additional",
      text: "Retraite Supplémentaire",
    },
    { type: "option", id: "ticket-decla-dsn", text: "DSN Mensuelles" },
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
