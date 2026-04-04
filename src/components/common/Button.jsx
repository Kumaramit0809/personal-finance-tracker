const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl px-4 py-3 font-medium transition-all duration-200
      ${disabled ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99] cursor-pointer"}
      ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;