const { getOptionValue } = require("../utils");
const { newCase } = require("./forms");

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
              field: "Plan",
              value: billingAccount.Plan__c ?? "null",
            },
          ],
        },
      ],
    },
  },
});

exports.convertInputToCase = (payfitAdminId, billingAccountId, inputValues) => {
  const isCaseSolved = inputValues["is-case-solved"];

  if (isCaseSolved === "case-solved") {
    const caseType = getOptionValue(newCase, inputValues["case-type"]);
    const caseCategory = getOptionValue(newCase, inputValues["case-category"]);
    const caseSubcategory = getOptionValue(
      newCase,
      inputValues["case-subcategory"]
    );
    const caseSubcategory2 = getOptionValue(
      newCase,
      inputValues["case-subcategory-2"]
    );
    return {
      Subject: inputValues["case-subject"],
      Description: inputValues["case-description"],
      FR_Case_Type__c: caseType,
      FR_Case_Category__c: caseCategory,
      FR_Case_SubCategory__c: caseSubcategory,
      FR_Case_Sub_Category2__c: caseSubcategory2,
      Billing_Account__c: billingAccountId,
      Payfit_Admin__c: payfitAdminId,
      Status: "Solved",
    };
  } else {
    const caseLevel = inputValues["case-level"];

    const salesforceCase = {
      Subject: inputValues["case-subject"],
      Description: inputValues["case-description"],
      FR_Level__c: getOptionValue(newCase, caseLevel),
      Billing_Account__c: billingAccountId,
      Payfit_Admin__c: payfitAdminId,
    };

    if (caseLevel === "case-level-2") {
      const level2Escalation = getOptionValue(
        newCase,
        inputValues["case-escalation-reason"]
      );
      salesforceCase.FR_Level_2_Escalation_Reason__c = level2Escalation;
      salesforceCase.FR_Level_2_Escalation_Comment__c =
        inputValues["case-escalation-comment"];
    }

    if (caseLevel === "case-level-escalation") {
      const specificEscalation = getOptionValue(
        newCase,
        inputValues["case-specific-escalation"]
      );
      salesforceCase.FR_Specific_Escalation__c = specificEscalation;
      salesforceCase.FR_Specific_Escalation_Comment__c =
        inputValues["case-escalation-comment"];
    } else if (caseLevel === "case-level-decla") {
      const declaLevel = getOptionValue(
        newCase,
        inputValues["case-level-decla"]
      );
      salesforceCase.Organisme_Contact__c = declaLevel;
    }
    return salesforceCase;
  }
};
