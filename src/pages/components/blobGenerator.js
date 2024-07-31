import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';

const DraggableBlob = ({ blobPath, blobColor, blobSize, position, onDragStop, isDragging, onDragStart }) => {
    const centerX = 50;
    const centerY = 50;

    const lineLength = 20;

    return (
        <Rnd
            position={position}
            onDragStart={onDragStart}
            onDragStop={(e, d) => onDragStop(d.x, d.y)}
            enableResizing={false}
        // bounds="parent"
        >
            <svg
                width={blobSize}
                height={blobSize}
                viewBox="0 0 100 100"
                style={{ cursor: 'move' }}
            >
                <path d={blobPath} fill={blobColor} />
                {isDragging && (
                    <>
                        <line x1={centerX} y1={centerY} x2={centerX - lineLength} y2={centerY} stroke="white" strokeWidth="0.1" />
                        <line x1={centerX} y1={centerY} x2={centerX + lineLength} y2={centerY} stroke="white" strokeWidth="0.1" />
                        <line x1={centerX} y1={centerY} x2={centerX} y2={centerY - lineLength} stroke="white" strokeWidth="0.1" />
                        <line x1={centerX} y1={centerY} x2={centerX} y2={centerY + lineLength} stroke="white" strokeWidth="0.1" />
                    </>
                )}
            </svg>
        </Rnd>
    );
};

