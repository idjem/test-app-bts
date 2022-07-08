const CASE_SUBJECT_INPUT = [
  "case-subject",
  {
    type: "input",
    label: "Subject",
    placeholder: "Enter subject here...",
  },
];
const CASE_DESCRIPTION_INPUT = [
  "case-description",
  {
    type: "textarea",
    label: "Description",
    placeholder: "Enter description here...",
    defaultValue: `Contexte :
Employés impactés :
Investigation / action effectués :`,
  },
];
const CASE_SUBMIT_BUTTON = [
  "case-submit",
  {
    type: "button",
    label: "Create new case",
    style: "primary",
    action: {
      type: "submit",
    },
  },
];

const CASE_LEVEL2_ESCALATION_REASON = [
  "case-escalation-reason",
  {
    type: "dropdown",
    label: "Level 2 escalation reason",
    options: new Map([
      [
        "case-escalation-reason-uncomplete",
        {
          text: "Les articles du HC et les macros ne fournissent pas une réponse complètes",
        },
      ],
      [
        "case-escalation-reason-aggression",
        { text: "Suite à ma 1ère réponse, le client devient agressif" },
      ],
      [
        "case-escalation-reason-app",
        {
          text: "J’ai besoin d’aller sur les “actions cachées” ou la “pre-prod” via l’app",
        },
      ],
      [
        "case-escalation-reason-impact",
        { text: "Le problème impact plus de 3 employés" },
      ],
      [
        "case-escalation-reason-opened",
        {
          text: "La requête a 2 touches* minimum ET est ouverte depuis au moins 2 business day",
        },
      ],
      [
        "case-escalation-reason-csm",
        { text: "Je suis CSM mais je traite un ticket de Level 1" },
      ],
      ["case-escalation-reason-other", { text: "Autre raison ?" }],
    ]),
  },
];

const CASE_LEVEL2_ESCALATION_COMMENT = [
  "case-escalation-comment",
  {
    type: "textarea",
    label: "Level 2 escalation comment",
  },
];

const CASE_ACCESS_SUBCATEGORY2_OPTIONS = new Map([
  ["module-activation", { text: "Activation d'un module" }],
  ["employees-role-permission", { text: "Rôles et permissions des employés" }],
  ["app-access", { text: "Accès à l'app (mdp, mail...)" }],
]);

const CASE_PAYMENT_SUBCATEGORY2_OPTIONS = new Map([
  ["sepa-document", { text: "Document SEPA" }],
  [
    "payment-during-month",
    { text: "Acomptes / paiement en cours de mois, etc" },
  ],
]);

const CASE_CONTRACT_SUBCATEGORY2_OPTIONS = new Map([
  ["pricing-increase", { text: "Campagne d'augmentation" }],
  ["pricing-other", { text: "Autres sujets contrat / pricing" }],
]);

const CASE_URSSAF_SUBCATEGORY2_OPTIONS = new Map([
  ["exoneration", { text: "Exonération JEI" }],
  ["audit", { text: "Audit, régularisation, paramétrage..." }],
]);

const CASE_DGFIP_SUBCATEGORY2_OPTIONS = new Map([
  ["pas", { text: "PAS" }],
  ["dgfip-settings", { text: "Paramétrage, prélèvements, CRM, etc." }],
]);

const CASE_DOCUMENTS_SUBCATEGORY2_OPTIONS = new Map([
  ["as", { text: "AS" }],
  ["aed", { text: "AED" }],
  ["dpae", { text: "DPAE" }],
  ["stc", { text: "STC" }],
  ["other-documents", { text: "Autres documents" }],
]);

const CASE_LEAVE_SUBCATEGORY2_OPTIONS = new Map([
  ["rtt", { text: "RTT, CP, repos" }],
  ["maternity-leaves", { text: "Congé maternité, paternité, pathologique" }],
  ["sick-leaves", { text: "Congé maladie, ATMP" }],
  ["partial-activity", { text: "Activité partielle" }],
  ["remote-work", { text: "Télétravail" }],
  ["other-leaves", { text: "Autres congés" }],
]);

const CASE_CONTRACT_MANAGEMENT_SUBCATEGORY2_OPTIONS = new Map([
  ["contract-change", { text: "Modification d'un contrat" }],
  ["contract-end", { text: "Fin de contrat" }],
  ["aed", { text: "AED" }],
  ["other-contract-management", { text: "Autre élément de gestion" }],
]);

