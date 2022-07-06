const express = require("express");
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
} = require("./forms");

const {
  init,
  getPayfitAdmin,
  getContact,
  getBillingAccount,
  getOpenCasesFromCompany,
} = require("./salesForce");

app.use(express.json());

app.post("/salesforce", async (req, res) => {
  const data = req.body;
  console.log("DEBUG =======>", JSON.stringify(data, null, 2));
  const conn = await init();
  const users = await getPayfitAdmin(conn, data.customer.user_id);
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
  const contact = await getContact(conn, user.contact__c);
  const billingAccount = await getBillingAccount(conn, user.billingAccount);
  const openCases = await getOpenCasesFromCompany(conn, user.billingAccount);
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
      res.status(200).json({ ok: "ok", values: inputValues });
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
      const conn = await init();
      console.log("connected to salesforce");
      res.status(200).json({
        canvas: {
          content: {
            components: {
              type: "text",
              text: "submited",
            },
          },
        },
      });
    }
  } else {
    res.status(200).json(newSolvedCaseForm());
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
