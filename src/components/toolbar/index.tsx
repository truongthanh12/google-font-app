import React, { ChangeEvent, useEffect } from "react";
import Search from "./Search";
import PreviewText from "./PreviewText";
import RangeFont from "./RangeFont";
import { MdOutlineRefresh } from "react-icons/md";
import Category from "./Category";
import Language from "./Language";
import {
  DATA_LANGUAGES,
  DATA_MULTI_SELECT,
  DATA_PREVIEW,
  DATA_RANGE_FONT,
} from "@/utils/data";
import isEmpty from "lodash/isEmpty";

const ToolBar: React.FC<any> = ({
  setSelectedRangeFont,
  selectedRangeFont,
  rangeValue,
  setRangeValue,
  selectedPreview,
  setSelectedPreview,
  query,
  setQuery,
  queryPreview,
  setQueryPreview,
  selectedItems,
  setSelectedItems,
  isChecked,
  setIsChecked,
  selectedLangs,
  setSelectedLangs,
}) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    if (queryPreview) {
      setSelectedPreview(DATA_PREVIEW[0] || { name: "" });
    }
  }, [queryPreview]);

  useEffect(() => {
    if (selectedLangs.name === "All languages") {
      setSelectedLangs(DATA_LANGUAGES[0]);
    }
  }, [selectedLangs]);

  useEffect(() => {
    if (selectedPreview.name === "Paragraph") {
      setSelectedRangeFont({ name: "18" });
    }
  }, [selectedPreview.name]);

  useEffect(() => {
    if (selectedPreview.name !== "Sentence") {
      setQueryPreview("");
    }
  }, [selectedPreview]);

  useEffect(() => {
    if (rangeValue?.name) {
      setSelectedRangeFont(rangeValue);
    }
  }, [rangeValue?.name]);

  useEffect(() => {
    if (selectedRangeFont?.name) {
      setRangeValue(selectedRangeFont);
    }
  }, [selectedRangeFont?.name]);

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRangeValue({ name: event.target.value });
  };
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchPreviewChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQueryPreview(event.target.value);
  };

  const handleReset = () => {
    if (!isEmpty(query)) {
      setQuery("");
    }
    if (!isEmpty(queryPreview)) {
      setQueryPreview("");
    }
    if (!isEmpty(selectedItems)) {
      setSelectedItems([]);
    }
    if (!isEmpty(selectedPreview)) {
      setSelectedPreview(DATA_PREVIEW[1]);
    }
    if (!isEmpty(selectedLangs)) {
      setSelectedLangs(DATA_LANGUAGES[0]);
    }
    if (!isEmpty(selectedRangeFont)) {
      if (selectedPreview.name === "Paragraph") {
        setSelectedRangeFont({ name: "18" });
      } else {
        setSelectedRangeFont({ name: "40" });
      }
    }
  };

  return (
    <>
      <div className="flex p-2 rounded-[48px] border items-center">
        <div className="px-2 text-sm flex-auto">
          <Search handleSearchChange={handleSearchChange} query={query} />
        </div>
        <div className="px-2 text-sm flex-auto">
          <PreviewText
            selected={selectedPreview}
            setSelected={setSelectedPreview}
            queryPreview={queryPreview}
            data={DATA_PREVIEW}
            handleSearchPreviewChange={handleSearchPreviewChange}
          />
        </div>
        <div className="px-2 text-sm flex-auto">
          <RangeFont
            handleRangeChange={handleRangeChange}
            setRangeValue={setRangeValue}
            selected={selectedRangeFont}
            data={DATA_RANGE_FONT}
            rangeValue={rangeValue}
            setSelected={setSelectedRangeFont}
          />
        </div>
        <div className="px-2 text-sm flex items-center border-l ml-2">
          <button onClick={handleReset}>
            <MdOutlineRefresh className="text-3xl" />
          </button>
        </div>
      </div>
      <div className="flex px-2 py-5 space-x-4 items-center">
        <Category
          setSelectedItems={setSelectedItems}
          selectedItems={selectedItems}
          data={DATA_MULTI_SELECT}
        />
        <Language
          selected={selectedLangs}
          setSelected={setSelectedLangs}
          data={DATA_LANGUAGES}
        />
        <div className="flex items-center">
          <input
            id="only-variable"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="only-variable"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Show only variable fonts
          </label>
        </div>
      </div>
    </>
  );
};

export default ToolBar;