const CASE_TIME_MANAGEMENT_SUBCATEGORY2_OPTIONS = new Map([
  ["partial-activity", { text: "Activité partielle" }],
  ["remote-work", { text: "Télétravail" }],
  ["other-time-management", { text: "Autre sujet de temps de travail" }],
]);

const CASE_COMPENSATIONS_SUBCATEGORY2_OPTIONS = new Map([
  ["base-salary", { text: "Salaire de base" }],
  ["overtime", { text: "Heures supplémentaires" }],
  ["bonus", { text: "Primes" }],
  ["ndf", { text: "NDF, indemnités" }],
  ["other-compensations", { text: "Autres éléments de rémunération" }],
]);

const CASE_SUBCATEGORY2 = (options) => [
  "case-subcategory-2",
  {
    type: "dropdown",
    label: "Case Sub-category 2",
    options,
  },
];

const CASE_COMPANY_SUBCATEGORY_OPTIONS = new Map([
  [
    "access-roles-permissions",
    {
      text: "Accès, rôles et permissions",
      nextStep: new Map([
        CASE_SUBCATEGORY2(CASE_ACCESS_SUBCATEGORY2_OPTIONS),
        CASE_SUBMIT_BUTTON,
      ]),
    },
  ],
  [
    "payfit-contract",
    {
      text: "Contrat / pricing PayFit",
      nextStep: new Map([
        CASE_SUBCATEGORY2(CASE_CONTRACT_SUBCATEGORY2_OPTIONS),
        CASE_SUBMIT_BUTTON,
      ]),
    },
  ],
  [
    "action-required",
    { text: "Actions requises", nextStep: new Map([CASE_SUBMIT_BUTTON]) },
  ],
  [
    "company-settings",
    { text: "Paramétrage entreprise", nextStep: new Map([CASE_SUBMIT_BUTTON]) },
  ],
  [
    "accounting",
    { text: "Comptabilité", nextStep: new Map([CASE_SUBMIT_BUTTON]) },
  ],
  [
    "employees-payment",
    {
      text: "Paiement des salariés",
      nextStep: new Map([
        CASE_SUBCATEGORY2(CASE_PAYMENT_SUBCATEGORY2_OPTIONS),
        CASE_SUBMIT_BUTTON,
      ]),
    },
  ],
  [
    "hr-data",
    {
      text: "Données RH (graph, orga, etc.)",
      nextStep: new Map([CASE_SUBMIT_BUTTON]),
    },
  ],
]);

const CASE_ORGANIZATIONS_SUBCATEGORY_OPTIONS = new Map([
  [
    "urssaf",
    {
      text: "URSSAF",
      nextStep: new Map([
        CASE_SUBCATEGORY2(CASE_URSSAF_SUBCATEGORY2_OPTIONS),
        CASE_SUBMIT_BUTTON,
      ]),
    },
  ],
  ["retirement", { text: "Retraite", nextStep: new Map([CASE_SUBMIT_BUTTON]) }],
  ["mutual", { text: "Mutuelle", nextStep: new Map([CASE_SUBMIT_BUTTON]) }],
  [
    "provident-fund",
    { text: "Prévoyance", nextStep: new Map([CASE_SUBMIT_BUTTON]) },
  ],
  [
    "dgfip",
    {
      text: "DGFIP",
      nextStep: new Map([
        CASE_SUBCATEGORY2(CASE_DGFIP_SUBCATEGORY2_OPTIONS),
        CASE_SUBMIT_BUTTON,
      ]),
    },
  ],
  ["dsn", { text: "DSN", nextStep: new Map([CASE_SUBMIT_BUTTON]) }],
  [
    "documents",
    {
      text: "Documents (AS, AED, etc.)",
      nextStep: new Map([
        CASE_SUBCATEGORY2(CASE_DOCUMENTS_SUBCATEGORY2_OPTIONS),
        CASE_SUBMIT_BUTTON,
      ]),
    },
  ],
  [
    "other-organizations",
    { text: "Autres organismes", nextStep: new Map([CASE_SUBMIT_BUTTON]) },
  ],
]);

