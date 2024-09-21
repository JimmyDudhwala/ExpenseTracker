function Input(prop) {
  const { className, label, id, name, value, onChange, error } = prop;
  return (
    <>
      <div className={className}>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={name} value={value || ''} onChange={onChange} />
        {error && <span className="error-message">{error}</span>}
      </div>
    </>
  );
}

export default Input;