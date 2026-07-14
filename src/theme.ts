export type ThemePaletteId = "indigo" | "emerald" | "amber" | "rose";

export interface ThemePalette {
  id: ThemePaletteId;
  name: string;
  bgDark: string;
  bgLight: string;
  textDark: string;
  textLight: string;
  borderDark: string;
  borderLight: string;
  headerBgDark: string;
  headerBgLight: string;
  accentGradient: string;
  accentGradientText: string;
  primaryBtn: string;
  accentText: string;
  accentTextLight: string;
  accentBg: string;
  accentBorder: string;
  accentShadow: string;
  focusBorder: string;
  focusBorderLight: string;
  accentRing: string;
  accentRingLight: string;
  accentColorHex: string;
}

export const themePalettes: Record<ThemePaletteId, ThemePalette> = {
  indigo: {
    id: "indigo",
    name: "Cosmic Indigo",
    bgDark: "bg-[#0B0F17]",
    bgLight: "bg-slate-50",
    textDark: "text-gray-100",
    textLight: "text-slate-800",
    borderDark: "border-slate-800/80",
    borderLight: "border-slate-200",
    headerBgDark: "bg-[#0B0F17]/80",
    headerBgLight: "bg-white/80",
    accentGradient: "from-indigo-500 via-purple-500 to-pink-500",
    accentGradientText: "from-indigo-400 via-purple-400 to-pink-400",
    primaryBtn: "bg-indigo-600 hover:bg-indigo-500",
    accentText: "text-indigo-400",
    accentTextLight: "text-indigo-600",
    accentBg: "bg-indigo-500/10",
    accentBorder: "border-indigo-500/20",
    accentShadow: "shadow-indigo-600/25",
    focusBorder: "focus:border-indigo-500",
    focusBorderLight: "focus:border-indigo-600",
    accentRing: "focus:ring-indigo-500/20",
    accentRingLight: "focus:ring-indigo-600/20",
    accentColorHex: "#6366f1"
  },
  emerald: {
    id: "emerald",
    name: "Emerald Aurora",
    bgDark: "bg-[#050C0A]",
    bgLight: "bg-[#F4FBF7]",
    textDark: "text-zinc-100",
    textLight: "text-emerald-950",
    borderDark: "border-emerald-950/60",
    borderLight: "border-emerald-150",
    headerBgDark: "bg-[#050C0A]/80",
    headerBgLight: "bg-[#F4FBF7]/80",
    accentGradient: "from-emerald-500 via-teal-500 to-cyan-500",
    accentGradientText: "from-emerald-400 via-teal-400 to-cyan-400",
    primaryBtn: "bg-emerald-600 hover:bg-emerald-500",
    accentText: "text-emerald-400",
    accentTextLight: "text-emerald-600",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/20",
    accentShadow: "shadow-emerald-600/25",
    focusBorder: "focus:border-emerald-500",
    focusBorderLight: "focus:border-emerald-600",
    accentRing: "focus:ring-emerald-500/20",
    accentRingLight: "focus:ring-emerald-600/20",
    accentColorHex: "#10b981"
  },
  amber: {
    id: "amber",
    name: "Amber Sunset",
    bgDark: "bg-[#140D07]",
    bgLight: "bg-[#FCFAF7]",
    textDark: "text-stone-100",
    textLight: "text-amber-950",
    borderDark: "border-amber-950/60",
    borderLight: "border-amber-150",
    headerBgDark: "bg-[#140D07]/80",
    headerBgLight: "bg-[#FCFAF7]/80",
    accentGradient: "from-amber-500 via-orange-500 to-rose-500",
    accentGradientText: "from-amber-400 via-orange-400 to-rose-400",
    primaryBtn: "bg-amber-600 hover:bg-amber-500",
    accentText: "text-amber-400",
    accentTextLight: "text-amber-700",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/20",
    accentShadow: "shadow-amber-600/25",
    focusBorder: "focus:border-amber-500",
    focusBorderLight: "focus:border-amber-600",
    accentRing: "focus:ring-amber-500/20",
    accentRingLight: "focus:ring-amber-600/20",
    accentColorHex: "#f59e0b"
  },
  rose: {
    id: "rose",
    name: "Cyber Rose",
    bgDark: "bg-[#120813]",
    bgLight: "bg-[#FDF6FA]",
    textDark: "text-neutral-100",
    textLight: "text-purple-950",
    borderDark: "border-purple-950/60",
    borderLight: "border-rose-150",
    headerBgDark: "bg-[#120813]/80",
    headerBgLight: "bg-[#FDF6FA]/80",
    accentGradient: "from-rose-500 via-purple-500 to-pink-500",
    accentGradientText: "from-rose-400 via-purple-400 to-pink-400",
    primaryBtn: "bg-rose-600 hover:bg-rose-500",
    accentText: "text-rose-400",
    accentTextLight: "text-rose-600",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/20",
    accentShadow: "shadow-rose-600/25",
    focusBorder: "focus:border-rose-500",
    focusBorderLight: "focus:border-rose-600",
    accentRing: "focus:ring-rose-500/20",
    accentRingLight: "focus:ring-rose-600/20",
    accentColorHex: "#f43f5e"
  }
};
