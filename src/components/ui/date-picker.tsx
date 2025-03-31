import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";

export interface DatePickerProps {
  label?: string;
  optional?: boolean;
  helperText?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  className?: string;
}

const DatePicker = ({
  label,
  optional = false,
  helperText,
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  error = false,
  errorText,
  className,
}: DatePickerProps) => {
  const [date, setDate] = React.useState<Date | undefined>(value);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onChange) onChange(selectedDate);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDate(undefined);
    if (onChange) onChange(undefined);
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <div className="flex items-start">
          <span className="text-sm font-medium text-[#575c64]">{label}</span>
          {optional && (
            <span className="text-sm font-medium text-[#8d94a0] ml-1">
              (선택)
            </span>
          )}
        </div>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-[45px] px-4 py-3 bg-white rounded-lg",
              !date && "text-muted-foreground",
              error ? "border-error" : "border-gray-200",
              disabled && "opacity-50 cursor-not-allowed",
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "yyyy. MM. dd") : placeholder}
            {date && (
              <X
                className="ml-auto h-4 w-4 opacity-70 hover:opacity-100"
                onClick={handleClear}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {helperText && (
        <span className="text-xs font-medium text-[#8d94a0]">{helperText}</span>
      )}
      {error && errorText && (
        <span className="text-xs font-medium text-error">{errorText}</span>
      )}
    </div>
  );
};

export default DatePicker;
