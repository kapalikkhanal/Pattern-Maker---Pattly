import React from 'react';
import Image from 'next/image';

const LeftDiv = ({ onBlobClick, onWaveClick, onBubbleClick }) => {
    return (
        <div className="w-1/6 bg-[#242424] max-h-screen">
            <h2 className="text-2xl text-center font-bold px-4 py-2 mb-2 text-white">PATTLY<span className='text-red-600 text-3xl pl-1'>.</span></h2>

            {/* Blob  */}
            <div className='h-5/6 bg-[#363636] p-2 overflow-auto rounded flex flex-col pt-4 justify-start items-center'>
                <div className="mb-2 w-full h-28 relative" onClick={onBlobClick}>
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
                <div className="mb-2 w-full h-28 relative" onClick={onBubbleClick}>
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
                <div className="mb-2 w-full h-28 relative" onClick={onWaveClick}>
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
            </div>

            <div>
                <h2 className="text-md text-center font-bold px-4 py-2 mb-2 text-white">Ka Pa Lik<span className='text-red-600 text-xl pl-1'>.</span></h2>
            </div>
        </div>
    );
};

export default LeftDiv;
