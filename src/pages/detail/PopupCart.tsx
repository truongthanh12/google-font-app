import { togglePopup } from "@/store/cartSlice";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

interface TypeProps {
  isOpen: boolean;
  children?: JSX.Element | JSX.Element[];
}
const PopupCart: React.FC<TypeProps> = ({ isOpen, children }) => {
  const dispatch = useDispatch()
  
  const closeModal = () => {
    dispatch(togglePopup());
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center relative">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all relative">
                  <button
                    className="border absolute right-2 top-2 transition hover:bg-slate-500 text-white rounded w-6 h-6 flex items-center justify-center pb-1"
                    onClick={closeModal}
                  >
                    x
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Selected family
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="border p-4 rounded">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default React.memo(PopupCart);
