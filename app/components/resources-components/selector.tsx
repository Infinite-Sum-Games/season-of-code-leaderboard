'use client';
import { useState } from 'react';

export type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOption[];
  multiple: boolean;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

export function Select({ options, value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [, setHighlightedIndex] = useState(0);

  const cleanedOptions = options.filter((o) => o.label.toLowerCase() !== 'all');

  function selectOption(option: SelectOption) {
    if (value.includes(option)) {
      onChange(value.filter((o) => o !== option));
    } else {
      onChange([...value, option]);
    }
    setIsOpen(false);
  }
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 p-5">
      {/* Dropdown Box */}
      <button
        type="button"
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen((prev) => !prev);
          }
        }}
        onBlur={() => setIsOpen(false)}
        className="relative min-h-[4rem] w-full cursor-pointer items-center rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-white backdrop-blur-md transition-all focus:outline-none"
      >
        {/* Placeholder or selected summary */}
        {value.length === 0 ? (
          <span className="text-white/60 ">Click to apply filters</span>
        ) : (
          <span className="text-white/80">
            {value.length} filter{value.length > 1 ? 's' : ''} selected
          </span>
        )}

        {/* Caret icon */}
        <div className="pointer-events-none absolute top-5 right-6">
          <div className="mt-1 h-0 w-0 border-t-10 border-t-white border-r-10 border-r-transparent border-l-10 border-l-transparent" />
        </div>

        {/* Dropdown Options */}
        {isOpen && (
          <ul className="absolute top-full right-0 z-50 mt-2 flex max-h-[16rem] w-4/12 flex-col gap-2 overflow-y-auto rounded-xl border border-white/20 bg-[#0f172a]/90 px-6 py-4 text-sm text-white shadow-lg backdrop-blur-md">
            {cleanedOptions.map((option, index) => (
              <li
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(option);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') selectOption(option);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-center text-sm transition ${
                  value.includes(option)
                    ? 'border-white bg-white/30'
                    : 'border-white/30 bg-transparent hover:bg-white/10'
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </button>

      {/* Horizontal Tags */}
      {value.length > 0 && (
        <div className="mt-2 flex w-full max-w-screen-xl flex-wrap justify-center gap-3">
          {value.map((v) => (
            <span
              key={v.value}
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1 text-sm text-white backdrop-blur-md transition-all hover:bg-white/30"
            >
              <button
                type="button"
                className="text-white hover:text-red-500"
                onClick={() => onChange(value.filter((o) => o !== v))}
              >
                {v.label} x
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
