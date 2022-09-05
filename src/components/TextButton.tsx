import { JSX } from "solid-js";

const TextButton = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      class="disabled:bg-gray-100 disabled:opacity-50 bg-gray-100 rounded px-1 py-1 border-black border hover:bg-gray-200"
      {...props}
    ></button>
  );
};

export default TextButton;
