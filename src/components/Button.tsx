import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode: string;
  text: string;
}

const Button = ({ mode, text, ...props }: ButtonProps) => {
  return (
    <>
      {mode === "white" && (
        <button
          {...props}
          className="bg-white text-black text-center text-xl border border-gray-400 font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base"
        >
          {text}
        </button>
      )}

      {mode === "brown" && (
        <button
          {...props}
          className="text-white bg-secondaryBrown text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base"
        >
          {text}
        </button>
      )}

      {mode === "black" && (
        <button
          {...props}
          className="text-white bg-black text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base hover:bg-gray-800 transition-colors"
        >
          {text}
        </button>
      )}

      {mode === "transparent" && (
        <button
          {...props}
          className="text-white border-white border-2 text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base"
        >
          {text}
        </button>
      )}

      {mode === "disabled" && (
        <button
          {...props}
          className="text-gray-400 bg-gray-300 text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base cursor-not-allowed"
          disabled
        >
          {text}
        </button>
      )}
    </>
  );
};
export default Button;
