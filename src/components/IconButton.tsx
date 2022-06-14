import { JSX } from "solid-js";

const IconButton = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      tabIndex={-1}
      {...props}
      type="button"
      class={`group-hover:flex hidden items-center justify-center w-10 h-10 ${
        props.class ?? ""
      }`}
    ></button>
  );
};

export default IconButton;
