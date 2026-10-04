import { Shortcuts } from "../types/type";

export const bookmarksData: Shortcuts[] = [
  {
    id: "1",
    title: "React Documentation",
    favorite: false,
    url: "https://react.dev",
    category: [
      { id: "t1", title: "React" },
      { id: "t2", title: "Frontend" },
    ],
  },
  {
    id: "2",
    title: "Next.js Documentation",
    des: "Official documentation for Next.js, covering routing, rendering, caching, and more.",
    favorite: false,
    url: "https://nextjs.org/docs",
    category: [
      { id: "t3", title: "Next.js" },
      { id: "t4", title: "Learning" },
      { id: "t5", title: "React" },
    ],
  },
  {
    id: "3",
    title: "Tailwind CSS",
    favorite: false,
    url: "https://tailwindcss.com",
  },
  {
    id: "4",
    title: "JavaScript.info",
    des: "A modern JavaScript tutorial covering fundamentals and advanced concepts.",
    favorite: false,
    url: "https://javascript.info",
    category: [{ id: "t6", title: "JavaScript" }],
  },
  {
    id: "5",
    title: "GitHub",
    favorite: false,
    url: "https://github.com",
  },
  {
    id: "6",
    title: "Figma",
    des: "A collaborative interface design tool for creating UI designs and prototypes.",
    favorite: false,
    url: "https://www.figma.com",
    category: [
      { id: "t7", title: "UI/UX" },
      { id: "t8", title: "Design" },
    ],
  },
  {
    id: "7",
    title: "MDN Web Docs",
    favorite: false,
    url: "https://developer.mozilla.org",
  },
  {
    id: "8",
    title: "Lucide Icons",
    des: "Beautiful and consistent open-source icons for modern applications.",
    favorite: false,
    url: "https://lucide.dev",
    category: [{ id: "t9", title: "Icons" }],
  },
  {
    id: "9",
    title: "Vercel",
    favorite: false,
    url: "https://vercel.com",
  },
  {
    id: "10",
    title: "Frontend Mentor",
    des: "Practice frontend development by building real-world projects from design challenges.",
    favorite: false,
    url: "https://www.frontendmentor.io",
    category: [
      { id: "t10", title: "Practice" },
      { id: "t11", title: "Frontend" },
      { id: "t12", title: "Projects" },
    ],
  },
];