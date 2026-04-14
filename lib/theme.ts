export const palette = {
  ink: "#14110f",
  cream: "#f5efe4",
  bone: "#ebe3d3",
  paper: "#ffffff",
  ember: "#c2410c",
  emberSoft: "#e8722c",
  emberLight: "#f0a06b",
  olive: "#5b6b3a",
} as const;

export const alpha = {
  ink: (a: number) => `rgba(20, 17, 15, ${a})`,
  cream: (a: number) => `rgba(245, 239, 228, ${a})`,
} as const;

export const serifItalic = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontStyle: "italic" as const,
};

export const shadows = {
  panel:
    "0 1px 0 rgba(255,255,255,0.8) inset, 0 30px 60px -40px rgba(20,17,15,0.2), 0 8px 20px -12px rgba(20,17,15,0.1)",
  pill:
    "0 18px 40px -18px rgba(20,17,15,0.22), 0 2px 6px -3px rgba(20,17,15,0.12)",
  deepInk:
    "0 40px 80px -30px rgba(0,0,0,0.5), 0 10px 30px -15px rgba(0,0,0,0.3)",
  primary: "0 10px 30px -12px rgba(20,17,15,0.5)",
} as const;