const CASE_EMPLOYEES_SUBCATEGORY_OPTIONS = new Map([
  [
    "leaves",
    {
      text: "Absences",
      nextStep: new Map([
        CASE_SUBCATEGORY2(CASE_LEAVE_SUBCATEGORY2_OPTIONS),
        CASE_SUBMIT_BUTTON,
      ]),
    },
  ],
  [
    "new-employee",
    { text: "Ajout d'un employé", nextStep: new Map([CASE_SUBMIT_BUTTON]) },
  ],
  [
    "contract-management",
    {
      text: "Gestion d'un contrat",
      nextStep: new Map([
        CASE_SUBCATEGORY2(CASE_CONTRACT_MANAGEMENT_SUBCATEGORY2_OPTIONS),
        CASE_SUBMIT_BUTTON,
      ]),
    },
  ],
  [
    "time-management",
    {
      text: "Gestion du temps de travail",
      nextStep: new Map([
        CASE_SUBCATEGORY2(CASE_TIME_MANAGEMENT_SUBCATEGORY2_OPTIONS),
        CASE_SUBMIT_BUTTON,
      ]),
    },
  ],
  [
    "compensations",
    {
      text: "Rémunération et bénéfices",
      nextStep: new Map([
        CASE_SUBCATEGORY2(CASE_COMPENSATIONS_SUBCATEGORY2_OPTIONS),
        CASE_SUBMIT_BUTTON,
      ]),
    },
  ],
]);

const CASE_INTEGRATIONS_SUBCATEGORY_OPTIONS = new Map([
  ["qonto", { text: "Qonto", nextStep: new Map([CASE_SUBMIT_BUTTON]) }],
  ["swile", { text: "Swile, Elevo", nextStep: new Map([CASE_SUBMIT_BUTTON]) }],
  ["alan", { text: "Alan, Malakoff", nextStep: new Map([CASE_SUBMIT_BUTTON]) }],
  [
    "snapshift",
    { text: "Snapshift, Skello", nextStep: new Map([CASE_SUBMIT_BUTTON]) },
  ],
]);

const CASE_SUBCATEGORY = (options) => [
  "case-subcategory",
  {
    type: "dropdown",
    label: "Case Sub-category",
    options,
  },
];

const CASE_CATEGORY_OPTIONS = new Map([
  [
    "company",
    {
      text: "Concerne l'établissement, la holding (info & paramètres)",
      nextStep: new Map([CASE_SUBCATEGORY(CASE_COMPANY_SUBCATEGORY_OPTIONS)]),
    },
  ],
  [
    "organizations",
    {
      text: "Concerne un organisme, des décla",
      nextStep: new Map([
        CASE_SUBCATEGORY(CASE_ORGANIZATIONS_SUBCATEGORY_OPTIONS),
      ]),
    },
  ],
  [
    "employees",
    {
      text: "Concerne un ou plusieurs salariés (setup et gestion)",
      nextStep: new Map([CASE_SUBCATEGORY(CASE_EMPLOYEES_SUBCATEGORY_OPTIONS)]),
    },
  ],
  [
    "integrations",
    {
      text: "Concerne l'intégration avec un outil",
      nextStep: new Map([
        CASE_SUBCATEGORY(CASE_INTEGRATIONS_SUBCATEGORY_OPTIONS),
      ]),
    },
  ],
]);

