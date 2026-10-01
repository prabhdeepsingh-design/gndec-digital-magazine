const generatePages = (slug, count, padding = 4, filePrefix = null) => {
    const prefix = filePrefix || slug;
    return Array.from({ length: count }, (_, i) => {
        const pageNum = String(i + 1).padStart(padding, '0');
        return `/magazines/${slug}/${prefix}_page-${pageNum}.jpg`;
    });
};

export const magazines = [
    {
        id: 'harmony-2026',
        slug: 'harmony-2026',
        title: 'Harmony 2026',
        subtitle: 'Annual College Magazine',
        year: 2026,
        category: 'Annual Magazine',
        publishedDate: '2026-01-01',
        featured: false,
        totalPages: 'TBD',
        coverImage: '/magazines/harmony-2026/harmony-2026_page-0001.webp',
        description: 'Explore Harmony 2026 — the annual college magazine of Guru Nanak Dev Engineering College, Ludhiana.',
        path: '/magazine/harmony-2026',
        pages: [],
        comingSoon: true
    },
    {
        id: 'harmony-2025',
        slug: 'harmony-2025',
        title: 'Harmony 2025',
        subtitle: 'Annual College Magazine',
        year: 2025,
        category: 'Annual Magazine',
        publishedDate: '2025-01-01',
        featured: true,
        totalPages: 132,
        coverImage: '/magazines/harmony-2025/harmony-2025_page-0001.jpg',
        description: 'Explore Harmony 2025 — the annual college magazine of Guru Nanak Dev Engineering College, Ludhiana. Featuring stories, achievements, creativity, and memories from the GNDEC community.',
        path: '/magazine/harmony-2025',
        pages: generatePages('harmony-2025', 132, 4)
    },
    {
        id: 'harmony-2024',
        slug: 'harmony-2024',
        title: 'Harmony 2024',
        subtitle: 'Annual College Magazine',
        year: 2024,
        category: 'Annual Magazine',
        publishedDate: '2024-01-01',
        featured: false,
        totalPages: 132, // Adjust if the actual page count differs
        coverImage: '/magazines/harmony-2024/Harmony-2024 (1)_page-0001.jpg',
        description: 'Explore Harmony 2024 — the annual college magazine of Guru Nanak Dev Engineering College, Ludhiana.',
        path: '/magazine/harmony-2024',
        pages: generatePages('harmony-2024', 132, 4, 'Harmony-2024 (1)')
    }
];
