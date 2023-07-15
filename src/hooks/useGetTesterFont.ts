import fetcher from "@/libs/fetcher";
import { API } from "@/utils/api-const";

const useGetTesterFont: any = async ({ family }: any) => {
  const data = await fetcher.get(
    `${API.TESTER_DESCRIPTION}?family=${family}&sentenceOnly=true`
  );
  return data;
};

export default useGetTesterFont;
