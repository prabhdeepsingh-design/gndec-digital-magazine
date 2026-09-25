import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { PageFlip } from 'page-flip';
import './MagazineViewer.css';

// Real image dimensions: 1241 × 1754  (portrait, ratio ≈ 0.7079)
const PAGE_W = 1241;
const PAGE_H = 1754;
const ASPECT = PAGE_H / PAGE_W; // ~1.413

export default function MagazineViewer({ magazine }) {
    const containerRef  = useRef(null);
    const flipBookRef   = useRef(null);
    const isInitialized = useRef(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages,  setTotalPages]  = useState(magazine.totalPages);

    const initFlipBook = useCallback(() => {
        const el = containerRef.current;
        if (!el || isInitialized.current) return;

        // Measure the container *right now* so PageFlip gets real numbers
        const containerW = el.offsetWidth;
        const containerH = el.offsetHeight;

        if (containerW === 0 || containerH === 0) return; // bail – not laid out yet

        isInitialized.current = true;

        // Manually inject HTML to avoid React reconciliation conflicts when PageFlip mutates the DOM
        el.innerHTML = magazine.pages.map((url, i) => `
            <div class="magazine-page">
                <img data-src="${url}" alt="Page ${i + 1}" class="page-image" />
            </div>
        `).join('');

        const pageElements = el.querySelectorAll('.magazine-page');

        // Pass single-page dimensions and let size:'stretch' scale to fit
        const pfInstance = new PageFlip(el, {
            width:            PAGE_W,
            height:           PAGE_H,
            size:             'stretch',
            minWidth:         100,
            maxWidth:         PAGE_W,
            minHeight:        100,
            maxHeight:        PAGE_H,
            drawShadow:       true,
            maxShadowOpacity: 0.4,
            showCover:        true,
            mobileScrollSupport: false,
            usePortrait:      containerW < 600,
        });

        pfInstance.loadFromHTML(pageElements);

        // Progressive Loading Logic
        const loadNearbyPages = (pageIndex) => {
            // Load current page and 2 pages before/after
            for (let i = Math.max(0, pageIndex - 2); i <= Math.min(magazine.pages.length - 1, pageIndex + 3); i++) {
                const pageEl = pageElements[i];
                if (pageEl) {
                    const img = pageEl.querySelector('img');
                    if (img && !img.src && img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                }
            }
        };

        // Load the initial set of pages (cover and first spread)
        loadNearbyPages(0);

        pfInstance.on('flip', (e) => {
            setCurrentPage(e.data);
            loadNearbyPages(e.data); // Progressively load as user reads
        });

        pfInstance.on('changeState', () => {
            setTotalPages(pfInstance.getPageCount());
        });

        flipBookRef.current = pfInstance;
    }, [magazine]);

    // useLayoutEffect fires synchronously after DOM paint – container has real size
    useLayoutEffect(() => {
        // Small delay gives the browser one frame to finish flex layout
        const timer = setTimeout(initFlipBook, 50);

        return () => {
            clearTimeout(timer);
            if (flipBookRef.current) {
                try { flipBookRef.current.destroy(); } catch (_) {}
                flipBookRef.current = null;
            }
            isInitialized.current = false;
            // Clean up the DOM to be safe
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [initFlipBook]);

    const handlePrev = () => {
        if (flipBookRef.current) flipBookRef.current.flipPrev();
    };

    const handleNext = () => {
        if (flipBookRef.current) flipBookRef.current.flipNext();
    };

    return (
        <div className="magazine-viewer">
            <div className="magazine-viewport">
                <div className="flipbook-container" ref={containerRef} />
            </div>

            <div className="magazine-controls">
                <button onClick={handlePrev} className="control-btn" aria-label="Previous page">
                    ← Previous
                </button>
                <span className="page-indicator" aria-live="polite">
                    Page {currentPage + 1} / {totalPages}
                </span>
                <button onClick={handleNext} className="control-btn" aria-label="Next page">
                    Next →
                </button>
            </div>
        </div>
    );
}
