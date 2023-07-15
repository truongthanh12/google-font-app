import fetcher from "@/libs/fetcher";
import { API } from "@/utils/api-const";

const useGetFonts: any = async () => {
  const data = await fetcher.get(API.FONTS);

  return data;
};

export default useGetFonts;
