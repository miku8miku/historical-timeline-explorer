import React, { useState, useEffect, useRef } from 'react';
import CRTWrapper from './CRTWrapper';
import TimeAxis from './TimeAxis';
import EventDetail from './EventDetail';
import { historicalEvents } from '../utils/historicalData';
import './TimelineExplorer.css';

const TimelineExplorer = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentYear, setCurrentYear] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // 计算事件位置
  const calculateEventPosition = (year) => {
    // 将年份转换为坐标位置
    const scale = zoomLevel * 50; // 每100年占用50px空间
    const originYear = 0; // 以公元0年为原点
    const x = (year - originYear) * (scale / 100);
    return { x };
  };

  // 处理事件选择
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setCurrentYear(event.year);
  };

  // 处理滚轮缩放
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  return (
    <CRTWrapper>
      <div 
        className="timeline-explorer" 
        ref={containerRef}
        onWheel={handleWheel}
      >
        <div className="timeline-header">
          <h1>时间轴历史探索器</h1>
          <p>穿越时空，探索人类历史的重要时刻</p>
          <div className="current-year-display">
            当前时间: <span className="year-value">{currentYear >= 0 ? `${currentYear}年` : `${Math.abs(currentYear)}年前`}</span>
          </div>
        </div>
        
        <div className="timeline-container">
          <TimeAxis 
            events={historicalEvents} 
            onSelectEvent={handleEventSelect}
            zoomLevel={zoomLevel}
            currentPosition={position}
          />
        </div>
        
        {selectedEvent && (
          <EventDetail 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
          />
        )}
        
        <div className="timeline-controls">
          <button onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.1))}>-</button>
          <span>缩放: {(zoomLevel * 100).toFixed(0)}%</span>
          <button onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.1))}>+</button>
        </div>
      </div>
    </CRTWrapper>
  );
};

export default TimelineExplorer;