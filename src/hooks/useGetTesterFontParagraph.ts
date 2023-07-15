import fetcher from "@/libs/fetcher";
import { API } from "@/utils/api-const";

const useGetTesterFontParagraph: any = async ({ family }: any) => {
  const data = await fetcher.get(
    `${API.TESTER_DESCRIPTION}?family=${family}&paragraphOnly=true`
  );
  return data;
};

export default useGetTesterFontParagraph;
