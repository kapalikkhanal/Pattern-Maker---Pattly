import { useState, useEffect, useRef } from 'react';
import LeftDiv from './components/leftDiv';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const inputRef = useRef(null);
  const formattedJsonRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const formattedLineNumbersRef = useRef(null);

  const handleFormatJson = () => {
    try {
      const parsedJson = JSON.parse(input);
      const prettyJson = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(prettyJson);
    } catch (error) {
      setFormattedJson('Invalid JSON');
    }
  };

  // .input-container .bash-text .user {
  //   color: #E879F9;
  // }

  // .input-container .bash-text .vm {
  //   color: #2DD4BF;
  // }

  // .input-container .bash-text .char {
  //   color: #A78BFA;
  // }

  const addLineNumbers = (text) => {
    const lines = text.split('\n').length;
    return Array.from({ length: lines }, (_, i) => i + 1).join('\n');
  };

  const syncScroll = (source, target) => {
    if (target.current) {
      target.current.scrollTop = source.current.scrollTop;
      target.current.scrollLeft = source.current.scrollLeft;
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
    if (formattedJsonRef.current) {
      formattedJsonRef.current.scrollTop = formattedJsonRef.current.scrollHeight;
    }
  }, [input, formattedJson]);

  useEffect(() => {
    const handleScroll = () => {
      syncScroll(inputRef, lineNumbersRef);
      syncScroll(formattedJsonRef, formattedLineNumbersRef);
    };

    if (inputRef.current) {
      inputRef.current.addEventListener('scroll', handleScroll);
    }
    if (formattedJsonRef.current) {
      formattedJsonRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('scroll', handleScroll);
      }
      if (formattedJsonRef.current) {
        formattedJsonRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.innerText = addLineNumbers(input);
    }
    if (formattedLineNumbersRef.current) {
      formattedLineNumbersRef.current.innerText = addLineNumbers(formattedJson);
    }
  }, [input, formattedJson]);

  return (
    <div className="h-screen flex flex-row">
      <LeftDiv />

      <div className='sticky w-full flex flex-col bg-black h-full'>
        <div className='flex justify-center items-center py-5 bg-gray-950 w-full'>
          <h1 className='text-white text-xl text-center font-medium'>JSON Beautifier</h1>
        </div>

        <div className='flex flex-row h-full'>

          <div className='w-2/4 flex-grow bg-white/20 pt-10'>
            <div className='h-[95%] ml-6 px-2 pr-12'>
              <div className='bg-[#0F172A] rounded-2xl px-4 pb-4 z-20 h-full flex flex-col'>
                <h1 className='text-xs p-[2px] text-white/50 font-thin text-center'>Please paste your JSON code here.</h1>
                <div className='p-4 line-numbers pr-2 text-gray-500 bg-[#0e1424]' ref={lineNumbersRef}></div>
                <textarea
                  ref={inputRef}
                  className={`w-full overflow-y-scroll scrollbar-hide text-white bg-[#0e1424] rounded-lg px-2 outline-none h-full`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='w-2/4 flex-grow bg-white/20 pt-10'>
            <div className='h-[95%] ml-10 px-2 pr-6'>
            <div className='bg-[#0F172A] rounded-2xl px-4 pb-4 z-20 h-full flex flex-col'>
            <h1 className='text-xs p-[2px] text-white/50 font-thin text-center'>Your beautified JSON code here.</h1>
                <div className='line-numbers pr-2 text-gray-500 bg-[#0e1424] overflow-hidden' ref={formattedLineNumbersRef}></div>
                <textarea
                  ref={formattedJsonRef}
                  className="w-full overflow-y-scroll scrollbar-hide text-white bg-[#0e1424] rounded-lg px-2 outline-none h-full"
                  value={formattedJson}
                  readOnly
                />
              </div>
            </div>
          </div>

        </div>

        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 h-fit w-fit'>
          <div className='  bg-red-600 p-1.5 rounded-full'>
            <button type="button" className='button' onClick={handleFormatJson}>
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

    </div>
  );
};

export default JsonFormatter;
