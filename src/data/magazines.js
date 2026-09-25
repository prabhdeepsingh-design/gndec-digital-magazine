export const magazines = [
    {
        id: 'harmony-2025',
        title: 'Harmony 2025',
        year: 2025,
        totalPages: 132,
        coverImage: '/magazines/harmony-2025/harmony-2025_page-0001.jpg',
        description: 'Explore Harmony 2025 — the annual college magazine of Guru Nanak Dev Engineering College, Ludhiana.',
        pages: Array.from({ length: 132 }, (_, i) => {
            const pageNum = String(i + 1).padStart(4, '0');
            return `/magazines/harmony-2025/harmony-2025_page-${pageNum}.jpg`;
        }),
    }
];
