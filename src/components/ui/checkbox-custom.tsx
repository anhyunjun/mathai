import React from "react";
import { Check, Minus } from "lucide-react";

export interface CheckboxProps {
  /**
   * The checked state of the checkbox
   */
  checked?: boolean;
  /**
   * The indeterminate state of the checkbox
   */
  indeterminate?: boolean;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is focused
   */
  focused?: boolean;
  /**
   * Whether the checkbox has an error
   */
  error?: boolean;
  /**
   * Whether the checkbox has success state
   */
  success?: boolean;
  /**
   * The label for the checkbox
   */
  label?: string;
  /**
   * Optional helper text to display below the label
   */
  helperText?: string;
  /**
   * Whether the label is optional
   */
  optional?: boolean;
  /**
   * The onChange handler
   */
  onChange?: (checked: boolean) => void;
  /**
   * The name of the checkbox
   */
  name?: string;
  /**
   * The id of the checkbox
   */
  id?: string;
}

/**
 * Checkbox component that follows the design system
 */
export const Checkbox = ({
  checked = false,
  indeterminate = false,
  disabled = false,
  focused = false,
  error = false,
  success = false,
  label,
  helperText,
  optional = false,
  onChange,
  name,
  id,
}: CheckboxProps) => {
  // Determine the checkbox state classes
  const getCheckboxClasses = () => {
    const baseClasses = "w-5 h-5 rounded";

    if (indeterminate) {
      if (disabled) {
        return `${baseClasses} bg-gray-100`;
      }
      if (focused) {
        return `${baseClasses} bg-[#835eeb] border-2 border-[#4880ee]`;
      }
      if (error) {
        return `${baseClasses} bg-[#835eeb]`;
      }
      if (success) {
        return `${baseClasses} bg-[#835eeb]`;
      }
      return `${baseClasses} bg-[#835eeb]`;
    }

    if (checked) {
      if (disabled) {
        return `${baseClasses} bg-gray-100`;
      }
      if (focused) {
        return `${baseClasses} bg-[#835eeb] border-2 border-[#4880ee]`;
      }
      if (error) {
        return `${baseClasses} bg-[#835eeb]`;
      }
      if (success) {
        return `${baseClasses} bg-[#835eeb]`;
      }
      return `${baseClasses} bg-[#835eeb]`;
    }

    // Unchecked states
    if (disabled) {
      return `${baseClasses} bg-gray-100`;
    }
    if (focused) {
      return `${baseClasses} border-2 border-[#4880ee]`;
    }
    if (error) {
      return `${baseClasses} border-2 border-[#f22735]`;
    }
    if (success) {
      return `${baseClasses} border-2 border-gray-200`;
    }
    return `${baseClasses} border-2 border-gray-200`;
  };

  // Determine helper text color
  const getHelperTextColor = () => {
    if (error) return "text-[#f22735]";
    if (success) return "text-[#1fcca1]";
    return "text-[#8d94a0]";
  };

  // Handle checkbox change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e.target.checked);
  };

  return (
    <div className="flex items-start gap-2">
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          name={name}
          id={id}
          className="sr-only" // Visually hidden but accessible
        />
        <div className={getCheckboxClasses()}>
          {checked && !indeterminate && (
            <div className="flex items-center justify-center h-full">
              <Check className="h-3.5 w-3.5 text-white" />
            </div>
          )}
          {indeterminate && (
            <div className="flex items-center justify-center h-full">
              <Minus className="h-3.5 w-3.5 text-white" />
            </div>
          )}
        </div>
      </div>

      {label && (
        <div className="flex-col justify-center items-start gap-0.5">
          <div className="self-stretch flex items-start gap-1">
            <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
              {label}
            </div>
            {optional && (
              <div className="text-[#8d94a0] text-sm font-medium font-pretendard leading-[21px]">
                (선택)
              </div>
            )}
          </div>
          {helperText && (
            <div
              className={`${getHelperTextColor()} text-xs font-medium font-pretendard leading-[18px]`}
            >
              {helperText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * CheckboxGroup component to display a group of checkboxes
 */
export const CheckboxGroup = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-base font-bold font-pretendard text-[#33373b] leading-normal">
          {title}
        </h3>
      )}
      <div>{children}</div>
    </div>
  );
};

/**
 * CheckboxDemo component to showcase different checkbox states
 */
export const CheckboxDemo = () => {
  return (
    <div className="w-full bg-white p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-mulish text-[#5c5c5c] mb-6">
          Checkbox
        </h2>

        {/* Checkbox Input Section */}
        <div className="mb-8">
          <h3 className="text-base font-bold font-pretendard text-[#33373b] mb-4">
            Checkbox Input
          </h3>

          <div className="flex gap-8 mb-2">
            <span className="text-sm font-medium font-pretendard text-[#33373b]">
              Default
            </span>
            <span className="text-sm font-medium font-pretendard text-[#33373b]">
              Disabled
            </span>
            <span className="text-sm font-medium font-pretendard text-[#33373b]">
              Focused
            </span>
            <span className="text-sm font-medium font-pretendard text-[#33373b]">
              Error
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4 border border-[#9747ff] rounded-[5px] p-4">
            <div className="flex flex-col gap-6">
              <Checkbox />
              <Checkbox checked />
              <Checkbox indeterminate />
            </div>

            <div className="flex flex-col gap-6">
              <Checkbox disabled />
              <Checkbox checked disabled />
              <Checkbox indeterminate disabled />
            </div>

            <div className="flex flex-col gap-6">
              <Checkbox focused />
              <Checkbox checked focused />
              <Checkbox indeterminate focused />
            </div>

            <div className="flex flex-col gap-6">
              <Checkbox error />
              <Checkbox checked error />
              <Checkbox indeterminate error />
            </div>
          </div>
        </div>

        {/* Label Section */}
        <div className="mb-8">
          <h3 className="text-base font-bold font-pretendard text-[#33373b] mb-4">
            Label
          </h3>

          <div className="border border-[#9747ff] rounded-[5px] p-4 space-y-4">
            <Checkbox label="Label" />
            <Checkbox label="Label" optional />
          </div>
        </div>

        {/* Checkbox Section */}
        <div>
          <h3 className="text-base font-bold font-pretendard text-[#33373b] mb-4">
            Checkbox
          </h3>

          <div className="flex gap-8 mb-2">
            <span className="text-sm font-medium font-pretendard text-[#33373b]">
              Default
            </span>
            <span className="text-sm font-medium font-pretendard text-[#33373b]">
              Disabled
            </span>
            <span className="text-sm font-medium font-pretendard text-[#33373b]">
              Focused
            </span>
            <span className="text-sm font-medium font-pretendard text-[#33373b]">
              Error
            </span>
            <span className="text-sm font-medium font-pretendard text-[#33373b]">
              Success
            </span>
          </div>

          <div className="grid grid-cols-5 gap-4 border border-[#9747ff] rounded-[5px] p-4">
            {/* Default Column */}
            <div className="flex flex-col gap-6">
              <Checkbox label="Label" helperText="Helper Text" />
              <Checkbox label="Label" helperText="Helper Text" checked />
              <Checkbox label="Label" helperText="Helper Text" indeterminate />
            </div>

            {/* Disabled Column */}
            <div className="flex flex-col gap-6">
              <Checkbox label="Label" helperText="Helper Text" disabled />
              <Checkbox
                label="Label"
                helperText="Helper Text"
                checked
                disabled
              />
              <Checkbox
                label="Label"
                helperText="Helper Text"
                indeterminate
                disabled
              />
            </div>

            {/* Focused Column */}
            <div className="flex flex-col gap-6">
              <Checkbox label="Label" helperText="Helper Text" focused />
              <Checkbox
                label="Label"
                helperText="Helper Text"
                checked
                focused
              />
              <Checkbox
                label="Label"
                helperText="Helper Text"
                indeterminate
                focused
              />
            </div>

            {/* Error Column */}
            <div className="flex flex-col gap-6">
              <Checkbox label="Label" helperText="Helper Text" error />
              <Checkbox label="Label" helperText="Helper Text" checked error />
              <Checkbox
                label="Label"
                helperText="Helper Text"
                indeterminate
                error
              />
            </div>

            {/* Success Column */}
            <div className="flex flex-col gap-6">
              <Checkbox label="Label" helperText="Helper Text" success />
              <Checkbox
                label="Label"
                helperText="Helper Text"
                checked
                success
              />
              <Checkbox
                label="Label"
                helperText="Helper Text"
                indeterminate
                success
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * CheckboxGroupDemo component to showcase the checkbox group design from Figma
 */
export const CheckboxGroupDemo = () => {
  return (
    <div className="w-[1043px] h-[956px] relative bg-white overflow-hidden">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-mulish text-[#5c5c5c] mb-6">
          Checkbox Group
        </h2>

        {/* Header section with border */}
        <div className="w-full border-b border-gray-200 mb-8"></div>

        {/* Checkbox Group Option Section */}
        <div className="mb-8">
          <h3 className="text-base font-bold font-pretendard text-[#33373b] mb-4">
            Checkbox Group Option
          </h3>

          <div className="flex gap-8 mb-2">
            <span className="text-sm font-medium font-pretendard text-[#33373b]">
              Default
            </span>
            <span className="text-sm font-medium font-pretendard text-[#33373b]">
              Disabled
            </span>
            <span className="text-sm font-medium font-pretendard text-[#33373b]">
              Focused
            </span>
          </div>

          <div className="flex mb-4">
            <div className="text-sm font-medium font-pretendard text-[#33373b] mr-8 text-right w-24">
              Default
            </div>
            <div className="w-[297px] rounded-[5px] border border-[#9747ff] p-4 grid grid-cols-3 gap-4">
              {/* Default column */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded border-2 border-gray-200"></div>
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
              </div>

              {/* Disabled column */}
              <div className="flex items-center gap-2">
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
                <div className="w-5 h-5 bg-gray-100 rounded"></div>
              </div>

              {/* Focused column */}
              <div className="flex items-center gap-2">
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
                <div className="p-0.5 rounded border-2 border-[#4880ee]">
                  <div className="w-5 h-5 rounded border-2 border-gray-200"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex mb-4">
            <div className="text-sm font-medium font-pretendard text-[#33373b] mr-8 text-right w-24">
              Checked
            </div>
            <div className="w-[297px] rounded-[5px] border border-[#9747ff] p-4 grid grid-cols-3 gap-4">
              {/* Default column */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#835eeb] rounded flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
              </div>

              {/* Disabled column */}
              <div className="flex items-center gap-2">
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
                <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
              </div>

              {/* Focused column */}
              <div className="flex items-center gap-2">
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
                <div className="p-0.5 rounded border-2 border-[#4880ee]">
                  <div className="w-5 h-5 bg-[#835eeb] rounded flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex mb-4">
            <div className="text-sm font-medium font-pretendard text-[#33373b] mr-8 text-right w-24">
              Indeterminate
            </div>
            <div className="w-[297px] rounded-[5px] border border-[#9747ff] p-4 grid grid-cols-3 gap-4">
              {/* Default column */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#835eeb] rounded flex items-center justify-center">
                  <Minus className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
              </div>

              {/* Disabled column */}
              <div className="flex items-center gap-2">
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
                <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                  <Minus className="h-3.5 w-3.5 text-white" />
                </div>
              </div>

              {/* Focused column */}
              <div className="flex items-center gap-2">
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
                <div className="p-0.5 rounded border-2 border-[#4880ee]">
                  <div className="w-5 h-5 bg-[#835eeb] rounded flex items-center justify-center">
                    <Minus className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkbox Group Label Section */}
        <div className="mb-8">
          <h3 className="text-base font-bold font-pretendard text-[#33373b] mb-4">
            Checkbox Group Label
          </h3>

          <div className="flex mb-4">
            <div className="text-sm font-medium font-pretendard text-[#33373b] mr-8 text-right w-24">
              Default
            </div>
            <div className="w-[117px] rounded-[5px] border border-[#9747ff] p-4">
              <div className="flex-col justify-start items-start gap-0.5">
                <div className="flex items-center gap-1">
                  <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                    Label
                  </div>
                </div>
                <div className="text-[#8d94a0] text-xs font-medium font-pretendard leading-[18px]">
                  Helper text
                </div>
              </div>
            </div>
          </div>

          <div className="flex mb-4">
            <div className="text-sm font-medium font-pretendard text-[#33373b] mr-8 text-right w-24">
              Error
            </div>
            <div className="w-[117px] rounded-[5px] border border-[#9747ff] p-4">
              <div className="flex-col justify-start items-start gap-0.5">
                <div className="flex items-center gap-1">
                  <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                    Label
                  </div>
                </div>
                <div className="text-[#f22735] text-xs font-medium font-pretendard leading-[18px]">
                  Error text
                </div>
              </div>
            </div>
          </div>

          <div className="flex mb-4">
            <div className="text-sm font-medium font-pretendard text-[#33373b] mr-8 text-right w-24">
              Success
            </div>
            <div className="w-[117px] rounded-[5px] border border-[#9747ff] p-4">
              <div className="flex-col justify-start items-start gap-0.5">
                <div className="flex items-center gap-1">
                  <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                    Label
                  </div>
                </div>
                <div className="text-[#1fcca1] text-xs font-medium font-pretendard leading-[18px]">
                  Success text
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Label Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold font-pretendard text-[#33373b] mb-4">
            Label
          </h3>

          <div className="w-[251px] rounded-[5px] border border-[#9747ff] p-4">
            <div className="mb-4 flex items-center gap-1">
              <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                Label
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                Label
              </div>
              <div className="text-[#8d94a0] text-sm font-medium font-pretendard leading-[21px]">
                (선택)
              </div>
            </div>
          </div>
        </div>

        {/* Checkbox Group Example Section */}
        <div>
          <h3 className="text-base font-bold font-pretendard text-[#33373b] mb-4">
            Checkbox Group Example
          </h3>

          <div className="space-y-3">
            <div className="flex-col justify-start items-start gap-0.5">
              <div className="flex items-center gap-1 mb-1">
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Label
                </div>
              </div>
              <div className="text-[#8d94a0] text-xs font-medium font-pretendard leading-[18px] mb-3">
                Helper text
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded border-2 border-gray-200"></div>
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded border-2 border-gray-200"></div>
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded border-2 border-gray-200"></div>
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded border-2 border-gray-200"></div>
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded border-2 border-gray-200"></div>
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded border-2 border-gray-200"></div>
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded border-2 border-gray-200"></div>
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded border-2 border-gray-200"></div>
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded border-2 border-gray-200"></div>
                <div className="text-[#575c64] text-sm font-medium font-pretendard leading-[21px]">
                  Option
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxDemo;
