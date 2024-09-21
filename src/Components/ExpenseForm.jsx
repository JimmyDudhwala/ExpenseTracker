import { useState } from "react";

import Input from "./Input";
import Select from "./Select";

function ExpenseForm(prop) {
  const { setExpenses, expense, setExpense, edit, setEdit } = prop;

  //// method 1

  // const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  // const [amount, setAmount] = useState("");

  ////same as above \\\\\

  // const [expense, setExpense] = useState({
  //   title: "",
  //   category: "",
  //   amount: "",
  //   // email: "",
  // });

  //// method 2

  // const getFormData = (form) => {
  //   const formData = new FormData(form);
  //   const data = {};
  //   for (const [key, value] of formData) {
  //     console.log(`${key}: ${value}`);
  //     data[key] = value;
  //   }
  //   return data;
  // };

  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 5, message: "Title should be at least 5 characters long" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [
      { required: true, message: "Please enter an amount" },
      {
        pattern: /^\d+(\.\d+)?$/,
        message: "Please enter a valid Number",
      },
    ],
    // email: [
    //   { required: true, message: 'Please enter an email' },
    //   {
    //     pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //     message: 'Please enter a valid email',
    //   },
    // ],
  };

  const validate = (formData) => {
    const errorsData = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (validationConfig[key]) {
        validationConfig[key].some((rule) => {
          if (rule.required && !value) {
            errorsData[key] = rule.message;
            return true;
          }
          if (rule.minLength && value.length < rule.minLength) {
            errorsData[key] = rule.message;
            return true;
          }
          if (rule.pattern && !rule.pattern.test(value)) {
            errorsData[key] = rule.message;
            return true;
          }
        });
      }
    });
    setErrors(errorsData);
    return errorsData;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value, //if we dont use [ ] then the object will have a property name instead of title
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = validate(expense);

    if (!edit) {
      setExpenses((prevExpenses) => {
        const index = prevExpenses.findIndex((exp) => exp.id === expense.id);
        const updatedExpenses = [...prevExpenses];
        updatedExpenses[index] = expense;
       if (Object.keys(validateResult).length) return prevExpenses;
        return updatedExpenses;
      });
      setEdit(true);
      setExpense({
        title: "",
        category: "",
        amount: "",
        email: "",
      });
      return;
    }

    if (Object.keys(validateResult).length) return;

    setExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        ...expense,
        id: crypto.randomUUID(),
      },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
      email: "",
    });

    //  const formData = getFormData(e.target);
    //   setExpenses((prevExpenses) => [...prevExpenses,
    //       {...formData,
    //           id: crypto.randomUUID()}
    //   ],
    // )
    // console.log({...formData, id: crypto.randomUUID()});
  };

  return (
    <>
      <form className="expense-form" onSubmit={handleSubmit}>
        <Input
          className="input-container"
          label="Title"
          id="title"
          name="title"
          value={expense.title}
          onChange={handleChange}
          error={errors.title}
        />

        <Select
          className="select-container"
          label="Category"
          id="category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          defaultOption="Select Category"
          options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
          error={errors.category}
        />

        <Input
          className="input-container"
          label="Amount"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          error={errors.amount}
        />
        {/* <Input
        className="input-container"
        label="Email"
        id="email"
        name="email"
        value={expense.email}
        onChange={handleChange}
        error={errors.email}
      /> */}
        <button className="add-btn">{edit ? `Add` : `Save`}</button>
      </form>
    </>
  );
}

export default ExpenseForm;
