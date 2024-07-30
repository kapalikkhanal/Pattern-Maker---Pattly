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
                <div className='absolute inset-0 left-1/2 w-[1px] h-6 bg-white'></div>
                <div className='absolute inset-0 left-1/2 w-[1px] h-full bg-white/5'></div>
                <div className='absolute inset-0 top-1/2 w-6 h-[1px] bg-white'></div>
                <div className='absolute inset-0 top-1/2 w-full h-[1px] bg-white/5'></div>
                <div className='absolute -inset-y-0 right-0 top-1/2 w-6 h-[1px] bg-white'></div>
            </div>
        </div>
    );
};

export default BlobGenerator;