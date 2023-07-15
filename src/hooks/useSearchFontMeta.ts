import fetcher from "@/libs/fetcher";
import { API } from "@/utils/api-const";

const useSearchFontMeta: any = async () => {
  const data = await fetcher.get(API.META_DATA);

  return data;
};

export default useSearchFontMeta;
