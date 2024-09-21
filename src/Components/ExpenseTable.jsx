/* eslint-disable react/prop-types */
import { useState } from "react";
import { useFilter } from "./useFilter";
import ContextMenu from "./ContextMenu";

export default function ExpenseTable({
  expenses,
  setExpenses,
  expense,
  setExpense,
  setEdit,
}) {
  const [filteredData, setQuery] = useFilter(expenses, (data) => data.category);
  const [menuPosition, setMenuPosition] = useState({});
  const [rowId, setRowId] = useState("");
  const [sortCallback, setSortCallback] = useState(null);
  const [alphaSortCallback, setAlphaSortCallback] = useState(null);
  const [sort, setSort] = useState(false);

  const total = filteredData.reduce(
    (accumulator, current) => accumulator + parseInt(current.amount),
    0
  );

  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        setMenuPosition={setMenuPosition}
        expenses={expenses}
        expense={expense}
        setExpense={setExpense}
        setExpenses={setExpenses}
        rowId={rowId}
        setEdit={setEdit}
      />
      <table className="expense-table" onClick={() => setMenuPosition({})}>
        <thead>
          <tr>
            <th
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Title
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() => {
                    setSort(true);
                    setAlphaSortCallback(
                      () => (a, b) => a.title.localeCompare(b.title)
                    );
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => {
                    setSort(true);
                    setAlphaSortCallback(
                      () => (a, b) => b.title.localeCompare(a.title)
                    );
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>

            <th>
              <select onChange={(e) => setQuery(e.target.value.toLowerCase())}>
                <option value="">All</option>
                <option value="grocery">Grocery</option>
                <option value="clothes">Clothes</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() => {
                    setSort(true);
                    setSortCallback(() => (a, b) => a.amount - b.amount);
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => {
                    setSort(true);
                    setSortCallback(() => (a, b) => b.amount - a.amount);
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .sort(sortCallback || alphaSortCallback || (() => 0))
            .map(({ id, title, category, amount }) => (
              <tr
                key={id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setMenuPosition({
                    left: e.clientX + 4,
                    top: e.clientY + 4,
                    display: "block",
                  });
                  setRowId(id);
                }}
              >
                <td>{title}</td>
                <td>{category}</td>
                <td>₹{amount}</td>
              </tr>
            ))}
          <tr>
            <th>Total</th>
            <th>
              {
              sort ? (
                <button
                  onClick={() => {
                    setSortCallback(null);
                    setAlphaSortCallback(null);
                    setSort(false);
                  }}
                >
                  Clear Sort
                </button>
              ) : 
              null
              }
            </th>
            <th>₹{total}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}

//   /* eslint-disable react/prop-types */
// import { useState } from 'react'
// import { useFilter } from './useFilter'
// import ContextMenu from './ContextMenu'

// export default function ExpenseTable({ expenses, setExpenses, expense, setExpense, setEdit }) {
//   const [filteredData, setQuery] = useFilter(expenses, (data) => data.category)
//   const [menuPosition, setMenuPosition] = useState({})
//   const [rowId, setRowId] = useState('')
//   const [sortCallback, setSortCallback] = useState(() => () => {})
//   const [alhaSortCallback, setAlphaSortCallback] = useState(() => () => {})
//   const [ sort, setSort ] = useState(false)

//   const total = filteredData.reduce(
//     (accumulator, current) => accumulator + parseInt(current.amount),
//     0
//   )

//   return (
//     <>
//       <ContextMenu menuPosition={menuPosition} setMenuPosition={setMenuPosition} expenses={expenses} expense={expense} setExpense={setExpense} setExpenses={setExpenses} rowId={rowId} setEdit={setEdit}/>
//       <table className="expense-table" onClick={() => setMenuPosition({})}>
//         <thead>
//           <tr >
//             <th style={{display:'flex', justifyContent:"space-between", alignItems:'center'}}>Title
//               <div>
//               <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="10"
//                   viewBox="0 0 384 512"
//                   className="arrow up-arrow"
//                   onClick={() => {setSort(true);
//                     return setAlphaSortCallback(() => ((a, b) => a.title.localeCompare(b.title)))}}>

//                   <title>Ascending</title>
//                   <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
//                 </svg>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="10"
//                   viewBox="0 0 384 512"
//                   className="arrow down-arrow"
//                   onClick={() => {setSort(true);
//                   return setAlphaSortCallback(() => (a, b) => b.title.localeCompare(a.title))}}>

//                   <title>Descending</title>
//                   <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
//                 </svg>
//               </div>
//             </th>

//             <th>
//               <select onChange={(e) => setQuery(e.target.value.toLowerCase())}>
//                 <option value="">All</option>
//                 <option value="grocery">Grocery</option>
//                 <option value="clothes">Clothes</option>
//                 <option value="bills">Bills</option>
//                 <option value="education">Education</option>
//                 <option value="medicine">Medicine</option>
//               </select>
//             </th>
//             <th className="amount-column">
//               <div>
//                 <span>Amount</span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="10"
//                   viewBox="0 0 384 512"
//                   className="arrow up-arrow"
//                   onClick={() => setSortCallback(() => (a, b) => a.amount - b.amount) }
//                   >
//                   <title>Ascending</title>
//                   <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
//                 </svg>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="10"
//                   viewBox="0 0 384 512"
//                   className="arrow down-arrow"
//                   onClick={() => setSortCallback(() => (a, b) => b.amount - a.amount)}
//                   >
//                   <title>Descending</title>
//                   <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
//                 </svg>
//               </div>
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.sort(sortCallback || alhaSortCallback).map(({ id, title, category, amount }) => (
//             <tr
//             key={id}
//             onContextMenu={(e) => {
//               e.preventDefault()
//               setMenuPosition({ left: e.clientX + 4, top: e.clientY + 4, display: 'block' })
//               setRowId(id)
//             }}
//             >
//               <td>{title}</td>
//               <td>{category}</td>
//               <td>₹{amount}</td>
//             </tr>
//           ))}
//           <tr>
//             <th>Total</th>
//             <th onClick={!sort ? () => setSortCallback(() => () => {}) : () => setAlphaSortCallback(() => () => {})}><button>Clear Sort</button></th>
//             <th>₹{total}</th>
//           </tr>
//         </tbody>
//       </table>
//     </>
//   )

// import {  useEffect, useState } from "react";
// import "../App.css";
// import ContextMenu from "./ContextMenu";
// import { useFilter } from "./useFilter";

// function ExpenseTable(prop) {
//   const { expenses, setExpenses } = prop;

//   const [rowId, setRowId ] = useState("")

//   const total = filterData.reduce((acc, curr) => acc + curr.amount, 0);

//   const [position, setPosition] = useState({});

//   const removeContext = () => {
//     setPosition({});
//   };

//   // after the code run useEffect render and add eventLinsner to the code
//   useEffect(() => {
//     console.log("Expenses updated:", expenses); // Log the updated expenses
//   }, [expenses]);

//   console.log("Rendering table with expenses:", filterData);

//   return (
//     <div onClick={removeContext}>
//       <ContextMenu position={position} setExpenses={setExpenses} rowId={rowId} />
//       <table className="expense-table">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>
//               <select onChange={callback}>
//                 <option value="">All</option>
//                 <option value="grocery">Grocery</option>
//                 <option value="clothes">Clothes</option>
//                 <option value="bills">Bills</option>
//                 <option value="education">Education</option>
//                 <option value="medicine">Medicine</option>
//               </select>
//             </th>
//             <th className="amount-column">
//               <div>
//                 <span>Amount</span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="10"
//                   viewBox="0 0 384 512"
//                   className="arrow up-arrow"
//                 >
//                   <title>Ascending</title>
//                   <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
//                 </svg>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="10"
//                   viewBox="0 0 384 512"
//                   className="arrow down-arrow"
//                 >
//                   <title>Descending</title>
//                   <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
//                 </svg>
//               </div>
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {filterData.map(({ id, title, category, amount }) => (
//             <tr
//               key={id}
//               onContextMenu={(e) => {
//                 e.preventDefault()
//                 setPosition({ left: e.clientX + 4, top: e.clientY + 4, display: "block" });
//                 setRowId(id)
//               }}
//             >
//               <td>{title}</td>
//               <td>{category}</td>
//               <td>₹{amount}</td>
//             </tr>
//           ))}
//           <tr>
//             <th>Total</th>
//             <th></th>
//             <th>₹{total}</th>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ExpenseTable;

// }
