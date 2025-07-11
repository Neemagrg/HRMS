function Button({
  children,
  onClick,
  type = "buttons",

  icon = null,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={"p-1.5 text-white bg-black rounded cursor-pointer text-md inline-flex items-center gap-1"}
    >
      {icon && <span className="">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;