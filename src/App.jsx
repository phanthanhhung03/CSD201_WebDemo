import React, { useState, useEffect, useMemo } from 'react';
import { DSA_TYPES, SPEED_PRESETS } from './types/dsaTypes';
import { PSEUDOCODES } from './pseudocode/pseudocodes';
import { SinglyLinkedListEngine } from './dsa/SinglyLinkedList';
import { DoublyLinkedListEngine } from './dsa/DoublyLinkedList';
import { CircularLinkedListEngine } from './dsa/CircularLinkedList';
import { StackLLEngine } from './dsa/StackLL';
import { QueueLLEngine } from './dsa/QueueLL';
import { BinarySearchTreeEngine } from './dsa/BinarySearchTree';

import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import PlaybackControls from './components/PlaybackControls';
import VisualizationCanvas from './components/Canvas/VisualizationCanvas';
import CodePanel from './components/CodePanel';
import LogPanel from './components/LogPanel';

export default function App() {
  const [activeType, setActiveType] = useState(DSA_TYPES.SLL);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(SPEED_PRESETS.NORMAL);
  const [activeOp, setActiveOp] = useState(null);

  // Engines instances
  const sllEngine = useMemo(() => new SinglyLinkedListEngine(), []);
  const dllEngine = useMemo(() => new DoublyLinkedListEngine(), []);
  const cllEngine = useMemo(() => new CircularLinkedListEngine(), []);
  const stackEngine = useMemo(() => new StackLLEngine(6), []);
  const queueEngine = useMemo(() => new QueueLLEngine(6), []);
  const bstEngine = useMemo(() => new BinarySearchTreeEngine(), []);

  // Map active type to engine
  const getActiveEngine = () => {
    switch (activeType) {
      case DSA_TYPES.SLL: return sllEngine;
      case DSA_TYPES.DLL: return dllEngine;
      case DSA_TYPES.CLL: return cllEngine;
      case DSA_TYPES.STACK: return stackEngine;
      case DSA_TYPES.QUEUE: return queueEngine;
      case DSA_TYPES.BST: return bstEngine;
      default: return sllEngine;
    }
  };

  // Nạp dữ liệu mẫu ban đầu (Presets)
  const loadPreset = (type = activeType) => {
    setIsPlaying(false);
    let initialSnapshot;
    if (type === DSA_TYPES.SLL) {
      initialSnapshot = sllEngine.setInitialData([10, 20, 30, 40]);
    } else if (type === DSA_TYPES.DLL) {
      initialSnapshot = dllEngine.setInitialData([15, 25, 35, 45]);
    } else if (type === DSA_TYPES.CLL) {
      initialSnapshot = cllEngine.setInitialData([5, 12, 19, 27]);
    } else if (type === DSA_TYPES.STACK) {
      initialSnapshot = stackEngine.setInitialData([50, 40, 30, 20]);
    } else if (type === DSA_TYPES.QUEUE) {
      initialSnapshot = queueEngine.setInitialData([10, 20, 30, 40]);
    } else if (type === DSA_TYPES.BST) {
      initialSnapshot = bstEngine.setInitialData([50, 30, 70, 20, 40, 60, 80]);
    }
    setSteps([{
      ...initialSnapshot,
      pseudocodeLine: -1,
      log: `Đã khởi tạo dữ liệu mẫu cho ${type}.`
    }]);
    setCurrentStep(0);
    setActiveOp(null);
  };

  // Random Data Generator
  const loadRandom = () => {
    setIsPlaying(false);
    const count = Math.floor(Math.random() * 3) + 3; // 3 to 5 items
    const randomVals = Array.from({ length: count }, () => Math.floor(Math.random() * 90) + 10);
    
    let initialSnapshot;
    const engine = getActiveEngine();
    initialSnapshot = engine.setInitialData(randomVals);

    setSteps([{
      ...initialSnapshot,
      pseudocodeLine: -1,
      log: `Đã sinh ngẫu nhiên ${count} Node: [${randomVals.join(', ')}].`
    }]);
    setCurrentStep(0);
    setActiveOp(null);
  };

  // Clear / Reset Data
  const clearData = () => {
    setIsPlaying(false);
    const engine = getActiveEngine();
    const initialSnapshot = engine.setInitialData([]);
    setSteps([{
      ...initialSnapshot,
      pseudocodeLine: -1,
      log: `Đã xóa toàn bộ Node trong ${activeType}.`
    }]);
    setCurrentStep(0);
    setActiveOp(null);
  };

  // Chuyển đổi DSA Type
  const handleSelectType = (newType) => {
    setActiveType(newType);
    loadPreset(newType);
  };

  // Khởi tạo preset lần đầu tải trang
  useEffect(() => {
    loadPreset(DSA_TYPES.SLL);
  }, []);

  // Xử lý chạy lệnh thuật toán (Execute Operation)
  const handleExecuteOperation = (operation, payload) => {
    setIsPlaying(false);
    const engine = getActiveEngine();
    let generatedSteps = [];

    setActiveOp(operation);

    if (activeType === DSA_TYPES.SLL) {
      if (operation === 'insertHead') generatedSteps = engine.insertHead(payload.value);
      else if (operation === 'insertTail') generatedSteps = engine.insertTail(payload.value);
      else if (operation === 'insertAtIndex') generatedSteps = engine.insertAtIndex(payload.index, payload.value);
      else if (operation === 'deleteHead') generatedSteps = engine.deleteHead();
      else if (operation === 'deleteTail') generatedSteps = engine.deleteTail();
      else if (operation === 'deleteAtIndex') generatedSteps = engine.deleteAtIndex(payload.index);
      else if (operation === 'deleteValue') generatedSteps = engine.deleteValue(payload.value);
      else if (operation === 'search') generatedSteps = engine.search(payload.value);
      else if (operation === 'traverse') generatedSteps = engine.traverse();
      else if (operation === 'getFirst') generatedSteps = engine.getFirst();
      else if (operation === 'getLast') generatedSteps = engine.getLast();
      else if (operation === 'getByIndex') generatedSteps = engine.getByIndex(payload.index);
      else if (operation === 'reverse') generatedSteps = engine.reverse();
    } else if (activeType === DSA_TYPES.DLL) {
      if (operation === 'insertHead') generatedSteps = engine.insertHead(payload.value);
      else if (operation === 'insertTail') generatedSteps = engine.insertTail(payload.value);
      else if (operation === 'insertAtIndex') generatedSteps = engine.insertAtIndex(payload.index, payload.value);
      else if (operation === 'deleteHead') generatedSteps = engine.deleteHead();
      else if (operation === 'deleteTail') generatedSteps = engine.deleteTail();
      else if (operation === 'deleteAtIndex') generatedSteps = engine.deleteAtIndex(payload.index);
      else if (operation === 'search') generatedSteps = engine.search(payload.value);
      else if (operation === 'traverseForward') generatedSteps = engine.traverseForward();
      else if (operation === 'traverseBackward') generatedSteps = engine.traverseBackward();
      else if (operation === 'reverse') generatedSteps = engine.reverse();
    } else if (activeType === DSA_TYPES.CLL) {
      if (operation === 'insert') generatedSteps = engine.insert(payload.value);
      else if (operation === 'delete') generatedSteps = engine.delete(payload.value);
      else if (operation === 'search') generatedSteps = engine.search(payload.value);
      else if (operation === 'traverse') generatedSteps = engine.traverse();
      else if (operation === 'traverse2Loops') generatedSteps = engine.traverseMultipleLoops(2);
    } else if (activeType === DSA_TYPES.STACK) {
      if (operation === 'push') generatedSteps = engine.push(payload.value);
      else if (operation === 'pop') generatedSteps = engine.pop();
      else if (operation === 'peek') generatedSteps = engine.peek();
      else if (operation === 'isEmpty') generatedSteps = engine.isEmpty();
      else if (operation === 'clear') generatedSteps = engine.clear();
    } else if (activeType === DSA_TYPES.QUEUE) {
      if (operation === 'enqueue') generatedSteps = engine.enqueue(payload.value);
      else if (operation === 'dequeue') generatedSteps = engine.dequeue();
      else if (operation === 'peek') generatedSteps = engine.peek();
      else if (operation === 'peekRear') generatedSteps = engine.peekRear();
      else if (operation === 'isEmpty') generatedSteps = engine.isEmpty();
      else if (operation === 'clear') generatedSteps = engine.clear();
    } else if (activeType === DSA_TYPES.BST) {
      if (operation === 'insert') generatedSteps = engine.insert(payload.value);
      else if (operation === 'remove') generatedSteps = engine.remove(payload.value);
      else if (operation === 'search') generatedSteps = engine.search(payload.value);
      else if (operation === 'findMin') generatedSteps = engine.findMin();
      else if (operation === 'findMax') generatedSteps = engine.findMax();
      else if (operation === 'getHeight') generatedSteps = engine.getHeight();
      else if (operation === 'countLeaves') generatedSteps = engine.countLeaves();
      else if (operation === 'traverse') generatedSteps = engine.traverse(payload.traverseType);
    }

    if (generatedSteps && generatedSteps.length > 0) {
      setSteps(generatedSteps);
      setCurrentStep(0);
      setIsPlaying(true);
    }
  };

  // Playback Auto-play Timer Loop
  useEffect(() => {
    let timer = null;
    if (isPlaying && steps.length > 0) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps, speed]);

  const currentSnapshot = steps[currentStep] || {};
  const currentLogs = steps.map((s) => s.log);
  const activePseudocode = (activeOp && PSEUDOCODES[activeType] && PSEUDOCODES[activeType][activeOp])
    ? PSEUDOCODES[activeType][activeOp]
    : [];

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      
      {/* Header */}
      <Header
        activeType={activeType}
        onSelectType={handleSelectType}
        onPreset={() => loadPreset()}
        onRandom={loadRandom}
        onClear={clearData}
        currentSize={currentSnapshot.size ?? getActiveEngine().size}
        currentCapacity={currentSnapshot.capacity ?? (activeType === DSA_TYPES.STACK || activeType === DSA_TYPES.QUEUE ? 6 : null)}
      />

      {/* Main Layout Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 flex flex-col gap-4">
        
        {/* Top Control Panel & Playback */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ControlPanel
              activeType={activeType}
              onExecute={handleExecuteOperation}
            />
          </div>
          <div>
            <PlaybackControls
              isPlaying={isPlaying}
              currentStep={currentStep}
              totalSteps={steps.length}
              speed={speed}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              onStepBack={() => { setIsPlaying(false); setCurrentStep((prev) => Math.max(0, prev - 1)); }}
              onStepForward={() => { setIsPlaying(false); setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1)); }}
              onResetStep={() => { setIsPlaying(false); setCurrentStep(0); }}
              onSpeedChange={(newSpeed) => setSpeed(newSpeed)}
            />
          </div>
        </div>

        {/* Center Visualization Canvas */}
        <section className="w-full">
          <VisualizationCanvas
            activeType={activeType}
            snapshot={currentSnapshot}
          />
        </section>

        {/* Bottom Code Pseudocode & Logs Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodePanel
            pseudocode={activePseudocode}
            activeLine={currentSnapshot.pseudocodeLine ?? -1}
            title={`Pseudocode - ${activeOp ? activeOp : activeType}`}
          />
          <LogPanel
            logs={currentLogs}
            currentStep={currentStep}
          />
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-dark-border py-3 text-center text-xs text-slate-500 font-mono">
        PointerVision DSA Visualizer &bull; Triển khai bằng Con Trỏ (Nodes & Pointers) &bull; ReactJS + Framer Motion + Tailwind CSS
      </footer>

    </div>
  );
}
