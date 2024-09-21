/* eslint-disable react/prop-types */

export default function ContextMenu({
  menuPosition,
  setMenuPosition,
  expenses,
  setExpenses,
  rowId,
  setEdit,
  setExpense,
}) {
  if (!menuPosition.left) return null;

  return (  
    <div className="context-menu" style={{ ...menuPosition }}>
      <div
        onClick={() => {
          const editEL = expenses.find((exp) => exp.id === rowId);
          setExpense(editEL);
          setEdit(false);
          setMenuPosition({});
          
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setExpenses((prevState) =>
            prevState.filter((exp) => exp.id !== rowId)
          );
          
          setMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
}