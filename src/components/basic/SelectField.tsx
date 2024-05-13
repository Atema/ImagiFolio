import cx from "@/utils/class-names/cx";
import { SelectHTMLAttributes, forwardRef } from "react";

export type SelectFieldProps = {
  /** Label text to show with the input */
  label?: string;

  /** Options */
  options: Record<string, string>;
} & SelectHTMLAttributes<HTMLSelectElement>;

/**
 * A styled input field with label
 *
 * @component
 * @param props - See {@link SelectFieldProps}. Reference and additional
 * properties will be passed to the internal select element
 */
const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, ...selectProps }, ref) => (
    <label className="block text-sm leading-6">
      {label && <div className="text-gray-dim mb-1">{label}</div>}
      <div>
        <select
          {...selectProps}
          className={cx(
            "block w-full rounded-md py-1.5 text-sm leading-6",
            "bg-gray-3 dark:bg-graydark-3",
            "text-gray-12 dark:text-graydark-12 placeholder:text-gray-10 dark:placeholder:text-graydark-10",
            "border-gray-7 dark:border-graydark-7",
            "focus:border-plum-7 dark:focus:border-plumdark-7",
            selectProps.className,
          )}
          ref={ref}
        >
          {Object.entries(options).map(([key, name]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </label>
  ),
);

SelectField.displayName = "SelectField";
export default SelectField;
