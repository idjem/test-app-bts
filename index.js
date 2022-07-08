const express = require("express");
const { getCategory } = require("./categories");
const app = express();
require("dotenv").config();

const { salesforceUser, newSolvedCaseForm } = require("./data");
const { newCase } = require("./forms");
const { generateForm } = require("./utils");

const {
  getPayfitAdmin,
  getContact,
  getBillingAccount,
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
  res.status(200).json(
    salesforceUser({
      payfitAdminUser: user,
      contact: contact[0],
      billingAccount: billingAccount[0],
    })
  );
});

app.post("/new-case", async (req, res) => {
  const data = req.body;
  const inputValues = data.input_values;
  const ticketSolved = inputValues["is-case-solved"];

  // submit the solved case form
  if (
    data.component_id === "is-case-solved" &&
    ticketSolved === "case-solved"
  ) {
    // create salesforce case
    const users = await getPayfitAdmin(data.customer.user_id);
    const caseCategory = getCategory(inputValues["case-category"]);
    const subCategory = caseCategory.subCategories.find(
      (subCategory) => subCategory.id === inputValues["case-subcategory"]
    );
    let subCategory2 = undefined;
    if (subCategory.subCategories2) {
      subCategory2 = subCategory.subCategories2.find(
        (subCategory2) => subCategory2.id === inputValues["case-subcategory2"]
      );
    }
    const caseType = ticketType().options.find(
      (type) => type.id === inputValues["case-type"]
    );
    const salesforceCase = {
      Subject: inputValues["subject"],
      Description: inputValues["description"],
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
  } else if (
    data.component_id === "is-case-solved" &&
    ticketSolved === "case-unsolved"
  ) {
    console.log("send unsolved case to salesforce");
    // create salesforce case
    const users = await getPayfitAdmin(data.customer.user_id);
    const caseLevel = ticketLevel().options.find(
      (level) => level.id === inputValues["case-level"]
    );
    const salesforceCase = {
      Subject: inputValues["case-subject"],
      Description: inputValues["case-description"],
      // Organisme_Contact__c: caseType.text,
      FR_Level__c: caseLevel.text,
      Billing_Account__c: users[0].Billing_Account__c,
      Payfit_Admin__c: users[0].Id,
    };
    if (inputValues["case-level"] === "case-level-escalation") {
      const specificEscalation = ticketEscalation().options.find(
        (escalation) => escalation.id === inputValues["case-escalation"]
      );
      salesforceCase.FR_Specific_Escalation__c = specificEscalation.text;
      salesforceCase.FR_Specific_Escalation_Comment__c =
        inputValues["case-escalation-comment"];
    } else if (inputValues["case-level"] === "case-level-decla") {
      const declaOrganism = ticketDeclaOrganism().options.find(
        (declaOrganism) => declaOrganism.id === "case-decla-cpam"
      );
      salesforceCase.Organisme_Contact__c = declaOrganism.text;
    }
    const newCase = await createCase(salesforceCase);
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
  } else {
    const form = [...generateForm(newCase, inputValues)];
    res.status(200).json({
      canvas: {
        content: {
          components: form,
        },
      },
    });
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
