const IconButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {

  return <button {...props} type="button" className="group-hover:flex hidden items-center justify-center w-10 h-10"></button>;
};

export default IconButton
