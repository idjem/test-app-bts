const express = require("express");
const { getCategory } = require("./categories");
const app = express();
require("dotenv").config();

const { salesforceUser, newSolvedCaseForm, newCaseForm } = require("./data");
const {
  ticketSolvedOption,
  isTicketSolved,
  ticketCategory,
  ticketSubCategories,
  ticketSolvedSubmit,
  ticketNotSolvedOption,
  ticketLevel,
  ticketCaseSubmit,
  ticketType,
  ticketEscalation,
  ticketDeclaOrganism,
} = require("./forms");

const {
  getPayfitAdmin,
  getContact,
  getBillingAccount,
  getOpenCasesFromCompany,
  createCase,
  connect,
} = require("./salesForce");

app.use(express.json());

app.post("/salesforce", async (req, res) => {
  const data = req.body;
  const users = await getPayfitAdmin(data.customer.user_id);
  if (users.length === 0) {
    return res.status(200).json({
      canvas: {
        content: {
          components: {
            type: "text",
            text: "No salesforce user was found for this conversation",
          },
        },
      },
    });
  }
  const user = users[0];
  const contact = await getContact(user.contact__c);
  const billingAccount = await getBillingAccount(user.billingAccount);
  const openCases = await getOpenCasesFromCompany(user.billingAccount);
  res.status(200).json(
    salesforceUser({
      payfitAdminUser: user,
      contact: contact[0],
      billingAccount: billingAccount[0],
    })
  );
});

app.post("/init-new-case", (req, res) => {
  res.status(200).json(newSolvedCaseForm());
});

app.post("/new-case", async (req, res) => {
  const data = req.body;
  const inputValues = data.input_values;
  const ticketSolved = inputValues["is-solved"];

  if (
    // case is solved
    ticketSolved === ticketSolvedOption.id
  ) {
    if (
      // initial ticket solved form
      data.component_id === isTicketSolved.id
    ) {
      res
        .status(200)
        .json(newSolvedCaseForm({ isTicketSolved: ticketSolved, inputValues }));
    }
    // category selected ticket solved form
    else if (
      ticketCategory().options.some(
        (category) => category.id === data.component_id
      )
    ) {
      res.status(200).json(
        newSolvedCaseForm({
          isTicketSolved: ticketSolved,
          categoryId: data.component_id,
          inputValues,
        })
      );
    }
    // subcategory selected ticket solved form
    else if (
      ticketSubCategories(inputValues[ticketCategory().id]).options.some(
        (subCategory) => subCategory.id === data.component_id
      )
    ) {
      const categoryId = inputValues[ticketCategory().id];
      const subCategoryId = inputValues[ticketSubCategories(categoryId).id];

      res.status(200).json(
        newSolvedCaseForm({
          isTicketSolved: ticketSolved,
          categoryId: inputValues[ticketCategory().id],
          subCategoryId,
          inputValues,
        })
      );
    }
    // submit the solved case form
    else if (data.component_id === ticketSolvedSubmit.id) {
      // create salesforce case
      const users = await getPayfitAdmin(data.customer.user_id);
      const caseCategory = getCategory(inputValues["ticket-case-category"]);
      const subCategory = caseCategory.subCategories.find(
        (subCategory) =>
          subCategory.id === inputValues["ticket-case-subcategory"]
      );
      let subCategory2 = undefined;
      if (subCategory.subCategories2) {
        subCategory2 = subCategory.subCategories2.find(
          (subCategory2) =>
            subCategory2.id === inputValues["ticket-case-subcategory2"]
        );
      }
      const caseType = ticketType().options.find(
        (type) => type.id === inputValues["ticket-case-type"]
      );
      const salesforceCase = {
        Subject: inputValues["ticket-subject"],
        Description: inputValues["ticket-description"],
        FR_Case_Type__c: caseType.text,
        FR_Case_Category__c: caseCategory.text,
        FR_Case_SubCategory__c: subCategory?.text,
        FR_Case_Sub_Category2__c: subCategory2?.text,
        Billing_Account__c: users[0].Billing_Account__c,
        Payfit_Admin__c: users[0].Id,
        Status: "Solved",
      };
      const newCase = await createCase(salesforceCase);
      return res.status(200).json({
        canvas: {
          content: {
            components: [
              {
                type: "text",
                text: "New solved case created",
              },
              {
                type: "button",
                id: "new-case-url",
                label: "Open case in salesforce",
                style: "link",
                action: {
                  type: "url",
                  url: `${process.env.SALESFORCE_CONSOLE_URL}/r/Case/${newCase.id}/view`,
                },
              },
            ],
          },
        },
      });
    }
    res.status(400);
  } else if (
    // ticket is not solved
    ticketSolved === ticketNotSolvedOption.id
  ) {
    if (
      // initial new case form
      data.component_id === isTicketSolved.id
    ) {
      res
        .status(200)
        .json(newCaseForm({ isTicketSolved: ticketSolved, inputValues }));
    } else if (
      ticketLevel().options.some((level) => level.id === data.component_id)
    ) {
      res
        .status(200)
        .json(newCaseForm({ isTicketSolved: ticketSolved, inputValues }));
    } else if (data.component_id === ticketCaseSubmit.id) {
      console.log("send unsolved case to salesforce");
      // create salesforce case
      const users = await getPayfitAdmin(data.customer.user_id);
      const caseLevel = ticketLevel().options.find(
        (level) => level.id === inputValues["ticket-level"]
      );
      const salesforceCase = {
        Subject: inputValues["ticket-subject"],
        Description: inputValues["ticket-description"],
        // Organisme_Contact__c: caseType.text,
        FR_Level__c: caseLevel.text,
        Billing_Account__c: users[0].Billing_Account__c,
        Payfit_Admin__c: users[0].Id,
      };
      if (inputValues["ticket-level"] === "ticket-level-escalation") {
        const specificEscalation = ticketEscalation().options.find(
          (escalation) => escalation.id === inputValues["ticket-escalation"]
        );
        salesforceCase.FR_Specific_Escalation__c = specificEscalation.text;
        salesforceCase.FR_Specific_Escalation_Comment__c =
          inputValues["ticket-escalation-comment"];
      } else if (inputValues["ticket-level"] === "ticket-level-decla") {
        const declaOrganism = ticketDeclaOrganism().options.find(
          (declaOrganism) => declaOrganism.id === "ticket-decla-cpam"
        );
        salesforceCase.Organisme_Contact__c = declaOrganism.text;
      }
      const newCase = await createCase(salesforceCase);
      const cases = await getOpenCasesFromCompany(users[0].Billing_Account__c);
      res.status(200).json({
        canvas: {
          content: {
            components: [
              {
                type: "text",
                text: "New unsolved case created",
              },
              {
                type: "button",
                id: "new-case-url",
                label: "Open case in salesforce",
                style: "link",
                action: {
                  type: "url",
                  url: `${process.env.SALESFORCE_CONSOLE_URL}/r/Case/${newCase.id}/view`,
                },
              },
            ],
          },
        },
      });
    }
  } else {
    res.status(200).json(newSolvedCaseForm());
  }
});

(async () => {
  // connect to salesforce
  try {
    await connect();
  } catch (err) {
    throw new Error("Cannot connect to salesforce");
  }
  console.log("Connected to Salesforce");
  app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
  });
})();
