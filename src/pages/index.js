import { useState } from 'react';
import LeftDiv from './components/leftDiv';
import BlobGenerator from './components/blobGenerator';
import WaveGenerator from './components/waveGenerator';
import RightDiv from './components/rightDiv';
import BubbleGenerator from './components/bubbleGenerator';

export default function Home() {
  const [currentComponent, setCurrentComponent] = useState('blob');

  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [blobSize, setBlobSize] = useState(9);
  const [waveSize, setWaveSize] = useState(6);
  const [canvasSize, setCanvasSize] = useState({ width: 900, height: 675 });
  const [complexity, setComplexity] = useState(1);
  const [gravity, setGravity] = useState(6);
  const [blobColor, setBlobColor] = useState('#0000ff');
  const [backgroundColor, setBackgroundColor] = useState('#000000');

  const handleRowsChange = (e) => setRows(e.target.value);
  const handleColsChange = (e) => setCols(e.target.value);
  const handleBlobColorChange = (e) => setBlobColor(e.target.value);
  const handleBackgroundColorChange = (e) => setBackgroundColor(e.target.value);
  const handleBlobSizeChange = (e) => setBlobSize(e.target.value);
  const handleWaveSizeChange = (e) => setWaveSize(e.target.value);
  const handleComplexityChange = (e) => setComplexity(e.target.value);
  const handleGravityChange = (e) => setGravity(e.target.value);
  const handleCanvasSizeChange = (size) => setCanvasSize(size);

  const renderComponent = () => {
    if (currentComponent === 'blob') {
      return (
        <BlobGenerator
          rows={rows}
          cols={cols}
          blobColor={blobColor}
          size={blobSize}
          complexity={complexity}
          canvasSize={canvasSize}
          gravity={gravity}
          backgroundColor={backgroundColor}
        />
      );
    } else if (currentComponent === 'wave') {
      return (
        <WaveGenerator
          blobColor={blobColor}
          size={waveSize}
          backgroundColor={backgroundColor}
          complexity={complexity}
          gravity={gravity}
          canvasSize={canvasSize}
        />
      );
    }
    else if (currentComponent === 'bubble') {
      return (
        <BubbleGenerator
          blobColor={blobColor}
          size={waveSize}
          backgroundColor={backgroundColor}
          complexity={complexity * 10}
          gravity={gravity}
          canvasSize={canvasSize}
        />
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-row">
      <LeftDiv
        onBlobClick={() => setCurrentComponent('blob')}
        onWaveClick={() => setCurrentComponent('wave')}
        onBubbleClick={() => setCurrentComponent('bubble')}
      />

      {renderComponent()}

      <RightDiv
        rows={rows}
        cols={cols}
        blobColor={blobColor}
        size={currentComponent === 'blob' ? blobSize : waveSize}
        complexity={complexity}
        gravity={gravity}
        backgroundColor={backgroundColor}
        handleRowsChange={handleRowsChange}
        handleColsChange={handleColsChange}
        handleBlobColorChange={handleBlobColorChange}
        handleBackgroundColorChange={handleBackgroundColorChange}
        handleSizeChange={currentComponent === 'blob' ? handleBlobSizeChange : handleWaveSizeChange}
        handleComplexityChange={handleComplexityChange}
        handleGravityChange={handleGravityChange}
        handleCanvasSizeChange={handleCanvasSizeChange}
      />
    </div>
  );
}
