import fetcher from "@/libs/fetcher";
import { API } from "@/utils/api-const";

const useGetFontMeta: any = async () => {
  const data = await fetcher.get(API.META_DATA);

  return data;
};

export default useGetFontMeta;
