import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontSliceProps } from "./models/common";
import { isEmpty } from "lodash";
import { getMetaFonts } from "./store/fontMetaSlice";
import Nav from "./components/nav";
import { clearFontCart, removeFontTitle } from "./store/cartSlice";
import Empty from "./pages/detail/Empty";

const Home = lazy(() => import("./pages/home"));
const DetailFont = lazy(() => import("./pages/detail"));
const PopupCart = lazy(() => import("./pages/detail/PopupCart"));

function App() {
  const { data, loading, error } = useSelector(
    (state: { fontsMeta: FontSliceProps }) => state.fontsMeta
  );
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState<any[]>(data || []);
  const [dataSlice, setDataSlice] = useState<any>([]);
  const carts = useSelector(
    (state: { cart: any; titles: string[] }) => state.cart.titles
  );

  const popup = useSelector(
    (state: { cart: any; titles: string[] }) => state.cart.popup
  );

  useEffect(() => {
    if (isEmpty(data)) {
      dispatch(getMetaFonts() as any);
    }
  }, [dispatch, data]);

  const handleClearCart = () => {
    dispatch(clearFontCart());
  };
  const handleRemoveFont = (title: string) => {
    dispatch(removeFontTitle(title));
  };

  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex align-middle justify-center">
          <div className="text text-large text-red">Loading....</div>
        </div>
      }
    >
      <>
        <Nav />
        <div className="p-6 text-center">
          <Routes>
            <Route
              index
              path="/"
              element={
                <Home
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  dataSlice={dataSlice}
                  setDataSlice={setDataSlice}
                  error={error}
                  loading={loading}
                  data={data}
                />
              }
            />
            <Route path="/specimen/:family" element={<DetailFont />} />
          </Routes>
        </div>
        {popup && (
          <PopupCart isOpen={popup}>
            {!isEmpty(carts) ? (
              carts.map((item: string) => {
                return (
                  <div key={item} className="flex items-center space-x-2">
                    <span className="text-gray-500 text-sm">{item}</span>
                    <button
                      className="border transition hover:bg-slate-500 text-white rounded w-6 h-6 flex items-center justify-center pb-1"
                      onClick={() => handleRemoveFont(item)}
                    >
                      x
                    </button>
                  </div>
                );
              })
            ) : (
              <Empty />
            )}
            {!isEmpty(carts) && (
              <button
                className="border transition hover:bg-slate-500 text-white rounded px-4 py-1 mt-2 flex items-center justify-center pb-1 disabled:pointer-events-none bg-slate-400"
                onClick={handleClearCart}
                disabled={isEmpty(carts)}
              >
                Clear carts
              </button>
            )}
          </PopupCart>
        )}
      </>
    </Suspense>
  );
}

export default App;
