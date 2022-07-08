const getOptionValue = (formObject, valueId) => {
  for (const [_, inputObject] of formObject) {
    if (
      inputObject.type === "dropdown" ||
      inputObject.type === "single-select"
    ) {
      if (inputObject.options.has(valueId)) {
        return inputObject.options.get(valueId).text;
      } else {
        for (const [_, optionObject] of inputObject.options) {
          if (optionObject.nextStep) {
            const value = getOptionValue(optionObject.nextStep, valueId);
            if (value) return value;
          }
        }
      }
    }
  }
};

const getValue = (inputObject, inputValue) => {
  if (inputValue === undefined) return inputObject.defaultValue;
  return inputValue !== "" ? inputValue : undefined;
};

const matchField = (id, inputObject, componentId) => {
  switch (inputObject.type) {
    case "single-select":
    case "dropdown": {
      return inputObject.options.has(componentId);
    }
    default:
      return id === componentId;
  }
};

const generateOptions = (optionObject) => {
  const options = [];
  let hasSubmit = false;

  if (optionObject.length < 2) {
    throw new Error("Input options should have at least 2 options");
  }
  for (const [key, option] of optionObject) {
    options.push({
      type: "option",
      id: key,
      text: option.text,
    });
    if (option.nextStep) hasSubmit = true;
  }
  return { options, hasSubmit };
};

const generateSingleSelect = (id, inputObject, inputValue) => {
  const { options, hasSubmit } = generateOptions(inputObject.options);

  return {
    id: id,
    type: "single-select",
    label: inputObject.label,
    value: getValue(inputObject, inputValue),
    options,
    action: hasSubmit ? { type: "submit" } : undefined,
  };
};

const generateInput = (id, inputObject, inputValue) => {
  return {
    type: "input",
    id,
    label: inputObject.label,
    placeholder: inputObject.placeholder,
    value: getValue(inputObject, inputValue),
  };
};

const generateDropdown = (id, inputObject, inputValue) => {
  const { options, hasSubmit } = generateOptions(inputObject.options);
  return {
    type: "dropdown",
    id,
    label: inputObject.label,
    value: getValue(inputObject, inputValue),
    options,
    action: hasSubmit ? { type: "submit" } : undefined,
  };
};

const generateTextArea = (id, inputObject, inputValue) => {
  return {
    type: "textarea",
    id,
    label: inputObject.label,
    value: getValue(inputObject, inputValue),
  };
};

const generateButton = (id, inputObject) => {
  return {
    type: "button",
    id,
    label: inputObject.label,
    style: inputObject.style,
    action: inputObject.action,
  };
};

const generateForm = function* (formObject, inputValues, componentId) {
  for (const [id, inputObject] of formObject) {
    switch (inputObject.type) {
      case "single-select":
        yield generateSingleSelect(id, inputObject, inputValues?.[id]);
        break;
      case "input":
        yield generateInput(id, inputObject, inputValues?.[id]);
        break;
      case "dropdown":
        yield generateDropdown(id, inputObject, inputValues?.[id]);
        break;
      case "textarea":
        yield generateTextArea(id, inputObject, inputValues?.[id]);
        break;
      case "button":
        yield generateButton(id, inputObject);
        break;
    }
    // generate next step field has next step value
    if (inputValues?.[id] && inputObject.options?.has(inputValues?.[id])) {
      const optionObject = inputObject.options.get(inputValues?.[id]);
      if (optionObject.nextStep) {
        // next steps of a submit action component must have empty values (otherwise, fields may contain previous form values)
        const nextInputValues = !matchField(id, inputObject, componentId)
          ? inputValues
          : {};
        yield* generateForm(
          optionObject.nextStep,
          nextInputValues,
          componentId
        );
      }
    }
  }
};

module.exports = {
  generateForm,
  getOptionValue,
};
