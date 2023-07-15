import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BiChevronDown, BiCheck } from "react-icons/bi";
import isEmpty from "lodash/isEmpty";

interface ItemType {
  name: string;
  id: string | number;
}

interface TypeProps {
  selected: ItemType[];
  setSelected: (selected: ItemType[]) => void;
  data: ItemType[];
}

const MultiSelect: React.FC<TypeProps> = ({ selected, setSelected, data }) => {
  const toggleItem = (item: ItemType) => {
    const isSelected = selected.some(
      (selectedItem) => selectedItem.id === item.id
    );
    if (isSelected) {
      setSelected(
        selected.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleReset = () => {
    setSelected([])
  }

  return (
    <Listbox
      as="div"
      className="relative"
      value={selected}
      onChange={setSelected}
      multiple
    >
      {({ open }) => (
        <>
          <Listbox.Button className="border rounded-[48px] p-2 relative w-full py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {selected.length === 0
                ? "Select an option"
                : `${selected.length} selected`}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <BiChevronDown className="w-5 h-5 text-gray-400" />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={React.Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options
              static
              className="absolute mt-1 w-[150px] py-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[101] text-left"
            >
              {data.map((item) => (
                <Listbox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-6 ${
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                  onClick={() => toggleItem(item)}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <BiCheck className="w-4 h-4 text-indigo-500" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
              <button className="text-black text-center flex justify-end px-2 py-1 ml-auto text-lg border rounded text-bold mr-2 disabled:text-gray-500" disabled={isEmpty(selected)} onClick={handleReset}>
                Reset
              </button>
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
};

export default MultiSelect;
