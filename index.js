const express = require("express");
const app = express();

const { salesforcePreview, newSolvedCaseForm } = require("./data");
const {
  ticketSolvedOption,
  isTicketSolved,
  ticketCategory,
  ticketSubCategories,
  ticketSolvedSubmit,
} = require("./forms");

app.use(express.json());

app.post("/salesforce", (req, res) => {
  res.status(200).json(salesforcePreview);
});

app.post("/init-new-case", (req, res) => {
  res.status(200).json(newSolvedCaseForm());
});

app.post("/new-case", (req, res) => {
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
      console.log("sends solved ticket to salesforce");
      console.log(inputValues);
      res.status(200).json({ ok: "ok", values: inputValues });
    }
    res.status(400);
  } else {
    res.status(200).json(newSolvedCaseForm());
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
