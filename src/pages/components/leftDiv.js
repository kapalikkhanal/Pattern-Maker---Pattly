import React from 'react';
import Image from 'next/image';

const LeftDiv = ({ onBlobClick, onWaveClick, onBubbleClick, onGridClick, onLineClick, onChessClick }) => {
    return (
        <div className="w-1/6 bg-[#242424] max-h-screen">
            <h2 className="text-2xl text-center font-bold px-4 py-2 mb-2 text-white">PATTLY<span className='text-red-600 text-3xl pl-1'>.</span></h2>

            {/* Blob  */}
            {/* <div className='h-5/6 bg-[#363636] p-2 overflow-y-scroll scrollbar-hide rounded-xl flex flex-col pt-4 justify-start items-center cursor-pointer'> */}
            <div className='h-5/6 overflow-y-scroll scrollbar-hide bg-[#383434] p-2 rounded m-2'>
                <div className="mb-2 w-full h-28 relative hover:border-2 rounded-xl" onClick={onBlobClick}>
                    <Image
                        src={'/blob.png'}
                        fill="fill"
                        style={{ objectFit: 'cover' }}
                        className='rounded-xl'
                        alt='Blob'
                        sizes="(max-width: 768px) 100vw, 
                                (max-width: 1200px) 50vw, 
                                33vw"
                        priority
                    />
                </div>

                {/* Bubbles  */}
                <div className="mb-2 w-full h-28 relative hover:border-2 rounded-xl" onClick={onBubbleClick}>
                    <Image
                        src={'/bubble.png'}
                        fill="fill"
                        style={{ objectFit: 'cover' }}
                        className='rounded-xl'
                        alt='Wave'
                        sizes="(max-width: 768px) 100vw, 
                                (max-width: 1200px) 50vw, 
                                33vw"
                        priority
                    />
                </div>

                {/* Wave  */}
                <div className="mb-2 w-full h-28 relative hover:border-2 rounded-xl" onClick={onWaveClick}>
                    <Image
                        src={'/wave.png'}
                        fill="fill"
                        style={{ objectFit: 'cover' }}
                        className='rounded-xl'
                        alt='Wave'
                        sizes="(max-width: 768px) 100vw, 
                                (max-width: 1200px) 50vw, 
                                33vw"
                        priority
                    />
                </div>

                {/* Grid  */}
                <div className="mb-2 w-full h-28 relative hover:border-2 rounded-xl" onClick={onGridClick}>
                    <Image
                        src={'/grid.png'}
                        fill="fill"
                        style={{ objectFit: 'cover' }}
                        className='rounded-xl'
                        alt='Wave'
                        sizes="(max-width: 768px) 100vw, 
                                (max-width: 1200px) 50vw, 
                                33vw"
                        priority
                    />
                </div>

                {/* lINES  */}
                <div className="mb-2 w-full h-28 relative hover:border-2 rounded-xl" onClick={onLineClick}>
                    <Image
                        src={'/lines.png'}
                        fill="fill"
                        style={{ objectFit: 'cover' }}
                        className='rounded-xl'
                        alt='Wave'
                        sizes="(max-width: 768px) 100vw, 
                                (max-width: 1200px) 50vw, 
                                33vw"
                        priority
                    />
                </div>

                {/* Chess  */}
                <div className="mb-2 w-full h-28 relative hover:border-2 rounded-xl" onClick={onChessClick}>
                    <Image
                        src={'/chess.png'}
                        fill="fill"
                        style={{ objectFit: 'cover' }}
                        className='rounded-xl'
                        alt='Wave'
                        sizes="(max-width: 768px) 100vw, 
                                (max-width: 1200px) 50vw, 
                                33vw"
                        priority
                    />
                </div>

            </div>

            <div>
                <h2 className="text-md text-center font-bold px-4 py-2 mb-2 text-white">Ka Pa Lik<span className='text-red-600 text-xl pl-1'>.</span></h2>
            </div>
        </div>
    );
};

export default LeftDiv;
