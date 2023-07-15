import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BiCheck, BiChevronDown } from "react-icons/bi";

interface ItemType {
  name: string;
}

interface TypeProps {
  selected: {
    name: string;
  };
  setSelected: React.Dispatch<React.SetStateAction<ItemType>>;
  data: ItemType[];
  isFontSize?: boolean;
}

const SelectComp: React.FC<TypeProps> = ({
  selected,
  setSelected,
  data,
  isFontSize,
}) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative flex items-center">
        <Listbox.Button className="relative cursor-default rounded-[48px] py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm hover:bg-gray-800 transition">
          <span className="block truncate">
            {isFontSize ? selected.name + "px" : selected.name}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <BiChevronDown className="h-5 w-5 text-gray-400" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-[222] min-w-[220px] absolute top-full mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-left">
            {data.map((item) => (
              <Listbox.Option
                aria-multiselectable
                aria-multiline
                key={item.name}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item.name}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <BiCheck className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default React.memo(SelectComp);
