export type NavLink = {
  id: string;
  label: string;
};

export type Project = {
  number: string;
  title: string;
  desc: string;
  tags: string[];
  url: string;
  previewColor: string;
  previewImage?: string;
};

export type Tool = {
  name: string;
  detail: string;
  symbol: string;
  accent: string;
  accentBg: string;
  accentRing: string;
};

export type JourneyItem = {
  yearRange: string;
  title: string;
  desc: string;
  tags: string[];
  side: "left" | "right";
  photoPlaceholder: string;
  photoTone?: string;
  photoRotate?: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  status: string;
};

export type RegisterSection = (id: string) => (element: HTMLElement | null) => void;
