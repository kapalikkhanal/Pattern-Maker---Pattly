import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';

const DraggableBubble = ({ bubblePath, blobColor, bubbleSize, position, onDragStop, isDragging, onDragStart, bounds }) => {
    const centerX = 50;
    const centerY = 50;
    const lineLength = 20;

    return (
        <Rnd
            position={position}
            onDragStart={onDragStart}
            onDragStop={(e, d) => onDragStop(d.x, d.y)}
            enableResizing={false}
            bounds={bounds}
        >
            <svg
                width={bubbleSize}
                height={bubbleSize}
                viewBox="0 0 100 100"
                style={{ cursor: 'move' }}
            >
                <path d={bubblePath} fill={blobColor} />
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

const BubbleGenerator = ({
    blobColor,
    size,
    backgroundColor,
    complexity,
    gravity,
    canvasSize = { width: 900, height: 675 }
}) => {
    const bubblesize = size * 10
    const { width, height } = canvasSize;
    const containerWidth = width / 1.8;
    const containerHeight = height / 1.8;

    const [bubbles, setBubbles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const containerRef = useRef(null);

    const generateBubblePath = useCallback(() => {
        const radius = 50;  // Fixed radius for consistent circular shape
        return `M 50 50 m -${radius}, 0 a ${radius},${radius} 0 1,0 ${2 * radius},0 a ${radius},${radius} 0 1,0 -${2 * radius},0`;
    }, []);

    const generateBubbles = useCallback(() => {
        const bubbleCount = Math.max(1, complexity);  // Ensure at least one bubble
        const bigBubbleCount = Math.min(Math.ceil(gravity * bubbleCount / 10), bubbleCount);  // 10% of bubbles are big, but at least 1

        const newBubbles = Array.from({ length: bubbleCount }, (_, index) => {
            const isBig = index < bigBubbleCount;
            const bubbleSize = isBig ? bubblesize : Math.random() * 20 + 20;  // Big: 60-80, Small: 20-40

            return {
                path: generateBubblePath(),
                size: bubbleSize,
                x: Math.random() * (containerWidth - bubbleSize),
                y: Math.random() * (containerHeight - bubbleSize)
            };
        });

        setBubbles(newBubbles);
    }, [complexity, gravity, containerWidth, containerHeight, generateBubblePath, bubblesize]);

    useEffect(() => {
        generateBubbles();
    }, [generateBubbles]);

    const handleShuffle = () => {
        generateBubbles();
    };

    const handleDragStop = (index, x, y) => {
        const updatedBubbles = bubbles.map((bubble, i) => {
            if (i === index) {
                // Ensure the bubble stays within the container bounds
                const newX = Math.max(0, Math.min(x, containerWidth - bubble.size));
                const newY = Math.max(0, Math.min(y, containerHeight - bubble.size));
                return { ...bubble, x: newX, y: newY };
            }
            return bubble;
        });

        setBubbles(updatedBubbles);
        setIsDragging(false);
    };

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const downloadSVG = () => {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${containerWidth}" height="${containerHeight}" viewBox="0 0 ${containerWidth} ${containerHeight}">
                <rect width="100%" height="100%" fill="${backgroundColor}" />
                ${bubbles.map((bubble, index) => `
                    <g transform="translate(${bubble.x}, ${bubble.y}) scale(${bubble.size / 100})">
                        <path d="${bubble.path}" fill="${blobColor}" />
                    </g>
                `).join('')}
            </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bubbles.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadPNG = () => {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${containerWidth}" height="${containerHeight}" viewBox="0 0 ${containerWidth} ${containerHeight}">
                <rect width="100%" height="100%" fill="${backgroundColor}" />
                ${bubbles.map((bubble, index) => `
                    <g transform="translate(${bubble.x}, ${bubble.y}) scale(${bubble.size / 100})">
                        <path d="${bubble.path}" fill="${blobColor}" />
                    </g>
                `).join('')}
            </svg>
        `;
        const canvas = document.createElement('canvas');
        canvas.width = containerWidth;
        canvas.height = containerHeight;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            const png = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = png;
            a.download = 'bubbles.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
        img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
    };

    return (
        <div className="relative w-2/3 bg-[#242424] m-10 flex flex-col items-center justify-center rounded-md">
            <div
                ref={containerRef}
                className="relative flex justify-center items-center rounded-lg border overflow-hidden z-50"
                style={{ backgroundColor, width: containerWidth, height: containerHeight }}
            >
                {bubbles.map((bubble, index) => (
                    <DraggableBubble
                        key={index}
                        bubblePath={bubble.path}
                        blobColor={blobColor}
                        bubbleSize={bubble.size}
                        position={{ x: bubble.x, y: bubble.y }}
                        onDragStop={(x, y) => handleDragStop(index, x, y)}
                        onDragStart={handleDragStart}
                        isDragging={isDragging}
                        bounds="parent"
                    />
                ))}
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
                <div className='bg-red-600 p-1.5 rounded-full'>
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
        </div>
    );
};

export default BubbleGenerator;