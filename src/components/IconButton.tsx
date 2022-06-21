import { Component, JSX } from "solid-js";

interface IconButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  show?: boolean;
}

const IconButton: Component<IconButtonProps> = (props) => {
  return (
    <button
      {...props}
      tabIndex={-1}
      type="button"
      class={`items-center justify-center hover:bg-gray-200 rounded-md w-10 h-10 ${
        props.class ?? ""
      }`}
      classList={{
        "group-hover:flex hidden": !props.show,
        flex: props.show,
      }}
    ></button>
  );
};

export default IconButton;
