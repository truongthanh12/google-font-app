import React, { useCallback, useEffect, useRef } from "react";
import FontItem from "./FontItem";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import Empty from "../empty";
import classNames from "classnames";

interface TypeProps {
  data?: any;
  loading: boolean;
  error: any;
  onClearSearch: () => void;
  size: { name: string };
  previewText: string;
  previewType: string;
  dataSlice: any;
  setDataSlice: any;
  dataFonts?: any;
}

const Fonts: React.FC<TypeProps> = ({
  dataFonts,
  loading,
  error,
  onClearSearch,
  size,
  previewText,
  previewType,
  dataSlice,
  setDataSlice,
}) => {
  const elementRef = useRef<HTMLInputElement>(null);
  const offset = useRef<number>(15);

  //check scroll to bottom
  const isBottom = (el: HTMLElement | null) => {
    if (!el) {
      return false;
    }

    const rect = el.getBoundingClientRect();
    return rect.bottom <= window?.innerHeight;
  };

  //handle scroll
  const handleScroll = useCallback(
    debounce(() => {
      if (dataSlice?.length < dataFonts?.length) {
        if (isBottom(elementRef?.current)) {
          offset.current += 15; // Increment offset by 15
          setDataSlice(dataFonts?.slice(0, offset.current));
        }
        return;
      }
    }, 400),
    [dataSlice?.length, dataFonts?.length]
  );

  useEffect(() => {
    if (dataFonts) {
      setDataSlice(dataFonts?.slice(0, offset?.current));
    }
  }, [dataFonts, offset?.current]);

  useEffect(() => {
    try {
      window.removeEventListener("scroll", handleScroll);
    } catch (error) {
      console.log(error);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dataSlice?.length, dataFonts?.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="text-xs flex py-8">
        {dataSlice?.length} of {dataFonts?.length} items
      </div>
      <div
        className={classNames(
          "grid grid-flow-row gap-8 text-neutral-600  z-0",
          !isEmpty(dataSlice)
            ? "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "mx-auto"
        )}
        ref={elementRef}
      >
        {!isEmpty(dataSlice) ? (
          dataSlice?.map((item: any) => {
            return (
              <FontItem
                key={item?.family}
                item={item}
                previewText={previewText}
                size={size}
                previewType={previewType}
              />
            );
          })
        ) : (
          <Empty onClearSearch={onClearSearch} />
        )}
      </div>
    </>
  );
};
export default Fonts;
