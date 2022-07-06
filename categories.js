const COMPANY = {
  id: "company",
  text: "Concerne l'établissement, la holding (info & paramètres)",
};
const ORGANIZATIONS = {
  id: "organizations",
  text: "Concerne un organisme, des décla",
};
const EMPLOYEES = {
  id: "employees",
  text: "Concerne un ou plusieurs salariés (setup et gestion)",
};
const INTEGRATIONS = {
  id: "integrations",
  text: "Concerne l'intégration avec un outil",
};
const ACCESS_ROLES_PERMISSIONS = {
  id: "access-roles-permissions",
  text: "Accès, rôles et permissions",
};
const MODULE_ACTIVATION = {
  id: "module-activation",
  text: "Activation d'un module",
};
const EMPLOYEES_ROLE_PERMISSION = {
  id: "employees-role-permission",
  text: "Rôles et permissions des employés",
};
const APP_ACCESS = {
  id: "app-access",
  text: "Accès à l'app (mdp, mail...)",
};
const PAYFIT_CONTRACT = {
  id: "payfit-contract",
  text: "Contrat / pricing PayFit",
};
const PRICING_INCREASE = {
  id: "pricing-increase",
  text: "Campagne d'augmentation",
};
const PRICING_OTHER = {
  id: "pricing-other",
  text: "Autres sujets contrat / pricing",
};
const ACTION_REQUIRED = {
  id: "action-required",
  text: "Actions requises",
};
const COMPANY_SETTINGS = {
  id: "company-settings",
  text: "Paramétrage entreprise",
};
const ACCOUNTING = {
  id: "accounting",
  text: "Comptabilité",
};
const EMPLOYEES_PAYMENT = {
  id: "employees-payment",
  text: "Paiement des salariés",
};
const SEPA_DOCUMENT = {
  id: "sepa-document",
  text: "Document SEPA",
};
const PAYMENT_DURING_MONTH = {
  id: "payment-during-month",
  text: "Acomptes / paiement en cours de mois, etc",
};
const HR_DATA = {
  id: "hr-data",
  text: "Données RH (graph, orga, etc.)",
};
const URSSAF = {
  id: "urssaf",
  text: "URSSAF",
};
const EXONERATION = {
  id: "exoneration",
  text: "Exonération JEI",
};
const AUDIT = {
  id: "audit",
  text: "Audit, régularisation, paramétrage...",
};
const RETIREMENT = {
  id: "retirement",
  text: "Retraite",
};
const MUTUAL = {
  id: "mutual",
  text: "Mutuelle",
};
const PROVIDENT_FUND = {
  id: "provident-fund",
  text: "Prévoyance",
};
const DGFIP = {
  id: "dgfip",
  text: "DGFIP",
};
const PAS = {
  id: "pas",
  text: "PAS",
};
const DGFIP_SETTINGS = {
  id: "dgfip-settings",
  text: "Paramétrage, prélèvements, CRM, etc.",
};
const DSN = {
  id: "dsn",
  text: "DSN",
};
const DOCUMENTS = {
  id: "documents",
  text: "Documents (AS, AED, etc.)",
};
const AS = {
  id: "as",
  text: "AS",
};
const AED = {
  id: "aed",
  text: "AED",
};
const DPAE = {
  id: "dpae",
  text: "DPAE",
};
const STC = {
  id: "stc",
  text: "STC",
};
const OTHER_DOCUMENTS = {
  id: "other-documents",
  text: "Autres documents",
};
const OTHER_ORGANIZATIONS = {
  id: "other-organizations",
  text: "Autres organismes",
};
const LEAVES = {
  id: "leaves",
  text: "Absences",
};
const MATERNITY_LEAVES = {
  id: "maternity-leaves",
  text: "Congé maternité, paternité, pathologique",
};
const SICK_LEAVES = {
  id: "sick-leaves",
  text: "Congé maladie, ATMP",
};
const PARTIAL_ACTIVITY = {
  id: "partial-activity",
  text: "Activité partielle",
};
const REMOTE_WORK = {
  id: "remote-work",
  text: "Télétravail",
};
const OTHER_LEAVES = {
  id: "other-leaves",
  text: "Autres congés",
};
const NEW_EMPLOYEE = {
  id: "new-employee",
  text: "Ajout d'un employé",
};
const CONTRACT_MANAGEMENT = {
  id: "contract-management",
  text: "Gestion d'un contrat",
};
const CONTRACT_CHANGE = {
  id: "contract-change",
  text: "Modification d'un contrat",
};
const CONTRACT_END = {
  id: "contract-end",
  text: "Fin de contrat",
};
const OTHER_CONTRACT_MANAGEMENT = {
  id: "other-contract-management",
  text: "Autre élément de gestion",
};
const TIME_MANAGEMENT = {
  id: "time-management",
  text: "Gestion du temps de travail",
};
const OTHER_TIME_MANAGEMENT = {
  id: "other-time-management",
  text: "Autre sujet de temps de travail",
};
const COMPENSATIONS = {
  id: "compensations",
  text: "Rémunération et bénéfices",
};
const BASE_SALARY = {
  id: "base-salary",
  text: "Salaire de base",
};
const OVERTIME = {
  id: "overtime",
  text: "Heures supplémentaires",
};
const BONUS = {
  id: "bonus",
  text: "Primes",
};
const NDF = {
  id: "ndf",
  text: "NDF, indemnités",
};
const OTHER_COMPENSATIONS = {
  id: "other-compensations",
  text: "Autres éléments de rémunération",
};
const QONTO = {
  id: "qonto",
  text: "Qonto",
};
const SWILE = {
  id: "swile",
  text: "Swile, Elevo",
};
const ALAN = {
  id: "alan",
  text: "Alan, Malakoff",
};
const SNAPSHIFT = {
  id: "snapshift",
  text: "Snapshift, Skello",
};
const RTT = {
  id: "rtt",
  text: "RTT, CP, repos",
};

