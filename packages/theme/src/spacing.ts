export const localoSpacing = {
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  pageX: "clamp(1rem, 3vw, 2rem)",
  pageY: "clamp(1.25rem, 4vw, 3rem)",
  sectionY: "clamp(2rem, 6vw, 5rem)",
  cardPadding: "1.25rem"
} as const;

export type LocaloSpacing = typeof localoSpacing;