exports.isCaseSolvedOptions = exports.newCase = new Map([
  [
    "is-case-solved",
    {
      type: "single-select",
      label: "Is issue solved ?",
      options: new Map([
        [
          "case-solved",
          {
            text: "Yes",
            nextStep: new Map([
              CASE_SUBJECT_INPUT,
              CASE_DESCRIPTION_INPUT,
              [
                "case-type",
                {
                  type: "dropdown",
                  label: "Case type",
                  options: new Map([
                    [
                      "case-type-incident",
                      {
                        text: "Incident, bug, erreur",
                      },
                    ],
                    [
                      "case-type-unavailable-action",
                      { text: "Action non disponible dans l'app côté client" },
                    ],
                    [
                      "case-type-help",
                      { text: "Une demande d’information, conseil, aide" },
                    ],
                  ]),
                },
              ],
              [
                "case-category",
                {
                  type: "dropdown",
                  label: "Case category",
                  options: CASE_CATEGORY_OPTIONS,
                },
              ],
            ]),
          },
        ],
        [
          "case-unsolved",
          {
            text: "No",
            nextStep: new Map([
              [
                "case-level",
                {
                  type: "dropdown",
                  label: "Ticket level",
                  options: new Map([
                    [
                      "case-level-1",
                      {
                        text: "Level 1",
                        nextStep: new Map([
                          CASE_SUBJECT_INPUT,
                          CASE_DESCRIPTION_INPUT,
                          CASE_SUBMIT_BUTTON,
                        ]),
                      },
                    ],
                    [
                      "case-level-2",
                      {
                        text: "Level 2",
                        nextStep: new Map([
                          CASE_SUBJECT_INPUT,
                          CASE_DESCRIPTION_INPUT,
                          CASE_LEVEL2_ESCALATION_REASON,
                          CASE_LEVEL2_ESCALATION_COMMENT,
                          CASE_SUBMIT_BUTTON,
                        ]),
                      },
                    ],
                    [
                      "case-level-escalation",
                      {
                        text: "Specific escalation",
                        nextStep: new Map([
                          CASE_SUBJECT_INPUT,
                          CASE_DESCRIPTION_INPUT,
                          [
                            "case-specific-escalation",
                            {
                              type: "dropdown",
                              label: "Specific escalation",
                              options: new Map([
                                [
                                  "case-escalation-new-company",
                                  {
                                    text: "J’ai besoin de créer un nouvel établissement > OBS",
                                  },
                                ],
                                [
                                  "case-escalation-mass-import",
                                  {
                                    text: "J’ai besoin d’importer des employés en masse sont exclus : les absences, bonus et et autres variables récurrentes > OBS",
                                  },
                                ],
                                [
                                  "case-escalation-edit-billing",
                                  {
                                    text: "J’ai besoin de modifier mes informations de facturation > Finance",
                                  },
                                ],
                                [
                                  "case-escalation-comeback",
                                  {
                                    text: "Je me suis désabonné et je voudrais revenir sur PayFit > Finance",
                                  },
                                ],
                                [
                                  "case-escalation-contract-negociaiton",
                                  {
                                    text: "J’ai besoin de négocier mon contrat opportunités d’up-sell et de cross-sell, churn > CSM",
                                  },
                                ],
                                [
                                  "case-escalation-learning",
                                  {
                                    text: "Je souhaite être formé sur [...] > APS Filtre",
                                  },
                                ],
                                [
                                  "case-escalation-webhelp",
                                  {
                                    text: "Webhelp - CCR",
                                  },
                                ],
                                [
                                  "case-escalation-cem",
                                  {
                                    text: "J’aimerais que le CEM reprenne la main > CEM",
                                  },
                                ],
                                [
                                  "case-escalation-cem-call",
                                  {
                                    text: "J’aimerais être accompagné(e) sur le call > CEM",
                                  },
                                ],
                              ]),
                            },
                          ],
                          [
                            "case-escalation-comment",
                            {
                              type: "textarea",
                              label: "Specific escalation comment",
                              placeholder: "Enter text here...",
                            },
                          ],
                          CASE_SUBMIT_BUTTON,
                        ]),
                      },
                    ],
                    [
                      "case-level-decla",
                      {
                        text: "Decla",
                        nextStep: new Map([
                          CASE_SUBJECT_INPUT,
                          CASE_DESCRIPTION_INPUT,
                          [
                            "case-decla-organism",
                            {
                              type: "dropdown",
                              label: "Organisme concerné",
                              options: new Map([
                                ["case-decla-cpam", { text: "CPAM" }],
                                ["case-decla-dgfip", { text: "DGFIP" }],
                                ["case-decla-mutual", { text: "Mutuelle" }],
                                [
                                  "case-decla-provident-fund",
                                  { text: "Prévoyance" },
                                ],
                                [
                                  "case-decla-pole-emploi",
                                  { text: "Pôle Emploi" },
                                ],
                                ["case-decla-urssaf", { text: "URSSAF" }],
                                [
                                  "case-decla-retirement",
                                  { text: "Retraite Complémentaire" },
                                ],
                                [
                                  "case-decla-retirement-additional",
                                  { text: "Retraite Supplémentaire" },
                                ],
                                ["case-decla-dsn", { text: "DSN Mensuelles" }],
                              ]),
                            },
                          ],
                          CASE_SUBMIT_BUTTON,
                        ]),
                      },
                    ],
                  ]),
                },
              ],
            ]),
          },
        ],
      ]),
    },
  ],
]);
