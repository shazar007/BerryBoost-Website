import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { IoChevronDownOutline } from "react-icons/io5";

interface MultiSelectDropdownProps {
  title?: string;
  borderWidth?: string;
  borderColor?: string;
  height?: string;
  width?: string;
  onChange?: (selectedValues: string[]) => void;
  options?: { [key: string]: string[] } | string[];
  selectionMode?: "multiple" | "single";
  value?: string[];
}

export interface MultiSelectDropdownRef {
  clear: () => void;
}

const MultiSelectDropdown = forwardRef<
  MultiSelectDropdownRef,
  MultiSelectDropdownProps
>(
  (
    {
      title = "Select",
      borderWidth = "1px",
      borderColor = "#D9D9D9",
      height = "40px",
      width = "100%",
      options = [],
      onChange,
      selectionMode = "multiple",
      value,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>(value || []);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [maxTags, setMaxTags] = useState(4);

    useEffect(() => {
      const updateMaxTags = () => {
        setMaxTags(window.innerWidth < 768 ? 2 : 4);
      };
      updateMaxTags();
      window.addEventListener("resize", updateMaxTags);
      return () => window.removeEventListener("resize", updateMaxTags);
    }, []);

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValues(value);
      }
    }, [value]);

    const getOptions = () => {
      if (selectionMode === "single" && Array.isArray(options)) return options;
      if (selectionMode === "multiple" && !Array.isArray(options))
        return options;
      return selectionMode === "single" ? [] : {};
    };

    const handleSelect = (val: string) => {
      let newValues: string[];
      if (selectionMode === "single") {
        newValues = selectedValues.includes(val) ? [] : [val];
        setIsOpen(false);
      } else {
        newValues = selectedValues.includes(val)
          ? selectedValues.filter((v) => v !== val)
          : [...selectedValues, val];
      }
      setSelectedValues(newValues);
      onChange?.(newValues);
    };

    const handleClear = () => {
      const newValues: string[] = [];
      setSelectedValues(newValues);
      onChange?.(newValues);
    };

    // Expose handleClear to parent via ref
    useImperativeHandle(ref, () => ({
      clear: handleClear,
    }));

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const displayedTags = selectedValues.slice(0, maxTags);
    const hiddenCount = selectedValues.length - displayedTags.length;
    const currentOptions = getOptions();

    return (
      <div className="bg-transparent flex-col gap-2 w-full" ref={dropdownRef}>
        <div className="relative" style={{ width }}>
          <div
            className="flex items-center justify-between px-3 py-2 rounded-md bg-transparent cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            style={{ border: `${borderWidth} solid ${borderColor}`, height }}
          >
            <div className="flex flex-wrap gap-1 text-sm">
              {selectedValues.length === 0 ? (
                <span className="text-[#7D7D7D] text-[16px]">{title}</span>
              ) : (
                <>
                  {displayedTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 px-2 py-0.5 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {hiddenCount > 0 && (
                    <span className="text-gray-500 text-xs">
                      +{hiddenCount}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {selectedValues.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              )}
              <IoChevronDownOutline
                color="#131313"
                className="cursor-pointer"
              />
            </div>
          </div>

          {isOpen && (
            <div
              className="absolute z-10 bg-white mt-1 rounded-2xl p-2 w-full max-h-96 overflow-auto"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              {selectionMode === "single" && Array.isArray(currentOptions) ? (
                <div className="flex flex-col">
                  {currentOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-start gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="radio"
                        className="mt-1"
                        checked={selectedValues.includes(option)}
                        onChange={() => handleSelect(option)}
                        name="single-select-group"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap justify-start gap-5 h-[200px] ">
                  {Object.entries(currentOptions).map(
                    ([categoryKey, services]) => (
                      <div key={categoryKey}>
                        <p className="text-[18px] font-bold pl-4 mb-2">
                          {categoryKey} Services
                        </p>
                        {services.map((service: any) => (
                          <label
                            key={service}
                            className="flex items-start gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                          >
                            <input
                              type="checkbox"
                              className="mt-1"
                              checked={selectedValues.includes(service)}
                              onChange={() => handleSelect(service)}
                            />
                            {service}
                          </label>
                        ))}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default MultiSelectDropdown;