const categories = [
  {
    ...COMPANY,
    subCategories: [
      {
        ...ACCESS_ROLES_PERMISSIONS,
        subCategories2: [
          MODULE_ACTIVATION,
          EMPLOYEES_ROLE_PERMISSION,
          APP_ACCESS,
        ],
      },
      {
        ...PAYFIT_CONTRACT,
        subCategories2: [PRICING_INCREASE, PRICING_OTHER],
      },
      {
        ...ACTION_REQUIRED,
        subCategories2: [],
      },
      { ...COMPANY_SETTINGS, subCategories2: [] },
      {
        ...ACCOUNTING,
        subCategories2: [],
      },
      {
        ...EMPLOYEES_PAYMENT,
        subCategories2: [SEPA_DOCUMENT, PAYMENT_DURING_MONTH],
      },
      {
        ...HR_DATA,
        subCategories2: [],
      },
    ],
  },
  {
    ...ORGANIZATIONS,
    subCategories: [
      {
        ...URSSAF,
        subCategories2: [EXONERATION, AUDIT],
      },
      {
        ...RETIREMENT,
        subCategories2: [],
      },
      { ...MUTUAL, subCategories2: [] },
      { ...PROVIDENT_FUND, subCategories2: [] },
      { ...DGFIP, subCategories2: [PAS, DGFIP_SETTINGS] },
      { ...DSN, subCategories2: [] },
      { ...DOCUMENTS, subCategories2: [AS, AED, DPAE, STC, OTHER_DOCUMENTS] },
      { ...OTHER_ORGANIZATIONS, subCategories2: [] },
    ],
  },
  {
    ...EMPLOYEES,
    subCategories: [
      {
        ...LEAVES,
        subCategories2: [
          RTT,
          MATERNITY_LEAVES,
          SICK_LEAVES,
          PARTIAL_ACTIVITY,
          REMOTE_WORK,
          OTHER_LEAVES,
        ],
      },
      { ...NEW_EMPLOYEE, subCategories2: [] },
      {
        ...CONTRACT_MANAGEMENT,
        subCategories2: [
          CONTRACT_CHANGE,
          CONTRACT_END,
          AED,
          OTHER_CONTRACT_MANAGEMENT,
        ],
      },
      {
        ...TIME_MANAGEMENT,
        subCategories2: [PARTIAL_ACTIVITY, REMOTE_WORK, OTHER_TIME_MANAGEMENT],
      },
      {
        ...COMPENSATIONS,
        subCategories2: [
          BASE_SALARY,
          OVERTIME,
          BONUS,
          NDF,
          OTHER_COMPENSATIONS,
        ],
      },
    ],
  },
  {
    ...INTEGRATIONS,
    subCategories: [
      { ...QONTO, subCategories2: [] },
      { ...SWILE, subCategories2: [] },
      { ...ALAN, subCategories2: [] },
      { ...SNAPSHIFT, subCategories2: [] },
    ],
  },
];

exports.getSubCategories2SelectOptions = (categoryId, subCategoryId) => {
  const category = categories.find((cat) => {
    return cat.id === categoryId;
  });
  if (!category) return [];
  const subCategory = category.subCategories.find((subCat) => {
    return subCat.id === subCategoryId;
  });
  if (!subCategory) return [];
  return subCategory.subCategories2.map((subCategory2) => ({
    type: "option",
    id: subCategory2.id,
    text: subCategory2.text,
  }));
};

exports.getSubCategoriesSelectOptions = (categoryId) => {
  const category = categories.find((cat) => {
    return cat.id === categoryId;
  });

  if (!category) return [];
  return category.subCategories.map((subCategory) => ({
    type: "option",
    id: subCategory.id,
    text: subCategory.text,
  }));
};

exports.getCategoriesSelectOptions = () => {
  return categories.map((category) => ({
    type: "option",
    id: category.id,
    text: category.text,
  }));
};

exports.getCategory = (categoryId) => {
  return categories.find((category) => category.id === categoryId);
};
