import React from 'react';
import Image from 'next/image';

const LeftDiv = ({ onBlobClick, onWaveClick, onBubbleClick, onGridClick, onLineClick, onChessClick }) => {
    return (
        <div className="w-1/6 bg-[#242424] max-h-screen">
            <h2 className="text-2xl text-center font-bold px-4 py-2 mb-2 text-white">PATTLY<span className='text-red-600 text-3xl pl-1'>.</span></h2>


            <div className='h-5/6 overflow-y-scroll scrollbar-hide bg-[#383434] p-2 rounded m-2 z-0'>

                <div className='h-10'>
                    <div className="select z-50">
                        <div
                            className="selected"
                            data-default="All"
                            data-one="option-1"
                            data-two="option-2"
                            data-three="option-3"
                        >
                            <div className='flex flex-row space-x-3 justify-center items-center w-full'>
                                <div>
                                    {/* <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 512 512" xml:space="preserve" fill="#fffafa" stroke="#fffafa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  .st0{fill:#ffffff;}  </style> <g> <path class="st0" d="M360.102,240.012l10.156-10.266c0,0,15.609-13.406,33.406-7.328c30.984,10.578,66.781-0.875,91.609-25.734 c7.063-7.063,15.641-21.234,15.641-21.234c0.984-1.344,1.328-3.047,0.922-4.672l-1.922-7.906c-0.359-1.484-1.313-2.75-2.625-3.531 c-1.313-0.766-2.891-0.969-4.344-0.547l-60.984,16.969c-2.266,0.625-4.688-0.219-6.063-2.109l-28.015-38.594 c-0.859-1.172-1.219-2.641-1.016-4.063l5.641-41c0.297-2.234,1.891-4.047,4.063-4.656l64.406-17.922 c2.906-0.813,4.672-3.813,3.953-6.766l-2.547-10.359c-0.344-1.469-1.281-2.719-2.563-3.5c0,0-5.047-3.344-8.719-5.234 c-36.578-18.891-82.64-13.031-113.312,17.656c-22.656,22.656-31.531,53.688-27.375,83.156c3.203,22.656,1.703,34.703-8.078,45.047 c-0.891,0.922-3.703,3.734-8.047,8L360.102,240.012z"></path> <path class="st0" d="M211.383,295.418C143.024,361.652,68.461,433.715,68.461,433.715c-2.547,2.438-4,5.797-4.047,9.313 c-0.047,3.5,1.344,6.891,3.813,9.375l31.938,31.938c2.5,2.484,5.875,3.859,9.391,3.813c3.516-0.031,6.859-1.5,9.281-4.031 l139.328-140.953L211.383,295.418z"></path> <path class="st0" d="M501.43,451.371c2.484-2.484,3.859-5.859,3.813-9.375c-0.031-3.516-1.5-6.859-4.031-9.297L227.415,166.246 l-43.953,43.969L450.805,483.09c2.438,2.547,5.781,4,9.297,4.047s6.891-1.344,9.391-3.828L501.43,451.371z"></path> <path class="st0" d="M254.196,32.621c-32.969-12.859-86.281-14.719-117.156,16.141c-24.313,24.313-59.875,59.891-59.875,59.891 c-12.672,12.656-0.906,25.219-10.266,34.563c-9.359,9.359-24.313,0-32.734,8.422L3.29,182.527c-4.391,4.375-4.391,11.5,0,15.891 l43.016,43.016c4.391,4.391,11.516,4.391,15.906,0l30.875-30.875c8.438-8.422-0.938-23.375,8.438-32.719 c12.609-12.625,26.375-10.484,34.328-2.547l15.891,15.891l17.219,4.531l43.953-43.953l-5.063-16.688 c-14.016-14.031-16.016-30.266-7.234-39.047c13.594-13.594,36.047-33.234,57.078-41.656 C271.102,49.012,267.055,35.668,254.196,32.621z M194.571,103.48c-0.063,0.047,5.859-7.281,5.969-7.375L194.571,103.48z"></path> </g> </g></svg> */}
                                    <svg width="64px" height="64px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#d12626" stroke="#fbff00" className='h-4 w-4'>
                                        <path class="st0" d="M360.102,240.012l10.156-10.266c0,0,15.609-13.406,33.406-7.328c30.984,10.578,66.781-0.875,91.609-25.734 c7.063-7.063,15.641-21.234,15.641-21.234c0.984-1.344,1.328-3.047,0.922-4.672l-1.922-7.906c-0.359-1.484-1.313-2.75-2.625-3.531 c-1.313-0.766-2.891-0.969-4.344-0.547l-60.984,16.969c-2.266,0.625-4.688-0.219-6.063-2.109l-28.015-38.594 c-0.859-1.172-1.219-2.641-1.016-4.063l5.641-41c0.297-2.234,1.891-4.047,4.063-4.656l64.406-17.922 c2.906-0.813,4.672-3.813,3.953-6.766l-2.547-10.359c-0.344-1.469-1.281-2.719-2.563-3.5c0,0-5.047-3.344-8.719-5.234 c-36.578-18.891-82.64-13.031-113.312,17.656c-22.656,22.656-31.531,53.688-27.375,83.156c3.203,22.656,1.703,34.703-8.078,45.047 c-0.891,0.922-3.703,3.734-8.047,8L360.102,240.012z"></path>
                                        <path class="st0" d="M211.383,295.418C143.024,361.652,68.461,433.715,68.461,433.715c-2.547,2.438-4,5.797-4.047,9.313 c-0.047,3.5,1.344,6.891,3.813,9.375l31.938,31.938c2.5,2.484,5.875,3.859,9.391,3.813c3.516-0.031,6.859-1.5,9.281-4.031 l139.328-140.953L211.383,295.418z"></path>
                                        <path class="st0" d="M501.43,451.371c2.484-2.484,3.859-5.859,3.813-9.375c-0.031-3.516-1.5-6.859-4.031-9.297L227.415,166.246 l-43.953,43.969L450.805,483.09c2.438,2.547,5.781,4,9.297,4.047s6.891-1.344,9.391-3.828L501.43,451.371z"></path>
                                        <path class="st0" d="M254.196,32.621c-32.969-12.859-86.281-14.719-117.156,16.141c-24.313,24.313-59.875,59.891-59.875,59.891 c-12.672,12.656-0.906,25.219-10.266,34.563c-9.359,9.359-24.313,0-32.734,8.422L3.29,182.527c-4.391,4.375-4.391,11.5,0,15.891 l43.016,43.016c4.391,4.391,11.516,4.391,15.906,0l30.875-30.875c8.438-8.422-0.938-23.375,8.438-32.719 c12.609-12.625,26.375-10.484,34.328-2.547l15.891,15.891l17.219,4.531l43.953-43.953l-5.063-16.688 c-14.016-14.031-16.016-30.266-7.234-39.047c13.594-13.594,36.047-33.234,57.078-41.656 C271.102,49.012,267.055,35.668,254.196,32.621z M194.571,103.48c-0.063,0.047,5.859-7.281,5.969-7.375L194.571,103.48z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p>Other Tools</p>
                                </div>
                            </div>
                        </div>
                        <div className="options">
                            <div title="option-1">
                                <input id="option-1" name="option" type="radio" />
                                <label className="option" for="option-1" data-txt="Navbar Builder"></label>
                            </div>
                            <div title="option-2">
                                <input id="option-2" name="option" type="radio" />
                                <label className="option" for="option-2" data-txt="Other Tools"></label>
                            </div>
                            <div title="option-3">
                                <input id="option-3" name="option" type="radio" />
                                <label className="option" for="option-3" data-txt="Other Tools"></label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blob  */}
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
