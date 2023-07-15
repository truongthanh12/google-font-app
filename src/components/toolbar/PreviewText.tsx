import SearchComp from "@/components/search";
import Select from "@/components/select";

const PreviewText: React.FC<any> = ({
  selected,
  setSelected,
  queryPreview,
  data,
  handleSearchPreviewChange,
}) => {
  return (
    <div className="flex items-center border-r">
      <Select setSelected={setSelected} selected={selected} data={data} />
      {/* //Search  */}
      <SearchComp
        onChange={handleSearchPreviewChange}
        value={queryPreview}
        placeHolder="Type something"
        name="preview"
      />
    </div>
  );
};

export default PreviewText;
