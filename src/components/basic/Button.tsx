import cx from "@/utils/class-names/cx";

export type ButtonProps = {
  style: "primary";
  type: "submit";
  label: string;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      className={cx(
        "block w-full rounded-md py-1.5",
        "text-sm leading-6 text-white",
        "bg-purple-800 hover:bg-purple-900 shadow-sm",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800"
      )}
      type={props.type}
    >
      {props.label}
    </button>
  );
}
