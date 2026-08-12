export type Reference = {
  id: number;
  author: string;
  year: string;
  title: string;
  publisher: string;
  href: string;
};

type Programme = {
  references: Reference[];
};

const references: Reference[] = [
  {
    id: 1,
    author: "Porter, M. E.",
    year: "1996",
    title: "What Is Strategy?",
    publisher: "Harvard Business Review",
    href: "https://hbr.org/1996/11/what-is-strategy",
  },
  {
    id: 2,
    author: "Harvard Business School",
    year: "n.d.",
    title: "The Case Method",
    publisher: "Harvard Business School",
    href: "https://www.hbs.edu/mba/academic-experience/the-case-method",
  },
  {
    id: 3,
    author: "Porter, M. E.",
    year: "2008",
    title: "The Five Competitive Forces That Shape Strategy",
    publisher: "Harvard Business Review",
    href: "https://hbr.org/2008/01/the-five-competitive-forces-that-shape-strategy",
  },
  {
    id: 4,
    author: "Mintzberg, H.",
    year: "1987",
    title: "Crafting Strategy",
    publisher: "Harvard Business Review",
    href: "https://hbr.org/1987/07/crafting-strategy",
  },
  {
    id: 5,
    author: "Collis, D. J., & Montgomery, C. A.",
    year: "1995",
    title: "Competing on Resources",
    publisher: "Harvard Business Review",
    href: "https://hbr.org/1995/07/competing-on-resources-strategy-in-the-1990s",
  },
  {
    id: 6,
    author: "Mankins, M. C., & Steele, R.",
    year: "2005",
    title: "Turning Great Strategy into Great Performance",
    publisher: "Harvard Business Review",
    href: "https://hbr.org/2005/07/turning-great-strategy-into-great-performance",
  },
  {
    id: 7,
    author: "AACSB International",
    year: "2022",
    title: "2020 Guiding Principles and Standards for Business Accreditation",
    publisher: "AACSB International",
    href: "https://www.aacsb.edu/-/media/documents/accreditation/2020-aacsb-business-accreditation-standards-jul-1-2022.pdf",
  },
  {
    id: 8,
    author: "Rothaermel, F. T.",
    year: "2024",
    title: "Strategic Management, 6th edition",
    publisher: "McGraw Hill",
    href: "https://www.mheducation.com/highered/product/strategic-management-rothaermel.html",
  },
];

export const oneYearMba: Programme = {
  references,
};

export const twoYearMba: Programme = {
  references,
};
