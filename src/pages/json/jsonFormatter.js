import { useState, useEffect, useRef } from 'react';
import LeftDiv from '../components/leftDiv';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [tooltipText, setTooltipText] = useState('Copy');
  const [tooltipClearText, setTooltipClearText] = useState('Clear');
  const tooltipRef = useRef(null);
  const tooltipClearRef = useRef(null);
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

  const highlightJson = (json) => {
    if (!json) return '';
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return `<span className="${cls}">${match}</span>`;
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson).then(() => {
      setTooltipText('Copied!');
      setTimeout(() => {
        setTooltipText('Copy');
      }, 2000);
    });
  };

  const handleClear = () => {
    setTooltipClearText('Cleared.');
    setInput('')
    setFormattedJson('')
    setTimeout(() => {
      setTooltipClearText('Clear');
    }, 2000);
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
      <LeftDiv tool={'JsonFormatter'} />

      <div className='sticky w-full flex flex-col bg-black h-full'>
        <div className='flex justify-center items-center py-5 bg-black w-full'>
          <h1 className='text-white text-xl text-center'>JSON Beautifier</h1>
        </div>

        <div className='flex flex-row h-full'>

          <div className='w-2/4 flex-grow bg-white/20 pt-2'>
            <div className='relative h-[95%] ml-6 px-2 pr-12'>
              <h1 className='text-xs p-[2px] text-white/50 font-thin text-center'>Please paste your JSON code here.</h1>
              <div className='bg-[#0F172A] rounded-2xl z-20 h-full p-4 flex'>
                <div className='line-numbers pr-2 text-gray-500 bg-[#0e1424] overflow-hidden' ref={lineNumbersRef}></div>
                <textarea
                  ref={inputRef}
                  className="w-full overflow-y-scroll scrollbar-hide text-white bg-[#0e1424] rounded-lg px-2 outline-none h-full"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              <div className='absolute top-1.5 right-14'>
                <button className="copy" onClick={handleClear}>
                  <span ref={tooltipClearRef} className="tooltip">{tooltipClearText}</span>
                  <span>
                    <svg style={{ enableBackground: 'new 0 0 512 512' }} fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className='clipboard'>
                      <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"></path>
                    </svg>
                    <svg style={{ enableBackground: 'new 0 0 512 512' }} viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg" className="checkmark">
                      <g>
                        <path fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path>
                      </g>
                    </svg>
                  </span>
                </button>
              </div>

            </div>
          </div>

          <div className='w-2/4 flex-grow bg-white/20 pt-2'>
            <div className='relative h-[95%] ml-10 px-2 pr-6'>
            <h1 className='text-xs p-[2px] text-white/50 font-thin text-center'>Your beautified JSON code here.</h1>
              <div className='bg-[#0F172A] rounded-2xl z-20 h-full p-4 flex'>
                <div className='line-numbers pr-2 text-gray-500 bg-[#0e1424] overflow-hidden' ref={formattedLineNumbersRef}></div>
                <pre
                  ref={formattedJsonRef}
                  className="w-full overflow-y-scroll scrollbar-hide text-white bg-[#0e1424] rounded-lg px-2 outline-none h-full"
                  dangerouslySetInnerHTML={{ __html: highlightJson(formattedJson) }}
                  readOnly
                />
              </div>

              <div className='absolute top-1.5 right-8'>
                <button className="copy" onClick={handleCopy}>
                  <span ref={tooltipRef} className="tooltip">{tooltipText}</span>
                  <span>
                    <svg style={{ enableBackground: 'new 0 0 512 512' }} viewBox="0 0 6.35 6.35" height="20" width="20" xmlns="http://www.w3.org/2000/svg" className="clipboard">
                      <g>
                        <path fill="currentColor" d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"></path>
                      </g>
                    </svg>
                    <svg style={{ enableBackground: 'new 0 0 512 512' }} viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg" className="checkmark">
                      <g>
                        <path fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path>
                      </g>
                    </svg>
                  </span>
                </button>
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
