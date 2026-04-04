const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  name,
  required = false,
  children,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {children ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          required={required}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      )}
    </div>
  );
};

export default Input;