const VIE_GG_FONT_API_KEY = "AIzaSyD_PqVd_50RnHjHX3pmnQUbF-AodrmmgV0";
const VITE_API_URL = "/webfonts/v1/webfonts";
const FONT_META_API_URL = "/meta/metadata/fonts";
const FONT_TESTER_DESCRIPTION_API_URL = "/tester/sampletext";

export const API = {
  FONTS: `${VITE_API_URL}?key=${VIE_GG_FONT_API_KEY}`,
  META_DATA: FONT_META_API_URL,
  SEARCH_META_DATA: FONT_META_API_URL,
  TESTER_DESCRIPTION: FONT_TESTER_DESCRIPTION_API_URL,
};
