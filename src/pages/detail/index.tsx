import {
  addFontTitle,
  clearFontCart,
  removeFontTitle,
  togglePopup,
} from "@/store/cartSlice";
import { getTesterDesc } from "@/store/testerFontSlice";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const removeSpecialDataResponse = (input: string): any => {
  return JSON.parse(
    input.startsWith(")]}'") ? input.substring(4, input.length) : input
  );
};

const DetailFont: React.FC = () => {
  const { family } = useParams();
  const [data, setData] = useState<any>({});

  const designers = useMemo(() => data?.designers, [data]);
  const fonts = useMemo(() => data?.fonts, [data]);

  const dispatch = useDispatch();
  const testerDesc = useSelector(
    (state: { testerDesc: any }) => state.testerDesc
  );
  const carts = useSelector(
    (state: { cart: any; titles: string[] }) => state.cart.titles
  );

  useEffect(() => {
    axios
      .get(`https://fonts.google.com/metadata/fonts/${family}`)
      .then((response) => {
        setData(removeSpecialDataResponse(response?.data));
      });
  }, [family]);

  useEffect(() => {
    if (family) {
      dispatch(
        getTesterDesc({
          family: family?.replace(/\s/g, "+"),
        }) as any
      );
      return;
    }
  }, [family]);

  const weightMap: { [key: string]: string } = {
    100: `${family} Thin 100`,
    "100i": `${family} Thin 100 Italic`,
    300: `${family} Light 300`,
    "300i": `${family} Light 300 Italic`,
    400: `${family} Regular 400`,
    "400i": `${family} Regular 400 Italic`,
    500: `${family} Medium 500`,
    "500i": `${family} Medium 500 Italic`,
    700: `${family} Bold 700`,
  };

  const handleAddFont = (title: any) => {
    const isExist = carts?.includes(title);
    if (!isExist) {
      dispatch(addFontTitle(title));
      dispatch(togglePopup());
    } else {
      dispatch(removeFontTitle(title));
    }
  };

  return (
    <div className="p-4 relative text-left">
      <div className="text-white text-2xl">{family}</div>
      <div className="text-gray-400">
        Designed by
        {designers?.map(
          (item: React.Key | null | undefined | any, index: number) => {
            const isLastItem = index === designers?.length - 1;
            return (
              <span className="pl-1 text-blue-700" key={item}>
                {item?.name || item + (isLastItem ? "" : ", ")}
              </span>
            );
          }
        )}
      </div>
      <div className="text-[24px] md:text-[40px] p-4 md:p-8 text-center w-full">
        {testerDesc?.data?.replace(/[^a-zA-Z0-9 ]/g, "") || ""}
      </div>

      <div className="content">
        <div className="text-2xl text-white text-left pb-5">Styles</div>
        {!isEmpty(fonts)
          ? Object.entries(fonts)?.map(([key]) => {
              return (
                <div className="border-t border-gray-500 w-full p-4" key={key}>
                  <div className="flex items-center space-x-3 w-full">
                    <div className="w-full text-left">
                      <div className="text-sm text-gray-500">
                        {weightMap[key]}
                      </div>
                      <div className="text-white text-4xl">
                        Whereas recognition of the inherent dignity
                      </div>
                    </div>
                    <button
                      className="p-2 hover:bg-slate-600 rounded transition text-blue-700 w-max text-sm whitespace-nowrap"
                      onClick={() => handleAddFont(weightMap[key])}
                    >
                      {carts?.findIndex(
                        (item: any) => item === weightMap[key]
                      ) !== -1
                        ? "Remove"
                        : "Select"}
                      {" " + weightMap[key]}
                    </button>
                  </div>
                </div>
              );
            })
          : "Empty"}
      </div>
    </div>
  );
};

export default DetailFont;
