import { BsReverseLayoutSidebarInsetReverse } from "react-icons/Bs";
import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontSliceProps } from "./models/common";

const Home = lazy(() => import("./pages/home"));
const DetailFont = lazy(() => import("./pages/detail"));

function App() {
  const { data, loading, error } = useSelector(
    (state: { fontsMeta: FontSliceProps }) => state.fontsMeta
  );

  const [filteredData, setFilteredData] = useState<any[]>(data || []);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex align-middle justify-center">
          <div className="text text-large text-red">Loading....</div>
        </div>
      }
    >
      <>
        <div className="py-4 px-20 flex items-center justify-end border-b border-b-slate-600 w-full">
          <button className="relative">
            <span className="absolute -top-[5px] -right-[5px] rounded-full w-2 h-2 bg-orange-500"></span>
            <BsReverseLayoutSidebarInsetReverse className="text-3xl" />
          </button>
        </div>
        <div className="p-6 text-center">
          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<Home filteredData={filteredData} setFilteredData={setFilteredData} error={error} loading={loading} />} />
              <Route path="/specimen/:family" element={<DetailFont dataSlice={filteredData} />} />
            </Routes>
          </BrowserRouter>
        </div>
      </>
    </Suspense>
  );
}

export default App;
