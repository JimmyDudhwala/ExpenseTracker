import {  useState } from "react";
import "./App.css";

import ExpenseForm from "./Components/ExpenseForm";
import ExpenseTable from "./Components/ExpenseTable";
import expenseData from "./expenseData";
import UseLocal from "./hook/useLocal";
import useLocal from "./hook/useLocal";

function App() {

  const [expenses, setExpenses] = useLocal("expenseData", expenseData);
  const [edit, setEdit] = useState(true);
  const [expense, setExpense] = UseLocal("expense", {
    
    title: "",
    category: "",
    amount: "",
    // email: "",
  });

  return (
    <>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
         <ExpenseForm setExpenses={setExpenses} expense={expense} setExpense={setExpense} edit={edit} setEdit={setEdit} />
         <ExpenseTable expenses={expenses} setExpenses={setExpenses} expense={expense} setExpense={setExpense} setEdit={setEdit} />
        
          
        </div>
      </main>
    </>
  );
}

export default App;