const BlobGenerator = (
    {
        blobColor,
        size,
        backgroundColor,
        complexity,
        gravity,
        canvasSize = { width: 900, height: 675 }
    }) => {
    const blobSize = Math.min(500, size * 25);
    const { width, height } = canvasSize;
    const containerWidth = width / 1.8;
    const containerHeight = height / 1.8;

    const [blobPosition, setBlobPosition] = useState({
        x: width / 3.5 - blobSize / 2,
        y: height / 3.5 - blobSize / 2
    });
    const [blobPath, setBlobPath] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const containerRef = useRef(null);

    const getBlobPath = useCallback(() => {
        const numberOfPoints = Math.max(3, gravity);
        const angleStep = (Math.PI * 2) / numberOfPoints;
        const variance = complexity;

        let points = Array.from({ length: numberOfPoints }, (_, i) => {
            const angle = i * angleStep;
            const radius = 40 + Math.random() * 20 * variance;
            return {
                x: radius * Math.cos(angle),
                y: radius * Math.sin(angle),
            };
        });

        const maxRadius = Math.max(...points.map(p => Math.sqrt(p.x * p.x + p.y * p.y)));
        const scale = 45 / maxRadius;
        points = points.map(p => ({
            x: p.x * scale + 50,
            y: p.y * scale + 50
        }));

        const getPoint = (t) => {
            const i = Math.floor(t * numberOfPoints);
            const p0 = points[(i - 1 + numberOfPoints) % numberOfPoints];
            const p1 = points[i % numberOfPoints];
            const p2 = points[(i + 1) % numberOfPoints];
            const p3 = points[(i + 2) % numberOfPoints];

            const tt = t * numberOfPoints - i;

            const spline = (t, p0, p1, p2, p3) => {
                const t2 = t * t;
                const t3 = t2 * t;
                return (
                    0.5 * (
                        (2 * p1) +
                        (-p0 + p2) * t +
                        (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
                        (-p0 + 3 * p1 - 3 * p2 + p3) * t3
                    )
                );
            };

            return {
                x: spline(tt, p0.x, p1.x, p2.x, p3.x),
                y: spline(tt, p0.y, p1.y, p2.y, p3.y),
            };
        };

        let d = 'M ';
        const steps = 100;
        for (let i = 0; i <= steps; i++) {
            const { x, y } = getPoint(i / steps);
            d += `${x} ${y} `;
            if (i === 0) d += 'L ';
        }
        d += 'Z';

        return d;
    }, [complexity, gravity]);

    useEffect(() => {
        setBlobPath(getBlobPath());
    }, [getBlobPath, complexity, gravity]);

    const handleShuffle = () => {
        setBlobPath(getBlobPath());
    };

    const handleDragStop = (x, y) => {
        const centerX = (containerWidth - blobSize) / 2;
        const centerY = (containerHeight - blobSize) / 2;

        // Define the snapping threshold
        const threshold = 16;

        const distanceToCenter = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );

        if (distanceToCenter < threshold) {
            setBlobPosition({
                x: centerX,
                y: centerY
            });
        } else {
            setBlobPosition({
                x: x,
                y: y
            });
        }

        setIsDragging(false);
    };

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const downloadSVG = () => {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width / 1.8} ${height / 1.8}">
                <rect width="100%" height="100%" fill="${backgroundColor}" />
                <g transform="translate(${blobPosition.x}, ${blobPosition.y}) scale(${blobSize / 100})">
                    <path d="${blobPath}" fill="${blobColor}" />
                </g>
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'blob.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadPNG = () => {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width / 1.8} ${height / 1.8}">
                <rect width="100%" height="100%" fill="${backgroundColor}" />
                <g transform="translate(${blobPosition.x}, ${blobPosition.y}) scale(${blobSize / 100})">
                    <path d="${blobPath}" fill="${blobColor}" />
                </g>
            </svg>
        `;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            const png = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = png;
            a.download = 'blob.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
        img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
    };

    if (!width || !height) {
        console.error("Width and height must be provided");
        return null;
    }

    return (
        <div className="relative w-2/3 bg-[#242424] m-10 flex flex-col items-center justify-center rounded-md">
            <div
                ref={containerRef}
                className="relative flex justify-center items-center rounded-lg border overflow-hidden z-50"
                style={{ backgroundColor, width: containerWidth, height: containerHeight }}
            >
                <DraggableBlob
                    blobPath={blobPath}
                    blobColor={blobColor}
                    blobSize={blobSize}
                    position={blobPosition}
                    onDragStop={handleDragStop}
                    onDragStart={handleDragStart}
                    isDragging={isDragging}
                />
            </div>

            <div className='absolute inset-x-0 top-0 p-1 h-10 w-10 bg-inherit flex flex-row justify-between z-50'>
                <div className="item-hints">
                    <div className="hint" data-position="4">
                        <span className="hint-radius"></span>
                        <span className="hint-dot">
                            <svg width="125px" height="125px" viewBox="-39.34 0 230.34 230.34" xmlns="http://www.w3.org/2000/svg" fill="#fbff00" stroke="#fbff00" className='h-8 w-8'>
                                <path d="M92.17,118.09c-.87,3-2,5.42-2.19,7.88-.73,9.66-2.85,19.27-1,29.06.62,3.32-.43,4.7-3.49,6a19.65,19.65,0,0,1-4.08,1.26,62.72,62.72,0,0,1-28.93-.9,46.2,46.2,0,0,1-7.8-3.54c-3.16-1.56-4.35-4.18-4.37-7.7,0-13.46-.53-26.91-.26-40.36.13-6.54,1.4-13.07,2.45-19.56A31.16,31.16,0,0,1,48,77.63c4.15-1.38,8.45-.92,12.7-.86a83.38,83.38,0,0,0,23.79-3c3.65-1,6.89-2.76,9-6.16a9.27,9.27,0,0,0,.49-9.74C89.2,48.57,82,44.93,72,47.79c-14.47,4.13-25.56,12.5-31.67,26.72-2.92,6.8-5,7.77-11.79,5.93a16.71,16.71,0,0,1-4.79-1.84C16.57,73.9,9.43,69.14,2.39,64.23.1,62.64-.4,60.33.28,57.41a34.36,34.36,0,0,1,6.2-13.08A152.75,152.75,0,0,1,41.1,11.24C48.57,6,57.21,4,65.89,2.08,76.63-.3,87.27-.87,98.22,1.6A52.15,52.15,0,0,1,126,17.54c4.64,5.06,9,10.39,13.23,15.81a59.23,59.23,0,0,1,11.09,24.82c4.65,22.12-3.36,39.08-20.11,53-6.1,5.06-13.15,6.7-20.74,6.89C104.06,118.2,98.63,118.09,92.17,118.09Zm-12.63,35.2c.24-1.8.58-3.73.74-5.68.5-6,.79-12,1.45-18,.56-5.12,1.56-10.19,2.28-15.29.43-3,2.27-4.54,5-5a25.09,25.09,0,0,1,5.11-.44c5.16.12,10.31.29,15.45.6a19.35,19.35,0,0,0,10-1.67c10.44-5.26,18.35-13,21.34-24.48,2.56-9.8,2.67-19.8-1.26-29.54a59.65,59.65,0,0,0-8.88-15.6c-3.81-4.66-7.39-9.52-11.42-14-6.26-6.9-13.68-12.07-23-14.34C79.58,5.71,63.56,8.48,48.09,15.8a31,31,0,0,0-4.32,2.8C32.19,26.74,22.38,36.75,13.49,47.66c-2.29,2.81-4.82,5.72-4.93,9.64A68.21,68.21,0,0,0,32.27,73.21l4.27-7.15c3.4-5.68,7-11.24,12.52-15.09,8.08-5.64,17-9.86,26.67-11.32,13.48-2,23.84,4.81,27.91,19.59a14.25,14.25,0,0,1-.76,9.28C100.34,74.66,96.25,79,89.71,81.09a68.91,68.91,0,0,1-21.95,3.45c-4.51,0-9.07-.48-13.29.43-3.58,5-4,10.56-4.28,16-.72,13.39-1.19,26.79-1.67,40.19A56.2,56.2,0,0,0,49,147.5C59.45,154.9,67.7,156.45,79.54,153.29Z"></path>
                                <path d="M65,230.31a27.48,27.48,0,0,1-26.76-17.82,20.66,20.66,0,0,1-1.56-10.07c1.21-9.33,4.72-17.43,11.77-24.13,6.5-6.19,13.47-7.72,22-5.49,5.61,1.47,11.06,2.83,15.42,6.95,6.45,6.08,9.93,13.2,8.3,22.27-.25,1.41-.38,2.84-.62,4.25C90.9,221.87,80.84,230.33,65,230.31ZM66.79,222a38.22,38.22,0,0,0,5.94-1.33c7.75-2.77,14.61-13.85,13.67-21.93a16.51,16.51,0,0,0-1.31-4c-4-10.17-12.6-13.4-22.46-14.34A9,9,0,0,0,57,181.82c-6,4.3-10.38,10.17-11.58,17.39C43.44,211.17,53.14,222.26,66.79,222Z"></path>
                                <path class="cls-1" d="M79.54,153.29C67.7,156.45,59.45,154.9,49,147.5a56.2,56.2,0,0,1-.43-6.38c.48-13.4.95-26.8,1.67-40.19.3-5.4.7-10.91,4.28-16,4.22-.91,8.78-.45,13.29-.43a68.91,68.91,0,0,0,21.95-3.45c6.54-2.14,10.63-6.43,13.17-12.57a14.25,14.25,0,0,0,.76-9.28C99.57,44.46,89.21,37.61,75.73,39.65,66,41.11,57.14,45.33,49.06,51c-5.53,3.85-9.12,9.41-12.52,15.09l-4.27,7.15A68.21,68.21,0,0,1,8.56,57.3c.11-3.92,2.64-6.83,4.93-9.64,8.89-10.91,18.7-20.92,30.28-29.06a31,31,0,0,1,4.32-2.8C63.56,8.48,79.58,5.71,96.5,9.87c9.27,2.27,16.69,7.44,23,14.34,4,4.44,7.61,9.3,11.42,14a59.65,59.65,0,0,1,8.88,15.6c3.93,9.74,3.82,19.74,1.26,29.54-3,11.45-10.9,19.22-21.34,24.48a19.35,19.35,0,0,1-10,1.67c-5.14-.31-10.29-.48-15.45-.6a25.09,25.09,0,0,0-5.11.44c-2.78.5-4.62,2-5,5-.72,5.1-1.72,10.17-2.28,15.29-.66,6-1,12-1.45,18C80.12,149.56,79.78,151.49,79.54,153.29Z"></path>
                                <path class="cls-1" d="M66.79,222c-13.65.28-23.35-10.81-21.37-22.77C46.62,192,51,186.12,57,181.82a9,9,0,0,1,5.63-1.47c9.86.94,18.43,4.17,22.46,14.34a16.51,16.51,0,0,1,1.31,4c.94,8.08-5.92,19.16-13.67,21.93A38.22,38.22,0,0,1,66.79,222Z">
                                </path>
                            </svg>
                        </span>
                        <div className="hint-content do--split-children">
                            <p className='text-base font-thin'>

                                Hover over the shape to drag it and place it in position, and click on the refresh button to reload new designs.

                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='absolute inset-y-0 right-2 top-2 h-10 w-28 bg-inherit flex flex-row justify-between z-20'>
                <button className="download-button">
                    <div className="docs">PNG</div>
                    <div className="download" onClick={downloadPNG}>
                        <svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth="2" stroke="currentColor" height="24" width="24" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line y2="3" x2="12" y1="15" x1="12"></line></svg>
                    </div>
                </button>

                <button className="download-button">
                    <div className="docs">SVG</div>
                    <div className="download" onClick={downloadSVG}>
                        <svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth="2" stroke="currentColor" height="24" width="24" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line y2="3" x2="12" y1="15" x1="12"></line></svg>
                    </div>
                </button>
            </div>

            <div className='absolute inset-0 -bottom-6 flex items-end justify-center w-full z-10'>
                <div className='  bg-red-600 p-1.5 rounded-full'>
                    <button type="button" className='button' onClick={handleShuffle}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-repeat"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
                            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div className='-z-10-'>
                <div className='absolute inset-0 left-1/2 w-[1px] h-2 bg-white'></div>
                <div className='absolute inset-0 left-1/2 w-[1px] h-full bg-white/5'></div>
                <div className='absolute inset-0 top-1/2 w-2 h-[1px] bg-white'></div>
                <div className='absolute inset-0 top-1/2 w-full h-[1px] bg-white/5'></div>
                <div className='absolute -inset-y-0 right-0 top-1/2 w-2 h-[1px] bg-white'></div>
            </div>
        </div>
    );
};

export default BlobGenerator;