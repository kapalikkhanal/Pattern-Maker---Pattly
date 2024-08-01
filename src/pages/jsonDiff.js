import React, { useState, useEffect, useRef } from 'react';
import LeftDiv from './components/leftDiv';

const JsonDifferentiator = () => {
    const [inputLeft, setInputLeft] = useState('');
    const [inputRight, setInputRight] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const leftInputRef = useRef(null);
    const rightInputRef = useRef(null);

    const handleDiffLines = () => {
        setErrorMessage('');

        if (!inputLeft.trim() || !inputRight.trim()) {
            setErrorMessage('Please provide input for both left and right sides.');
            return;
        }

        const leftLines = inputLeft.split('\n');
        const rightLines = inputRight.split('\n');
        const maxLines = Math.max(leftLines.length, rightLines.length);
        const newLeftLines = [];
        const newRightLines = [];

        for (let i = 0; i < maxLines; i++) {
            const leftLine = leftLines[i] || '';
            const rightLine = rightLines[i] || '';
            if (leftLine !== rightLine) {
                newLeftLines.push(`<span style="background-color: rgba(255, 255, 0, 0.3);">${leftLine}</span>`);
                newRightLines.push(`<span style="background-color: rgba(255, 0, 0, 0.3);">${rightLine}</span>`);
            } else {
                newLeftLines.push(leftLine);
                newRightLines.push(rightLine);
            }
        }

        leftInputRef.current.innerHTML = newLeftLines.join('<br/>');
        rightInputRef.current.innerHTML = newRightLines.join('<br/>');
    };

    const syncScroll = (source, target) => {
        if (target.current) {
            target.current.scrollTop = source.current.scrollTop;
            target.current.scrollLeft = source.current.scrollLeft;
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            syncScroll(leftInputRef, rightInputRef);
            syncScroll(rightInputRef, leftInputRef);
        };

        if (leftInputRef.current) {
            leftInputRef.current.addEventListener('scroll', handleScroll);
        }
        if (rightInputRef.current) {
            rightInputRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (leftInputRef.current) {
                leftInputRef.current.removeEventListener('scroll', handleScroll);
            }
            if (rightInputRef.current) {
                rightInputRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className="h-screen flex flex-row">
            <LeftDiv tool={'JsonFormatter'} />

            <div className='sticky w-full flex flex-col bg-black h-full'>
                <div className='flex justify-center items-center py-5 bg-black w-full'>
                    <h1 className='text-white text-xl text-center'>JSON Differentiator</h1>
                </div>

                <div className='flex flex-row h-full'>
                    <div className='w-2/4 flex-grow bg-white/20 pt-2'>
                        <div className='relative h-[95%] ml-6 px-2 pr-12'>
                            <h1 className='text-xs p-[2px] text-white/50 font-thin text-center'>Please paste your left text here.</h1>
                            <div className='bg-[#0F172A] rounded-2xl z-20 h-full p-4 flex'>
                                <div
                                    ref={leftInputRef}
                                    className="w-full overflow-y-scroll scrollbar-hide text-white bg-[#0e1424] rounded-lg px-2 outline-none h-full"
                                    contentEditable
                                    suppressContentEditableWarning
                                    onInput={(e) => setInputLeft(e.currentTarget.textContent)}
                                    style={{ whiteSpace: 'pre-wrap', caretColor: 'white' }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className='w-2/4 flex-grow bg-white/20 pt-2'>
                        <div className='relative h-[95%] ml-10 px-2 pr-6'>
                            <h1 className='text-xs p-[2px] text-white/50 font-thin text-center'>Please paste your right text here.</h1>
                            <div className='bg-[#0F172A] rounded-2xl z-20 h-full p-4 flex'>
                                <div
                                    ref={rightInputRef}
                                    className="w-full overflow-y-scroll scrollbar-hide text-white bg-[#0e1424] rounded-lg px-2 outline-none h-full"
                                    contentEditable
                                    suppressContentEditableWarning
                                    onInput={(e) => setInputRight(e.currentTarget.textContent)}
                                    style={{ whiteSpace: 'pre-wrap', caretColor: 'white' }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 h-fit w-fit'>
                    <div className='bg-red-600 p-1.5 rounded-full'>
                        <button type="button" className='button' onClick={handleDiffLines}>
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

                {errorMessage && (
                    <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-center py-2">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JsonDifferentiator;
