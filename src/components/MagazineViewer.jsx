import React, { useRef, useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PageFlip } from 'page-flip';
import './MagazineViewer.css';

// Real image dimensions: 1241 × 1754  (portrait, ratio ≈ 0.7079)
const PAGE_W = 1241;
const PAGE_H = 1754;
const ASPECT = PAGE_H / PAGE_W; // ~1.413

const ZOOM_LEVELS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3];
const MAX_ZOOM = 3;

export default function MagazineViewer({ magazine }) {
    const viewerRef     = useRef(null);
    const containerRef  = useRef(null);
    const flipBookRef   = useRef(null);
    const isInitialized = useRef(false);
    const viewportRef   = useRef(null);
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages,  setTotalPages]  = useState(magazine.totalPages);
    const [inputPage, setInputPage] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Zoom and Pan State using refs for synchronous access during pointer events
    const zoomRef = useRef(1);
    const panRef = useRef({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);
    const activePointers = useRef(new Map());
    
    // UI state just for the zoom text display
    const [zoomUI, setZoomUI] = useState(1);

    const applyTransform = useCallback(() => {
        if (!containerRef.current) return;
        const z = zoomRef.current;
        const p = panRef.current;
        containerRef.current.style.transform = `translate(${p.x}px, ${p.y}px) scale(${z})`;
        // Sandbox flipbook interactions when zoomed
        containerRef.current.style.pointerEvents = z > 1 ? 'none' : 'auto';
    }, []);

    const setTransition = useCallback((enabled) => {
        if (!containerRef.current) return;
        containerRef.current.style.transition = enabled ? 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none';
    }, []);

    const boundPan = useCallback((newPan, currentZoom) => {
        if (currentZoom <= 1) return { x: 0, y: 0 };
        const vp = viewportRef.current;
        if (!vp) return { x: 0, y: 0 };
        
        const vw = vp.offsetWidth;
        const vh = vp.offsetHeight;
        
        // Match StPageFlip's internal orientation logic
        const isPortrait = vw < 630;
        const magazineRatio = isPortrait ? (PAGE_W / PAGE_H) : ((PAGE_W * 2) / PAGE_H);
        const viewportRatio = vw / vh;
        
        // Calculate the actual pixel dimensions of the rendered magazine
        let rw, rh;
        if (magazineRatio > viewportRatio) {
            rw = vw;
            rh = vw / magazineRatio;
        } else {
            rh = vh;
            rw = vh * magazineRatio;
        }
        
        const sw = rw * currentZoom;
        const sh = rh * currentZoom;
        
        const maxX = sw > vw ? (sw - vw) / 2 : 0;
        const maxY = sh > vh ? (sh - vh) / 2 : 0;
        
        return {
            x: Math.max(-maxX, Math.min(maxX, newPan.x)),
            y: Math.max(-maxY, Math.min(maxY, newPan.y))
        };
    }, []);

    const applyZoom = useCallback((newZoom, clientX, clientY, animate = true) => {
        const oldZoom = zoomRef.current;
        if (newZoom === oldZoom) return;

        setTransition(animate);

        if (newZoom <= 1) {
            zoomRef.current = 1;
            panRef.current = { x: 0, y: 0 };
            applyTransform();
            setZoomUI(1);
            return;
        }

        const viewport = viewportRef.current;
        if (!viewport) return;

        const rect = viewport.getBoundingClientRect();
        let px = 0;
        let py = 0;
        
        // Zoom toward specific cursor/finger focal point
        if (clientX !== undefined && clientY !== undefined) {
            px = clientX - rect.left - rect.width / 2;
            py = clientY - rect.top - rect.height / 2;
        }

        const oldPan = panRef.current;
        const ratio = newZoom / oldZoom;
        
        const nextPan = {
            x: px - (px - oldPan.x) * ratio,
            y: py - (py - oldPan.y) * ratio
        };
        
        zoomRef.current = newZoom;
        panRef.current = boundPan(nextPan, newZoom);
        
        applyTransform();
        setZoomUI(newZoom);
    }, [boundPan, applyTransform, setTransition]);

    const zoomIn = useCallback(() => {
        const next = ZOOM_LEVELS.find(l => l > zoomRef.current) || MAX_ZOOM;
        applyZoom(next, undefined, undefined, true);
    }, [applyZoom]);

    const zoomOut = useCallback(() => {
        const prev = [...ZOOM_LEVELS].reverse().find(l => l < zoomRef.current) || 1;
        applyZoom(prev, undefined, undefined, true);
    }, [applyZoom]);

    const resetZoom = useCallback(() => {
        applyZoom(1, undefined, undefined, true);
    }, [applyZoom]);
    
    const toggleReadMode = useCallback(() => {
        if (zoomRef.current > 1) {
            resetZoom();
        } else {
            applyZoom(1.75, undefined, undefined, true);
        }
    }, [applyZoom, resetZoom]);

    // Sync input with actual page
    useEffect(() => {
        setInputPage(currentPage + 1);
    }, [currentPage]);

    // Ensure page change resets zoom
    const handlePageChange = useCallback((pageIndex) => {
        if (flipBookRef.current) {
            flipBookRef.current.flip(pageIndex);
            resetZoom();
        }
    }, [resetZoom]);

    const initFlipBook = useCallback(() => {
        const el = containerRef.current;
        if (!el || isInitialized.current) return;

        const containerW = el.offsetWidth;
        const containerH = el.offsetHeight;

        if (containerW === 0 || containerH === 0) return;

        isInitialized.current = true;

        el.innerHTML = magazine.pages.map((url, i) => `
            <div class="magazine-page">
                <img data-src="${url}" alt="Page ${i + 1}" class="page-image" />
            </div>
        `).join('');

        const pageElements = el.querySelectorAll('.magazine-page');

        const pfInstance = new PageFlip(el, {
            width:            PAGE_W,
            height:           PAGE_H,
            size:             'stretch',
            minWidth:         315, // Creates a 630px breakpoint for portrait auto-switch
            maxWidth:         PAGE_W,
            minHeight:        100,
            maxHeight:        PAGE_H,
            drawShadow:       true,
            maxShadowOpacity: 0.4,
            showCover:        true,
            mobileScrollSupport: false,
            usePortrait:      true, // Enables StPageFlip's internal responsive auto-switching
        });

        pfInstance.loadFromHTML(pageElements);

        const loadNearbyPages = (pageIndex) => {
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

        loadNearbyPages(0);

        pfInstance.on('flip', (e) => {
            setCurrentPage(e.data);
            loadNearbyPages(e.data);
            resetZoom();
        });

        pfInstance.on('changeState', (e) => {
            if (e.data === 'read') {
                setTotalPages(pfInstance.getPageCount());
            }
        });

        flipBookRef.current = pfInstance;
        
        // Initial setup for CSS
        setTransition(true);
        applyTransform();
    }, [magazine, resetZoom, setTransition, applyTransform]);

    useLayoutEffect(() => {
        const timer = setTimeout(initFlipBook, 50);
        return () => {
            clearTimeout(timer);
            if (flipBookRef.current) {
                try { flipBookRef.current.destroy(); } catch (_) {}
                flipBookRef.current = null;
            }
            isInitialized.current = false;
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [initFlipBook]);

    // Keyboard navigation and zoom
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName.toLowerCase() === 'input') return;
            if (e.key === 'ArrowLeft') {
                handlePageChange(currentPage - 1 > 0 ? currentPage - 1 : 0);
            } else if (e.key === 'ArrowRight') {
                handlePageChange(currentPage + 1 < totalPages ? currentPage + 1 : totalPages - 1);
            } else if (e.key === 'Home') {
                handlePageChange(0);
            } else if (e.key === 'End') {
                handlePageChange(totalPages - 1);
            } else if (e.key === '+' || e.key === '=') {
                zoomIn();
            } else if (e.key === '-') {
                zoomOut();
            } else if (e.key === '0') {
                resetZoom();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [totalPages, currentPage, zoomIn, zoomOut, resetZoom, handlePageChange]);

    // Ctrl+Wheel Zoom
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        const handleWheel = (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                const direction = e.deltaY > 0 ? -1 : 1;
                const ratio = direction > 0 ? 1.1 : 0.9;
                let nextZoom = Math.min(MAX_ZOOM, Math.max(1, zoomRef.current * ratio));
                applyZoom(nextZoom, e.clientX, e.clientY, false);
                
                // Clear the immediate state so next actions animate
                clearTimeout(viewport.zoomTimer);
                viewport.zoomTimer = setTimeout(() => setTransition(true), 150);
            }
        };
        viewport.addEventListener('wheel', handleWheel, { passive: false });
        return () => viewport.removeEventListener('wheel', handleWheel);
    }, [applyZoom, setTransition]);

    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            viewerRef.current?.requestFullscreen().catch(err => {
                console.warn("Fullscreen API not supported", err);
            });
        } else {
            document.exitFullscreen().catch(err => console.warn(err));
        }
    };

    const handlePrev = () => {
        if (flipBookRef.current) {
            resetZoom();
            flipBookRef.current.flipPrev();
        }
    };

    const handleNext = () => {
        if (flipBookRef.current) {
            resetZoom();
            flipBookRef.current.flipNext();
        }
    };

    const handlePageSubmit = (e) => {
        if (e.key === 'Enter') {
            let p = parseInt(inputPage, 10);
            if (!isNaN(p) && p >= 1 && p <= totalPages) {
                handlePageChange(p - 1);
            } else {
                setInputPage(currentPage + 1);
            }
        }
    };

    // Robust Pointer Tracking
    const handlePointerDownCapture = (e) => {
        activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (activePointers.current.size === 1 && zoomRef.current > 1) {
            isDraggingRef.current = true;
            setTransition(false);
            try { e.currentTarget.setPointerCapture(e.pointerId); } catch(err) {}
        } else if (activePointers.current.size === 2) {
            isDraggingRef.current = true;
            setTransition(false);
            try { e.currentTarget.setPointerCapture(e.pointerId); } catch(err) {}
            
            // Retroactively capture the first pointer if it wasn't already
            if (zoomRef.current === 1) {
                const firstId = Array.from(activePointers.current.keys())[0];
                try { e.currentTarget.setPointerCapture(firstId); } catch(err) {}
            }
        }
    };

    const handlePointerMove = (e) => {
        if (!activePointers.current.has(e.pointerId)) return;
        if (!isDraggingRef.current) return;

        if (activePointers.current.size === 1 && zoomRef.current > 1) {
            // Desktop Mouse Drag / Single Finger Pan
            const oldPt = activePointers.current.get(e.pointerId);
            const diffX = e.clientX - oldPt.x;
            const diffY = e.clientY - oldPt.y;
            
            activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
            
            panRef.current = boundPan({
                x: panRef.current.x + diffX,
                y: panRef.current.y + diffY
            }, zoomRef.current);
            
            applyTransform();

        } else if (activePointers.current.size === 2) {
            // Pinch to Zoom
            const pts = Array.from(activePointers.current.entries());
            const otherPt = pts.find(p => p[0] !== e.pointerId)[1];
            const oldPt = activePointers.current.get(e.pointerId);
            
            const oldDist = Math.hypot(oldPt.x - otherPt.x, oldPt.y - otherPt.y);
            const oldMidX = (oldPt.x + otherPt.x) / 2;
            const oldMidY = (oldPt.y + otherPt.y) / 2;
            
            activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
            
            const newDist = Math.hypot(e.clientX - otherPt.x, e.clientY - otherPt.y);
            const newMidX = (e.clientX + otherPt.x) / 2;
            const newMidY = (e.clientY + otherPt.y) / 2;
            
            const diffX = newMidX - oldMidX;
            const diffY = newMidY - oldMidY;
            
            panRef.current = {
                x: panRef.current.x + diffX,
                y: panRef.current.y + diffY
            };
            
            if (oldDist > 0) {
                const delta = newDist / oldDist;
                let nextZoom = Math.min(MAX_ZOOM, Math.max(1, zoomRef.current * delta));
                applyZoom(nextZoom, newMidX, newMidY, false);
            } else {
                panRef.current = boundPan(panRef.current, zoomRef.current);
                applyTransform();
            }
        }
    };

    const handlePointerUp = (e) => {
        activePointers.current.delete(e.pointerId);
        if (activePointers.current.size === 0) {
            isDraggingRef.current = false;
            try { e.currentTarget.releasePointerCapture(e.pointerId); } catch(err) {}
            
            if (zoomRef.current < 1.05 && zoomRef.current !== 1) {
                resetZoom();
            } else {
                setTransition(true);
            }
        }
    };

    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage >= totalPages - (flipBookRef.current?.getOrientation() === 'portrait' ? 1 : 2);

    return (
        <div className="magazine-viewer" ref={viewerRef}>
            <div className="viewer-top-bar">
                <div className="viewer-identity">
                    <h2>{magazine.title}</h2>
                    <span className="viewer-subtitle">{magazine.subtitle}</span>
                </div>
                <div className="viewer-top-actions">
                    <button onClick={toggleFullscreen} className="control-btn" aria-label="Toggle Fullscreen">
                        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    </button>
                    <Link to="/" className="control-btn btn-exit" aria-label="Return to Home">
                        Exit to Home
                    </Link>
                </div>
            </div>

            <div 
                className="magazine-viewport"
                ref={viewportRef}
                onPointerDownCapture={handlePointerDownCapture}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                <div 
                    className="flipbook-container" 
                    ref={containerRef} 
                    style={{
                        transformOrigin: 'center center',
                    }}
                />
            </div>

            <div className="magazine-controls">
                <div className="control-group nav-group">
                    <button 
                        onClick={handlePrev} 
                        className="control-btn" 
                        aria-label="Previous page"
                        disabled={isFirstPage}
                    >
                        ← Prev
                    </button>
                    
                    <div className="page-indicator" aria-live="polite">
                        <label htmlFor="page-input" className="sr-only">Go to page</label>
                        <input 
                            id="page-input"
                            type="number" 
                            value={inputPage} 
                            onChange={(e) => setInputPage(e.target.value)}
                            onKeyDown={handlePageSubmit}
                            onBlur={() => setInputPage(currentPage + 1)}
                            className="page-input"
                            min={1}
                            max={totalPages}
                            aria-label="Current page number"
                        />
                        <span className="page-total"> / {totalPages}</span>
                    </div>

                    <button 
                        onClick={handleNext} 
                        className="control-btn" 
                        aria-label="Next page"
                        disabled={isLastPage}
                    >
                        Next →
                    </button>
                </div>
                
                <div className="control-group zoom-group">
                    <button onClick={zoomOut} className="control-btn zoom-btn" aria-label="Zoom out" disabled={zoomUI === 1}>−</button>
                    <span className="zoom-level" aria-label="Current zoom">{Math.round(zoomUI * 100)}%</span>
                    <button onClick={zoomIn} className="control-btn zoom-btn" aria-label="Zoom in" disabled={zoomUI === MAX_ZOOM}>+</button>
                    <button onClick={toggleReadMode} className="control-btn" aria-label="Reading mode">Read</button>
                    <button onClick={resetZoom} className="control-btn" aria-label="Reset zoom" disabled={zoomUI === 1}>Reset</button>
                </div>
            </div>
        </div>
    );
}
