const express = require("express");
const app = express();
require("dotenv").config();

const { salesforceUser, convertInputToCase } = require("./case/data");
const { newCase } = require("./case/forms");
const { generateForm } = require("./utils");

const {
  getPayfitAdmin,
  getContact,
  getBillingAccount,
  createCase,
  connect,
  getCaseLink,
} = require("./salesForce");

app.use(express.json());

app.post("/salesforce", async (req, res) => {
  const data = req.body;
  console.log("DEBUG =========== HEADER", req.header("X-Body-Signature"));
  console.log("DEBUG ======= BODY", JSON.stringify(data, null, 2));
  const user = await getPayfitAdmin(data.customer.user_id);
  if (!user) {
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
  const contact = await getContact(user.contact__c);
  const billingAccount = await getBillingAccount(user.billingAccount);
  const response = salesforceUser({
    payfitAdminUser: user,
    contact: contact[0],
    billingAccount: billingAccount[0],
  });
  res.status(200).json(response);
});

app.post("/new-case", async (req, res) => {
  const data = req.body;
  const inputValues = data.input_values;

  // submit the solved case form
  if (data.component_id === "case-submit") {
    // create salesforce case
    const payfitAdmin = await getPayfitAdmin(data.customer.user_id);
    const salesforceCase = convertInputToCase(
      payfitAdmin.Id,
      payfitAdmin.Billing_Account__c,
      inputValues
    );
    const newCase = await createCase(salesforceCase);
    return res.status(200).json({
      canvas: {
        content: {
          components: [
            {
              type: "text",
              text: "New case created",
            },
            {
              type: "button",
              id: "new-case-url",
              label: "Open case in salesforce",
              style: "link",
              action: {
                type: "url",
                url: getCaseLink(newCase.id),
              },
            },
          ],
        },
      },
    });
  } else {
    // generate a form
    const form = [...generateForm(newCase, inputValues, data.component_id)];
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
