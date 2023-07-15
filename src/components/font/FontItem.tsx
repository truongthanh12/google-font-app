import { TesterDescription } from "@/models/common";
import { getTesterDesc, getTesterDescParagraph } from "@/store/testerFontSlice";
import { Transition } from "@headlessui/react";
import axios from "axios";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface Item {
  item: {
    family: string;
    designers: string[];
    fonts: Object;
  };
  size: { name: any };
  previewType: any;
  previewText: string;
}

const FontItem: React.FC<Item> = ({ item, size, previewType, previewText }) => {
  const { family, designers, fonts } = item || {};
  const testerDesc = useSelector(
    (state: { testerDesc: TesterDescription }) => state.testerDesc
  );

  const fontSize = useMemo(() => {
    if (size?.name) return size?.name;
    return "40";
  }, [size?.name]);

  const dispatch = useDispatch();

  useEffect(() => {
    const style = document.createElement("style");
    if (family && !isEmpty(testerDesc?.data)) {
      axios
        .get(
          `https://fonts.googleapis.com/css2?family=${family}&directory=3&display=block&text=%20Wacdefghinorsty`
        )
        .then((response) => {
          style.textContent = `
      ${response?.data}
    `;
        });
    }

    document.head.appendChild(style);

    // Cleanup function to remove the <style> element when the component is unmounted
    return () => {
      document.head.removeChild(style);
    };
  }, [family, testerDesc?.data]);

  useEffect(() => {
    if (family) {
      if (previewType === "Sentence") {
        dispatch(
          getTesterDesc({
            family: family?.replace(/\s/g, "+"),
          }) as any
        );
        return;
      }

      dispatch(
        getTesterDescParagraph({
          family: family?.replace(/\s/g, "+"),
        }) as any
      );
    }
  }, [family, previewType]);

  const fontsArray = useMemo(() => {
    if (fonts) {
      return Object.values(fonts);
    }
    return;
  }, [fonts]);

  return (
    <Link
      to={`/specimen/${family}`}
      className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 min-h-[300px] dark:hover:bg-gray-700 text-left"
    >
      <div className="relative">
        <span className="absolute top-2 right-3">
          {fontsArray?.length || 0} styles
        </span>
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white pr-16">
          {family}
        </h5>
        <p className="font-normal mb-2 text-gray-700 dark:text-gray-600">
          {designers?.map((item, index) => {
            const isLastItem = index === designers?.length - 1;
            return <span key={item}>{item + (isLastItem ? "" : ", ")}</span>;
          })}
        </p>
        <Transition
          className="mx-auto my-16 max-w-md space-y-4"
          show={!!testerDesc?.data}
          enter="transition-all ease-in-out duration-500 delay-[200ms]"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
        >
          <div
            style={{ fontFamily: family, fontSize: fontSize + "px" }}
            className="font-normal text-gray-700 text-4xl dark:text-white break-all leading-tight"
            dangerouslySetInnerHTML={{
              __html:
                previewText || testerDesc?.data?.replace(/[^a-zA-Z0-9 ]/g, ""),
            }}
          />
        </Transition>
      </div>
    </Link>
  );
};

export default FontItem;
