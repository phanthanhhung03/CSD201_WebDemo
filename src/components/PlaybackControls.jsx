import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Gauge } from 'lucide-react';
import { SPEED_PRESETS } from '../types/dsaTypes';

export default function PlaybackControls({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onTogglePlay,
  onStepBack,
  onStepForward,
  onResetStep,
  onSpeedChange
}) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-3 shadow-lg flex flex-wrap items-center justify-between gap-3">
      
      {/* Playback Action Buttons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onResetStep}
          disabled={currentStep === 0}
          className="p-2 bg-dark-panel hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:hover:bg-dark-panel rounded-lg transition"
          title="Về đầu animation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onStepBack}
          disabled={currentStep <= 0}
          className="p-2 bg-dark-panel hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:hover:bg-dark-panel rounded-lg transition"
          title="Lùi 1 bước"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={onTogglePlay}
          disabled={totalSteps <= 1}
          className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center space-x-2 transition shadow-md ${
            isPlaying
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 glow-amber'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 glow-cyan'
          } disabled:opacity-40`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>TẠM DỪNG</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{currentStep >= totalSteps - 1 ? 'PHÁT LẠI' : 'TỰ ĐỘNG PHÁT'}</span>
            </>
          )}
        </button>

        <button
          onClick={onStepForward}
          disabled={currentStep >= totalSteps - 1}
          className="p-2 bg-dark-panel hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:hover:bg-dark-panel rounded-lg transition"
          title="Tới 1 bước"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Step Counter Indicator */}
      <div className="flex items-center space-x-2 bg-dark-bg px-3 py-1.5 rounded-lg border border-dark-border">
        <span className="text-xs text-slate-400">Tiến trình:</span>
        <span className="text-xs font-mono font-bold text-cyan-400">
          {totalSteps > 0 ? `${currentStep + 1} / ${totalSteps}` : '0 / 0'}
        </span>
      </div>

      {/* Speed Slider */}
      <div className="flex items-center space-x-2">
        <Gauge className="w-4 h-4 text-emerald-400" />
        <span className="text-xs text-slate-300 font-medium">Tốc độ:</span>
        <div className="flex bg-dark-bg p-1 rounded-lg border border-dark-border gap-1">
          <button
            onClick={() => onSpeedChange(SPEED_PRESETS.SLOW)}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
              speed === SPEED_PRESETS.SLOW ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Chậm
          </button>
          <button
            onClick={() => onSpeedChange(SPEED_PRESETS.NORMAL)}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
              speed === SPEED_PRESETS.NORMAL ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Vừa
          </button>
          <button
            onClick={() => onSpeedChange(SPEED_PRESETS.FAST)}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
              speed === SPEED_PRESETS.FAST ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Nhanh
          </button>
        </div>
      </div>

    </div>
  );
}
