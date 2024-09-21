function Select(prop) {
  const {
    className,
    label,
    id,
    name,
    value,
    onChange,
    defaultOption,
    options,
    error,
  } = prop;
  return (
    <>
      <div className={className}>
        <label htmlFor={id} >{label}</label>
        <select id={id} name={name} value={value} onChange={onChange}>
          {
          defaultOption && <option value="" hidden>
            {defaultOption}
          </option>
          }
          {
          options.map((option, index) => ( 
            <option key={index} value={option}> 
              {option}
            </option>
          ))
          }
        </select>
        {error && <p className="error-message">{error}</p>} 
      </div>
    </>
  );
}

export default Select;

