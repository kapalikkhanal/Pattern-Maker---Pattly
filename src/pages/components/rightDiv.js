import React, { useRef, useState } from 'react';

const RightDiv = ({
    size,
    complexity,
    gravity,
    blobColor,
    backgroundColor,
    handleBlobColorChange,
    handleBackgroundColorChange,
    handleSizeChange,
    handleComplexityChange,
    handleGravityChange,
    handleCanvasSizeChange,
}) => {
    const colorInputRef = useRef(null);
    const fillColorInputRef = useRef(null);

    const [isEyeChecked, setIsEyeChecked] = useState(false);
    const [originalBackgroundColor, setOriginalBackgroundColor] = useState(backgroundColor);

    const handleDivClick = () => {
        colorInputRef.current.click();
    };

    const handleFillDivClick = () => {
        fillColorInputRef.current.click();
    };

    const handleEyeCheckboxChange = (e) => {
        const checked = e.target.checked;
        setIsEyeChecked(checked);

        if (checked) {
            // Store the current background color if it's not transparent
            if (backgroundColor !== 'transparent') {
                setOriginalBackgroundColor(backgroundColor);
            }
            handleBackgroundColorChange({ target: { value: 'transparent' } });
        } else {
            // Restore the original background color
            handleBackgroundColorChange({ target: { value: originalBackgroundColor } });
        }
    };

    const handleCanvasChange = (e) => {
        const selectedSize = e.target.value;
        let width, height;

        switch (selectedSize) {
            case '1:1':
                width = 700;
                height = 700;
                break;
            case '2:1':
                width = 900;
                height = 450;
                break;
            case '3:2':
                width = 900;
                height = 600;
                break;
            case '4:3':
                width = 900;
                height = 675;
                break;
            case '16:9':
                width = 960;
                height = 540;
                break;
            default:
                width = 900;
                height = 675;
        }

        handleCanvasSizeChange({ width, height });
    };

    return (
        <div className="w-96 bg-[#242424] p-4 h-screen">
            <h2 className="text-lg mb-4 font-semibold">Configurations</h2>
            {/* Settings  */}
            <div className='h-5/6 overflow-y-scroll scrollbar-hide bg-[#383434] p-2 rounded-2xl'>
                {/* Canvas Size */}
                <div className="mb-4">
                    <label className="block mb-2">Canvas Size</label>
                    <select
                        // value={canvasSize}
                        onChange={handleCanvasChange}
                        className="bg-[#222630] px-4 py-2 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                    >
                        <option value="1:1">1:1</option>
                        <option value="2:1">2:1</option>
                        <option value="3:2">3:2</option>
                        <option value="4:3">4:3</option>
                        <option value="16:9">16:9</option>
                    </select>
                </div>
                {/* Background Color */}
                <label className="block mb-2">Background</label>
                <div className='flex flex-row justify-start items-center mb-4 space-x-2'>

                    <input
                        id='pickColor'
                        type="color"
                        value={backgroundColor}
                        onChange={handleBackgroundColorChange}
                        className="hidden"
                        ref={colorInputRef}
                    />

                    <div
                        onClick={handleDivClick}
                        className="w-20 h-10 rounded cursor-pointer"
                        style={{ backgroundColor: backgroundColor }}
                    />

                    <input
                        className="bg-[#222630] px-4 py-2 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                        value={backgroundColor}
                        onChange={handleBackgroundColorChange}
                        type="text"
                        placeholder={backgroundColor}
                    />


                    <div className='w-20'>
                        <label className="container">
                            <input
                                type="checkbox"
                                checked={isEyeChecked}
                                onChange={handleEyeCheckboxChange}
                            />
                            <svg className="eye" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                            <svg className="eye-slash" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path></svg>
                        </label>
                    </div>
                </div>
                {/* Fill Color  */}
                <label className="block mb-2">Fill</label>
                <div className='flex flex-row justify-start items-center mb-4 space-x-2'>

                    <input
                        id='pickColor'
                        type="color"
                        value={blobColor}
                        onChange={handleBlobColorChange}
                        className="hidden"
                        ref={fillColorInputRef}
                    />

                    <div
                        onClick={handleFillDivClick}
                        className="w-16 h-10 rounded cursor-pointer"
                        style={{ backgroundColor: blobColor }}
                    />

                    <input
                        className="bg-[#222630] px-4 py-2 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                        value={blobColor}
                        onChange={handleBlobColorChange}
                        type="text"
                        placeholder={blobColor}
                    />

                </div>
                {/* Size */}
                <div className="mb-4">
                    <label className="block mb-2">Size</label>
                    <input
                        type="range"
                        min="3"
                        max="16"
                        step="1"
                        value={size}
                        onChange={handleSizeChange}
                        className="w-full"
                    />
                </div>
                {/* Complexity */}
                <div className="mb-4">
                    <label className="block mb-2">Complexity</label>
                    <input
                        type="range"
                        min="0.4"
                        max="3"
                        step="0.2"
                        value={complexity}
                        onChange={handleComplexityChange}
                        className="w-full"
                    />
                </div>
                {/* Corners  */}
                <div className="mb-4 w-full">
                    <label className="block mb-2">Corners</label>
                    <input
                        type="range"
                        min="3"
                        max="12"
                        step="1"
                        value={gravity}
                        onChange={handleGravityChange}
                        className="w-full custom-range"
                    />
                </div>
            </div>

            <div>
                <h2 className="text-md text-center font-bold px-4 py-2 text-white">A product by Ka Pa Lik<span className='text-red-600 text-xl pl-1'>.</span></h2>
            </div>
        </div>
    );
};

export default RightDiv;
