import { Ma_Shan_Zheng, Noto_Sans_SC, ZCOOL_XiaoWei } from "next/font/google";
import localFont from "next/font/local";

export const chillax = localFont({
  src: "./Chillax_Complete/Fonts/TTF/Chillax-Variable.ttf",
  variable: "--font-chillax",
});

export const synonym = localFont({
  src: "./Synonym_Complete/Fonts/TTF/Synonym-Variable.ttf",
  variable: "--font-synonym",
});

export const zcool_XiaoWei = ZCOOL_XiaoWei({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-zcool-xiaowei",
});

export const ma_Shan_Zheng = Ma_Shan_Zheng({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ma-shan-zheng",
});

export const notoSans_SC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-sc",
});
