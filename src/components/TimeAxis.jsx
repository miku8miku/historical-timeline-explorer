import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './TimeAxis.css';

const TimeAxis = ({ events, onSelectEvent, zoomLevel, currentPosition }) => {
  const axisRef = useRef(null);

  // 计算事件位置
  const calculateEventPosition = (year) => {
    const scale = zoomLevel * 50; // 每100年占用50px空间
    const originYear = 0; // 以公元0年为原点
    const x = (year - originYear) * (scale / 100);
    return { x };
  };

  // 计算时间轴范围
  const minYear = Math.min(...events.map(e => e.year)) - 500;
  const maxYear = Math.max(...events.map(e => e.year)) + 500;
  
  // 生成世纪标记
  const centuryMarks = [];
  for (let year = Math.ceil(minYear / 100) * 100; year <= maxYear; year += 100) {
    if (year !== 0) { // 跳过0年标记，因为我们会特别标注
      centuryMarks.push(year);
    }
  }

  return (
    <div className="time-axis-container">
      <div className="time-axis-scroll-area">
        <svg className="time-axis-svg" ref={axisRef} width="100%" height="200">
          {/* 时间轴主线 */}
          <line 
            x1="0" 
            y1="100" 
            x2={`${(maxYear - minYear) * (zoomLevel * 0.5)}px`} 
            y2="100" 
            stroke="var(--timeline-green)" 
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          
          {/* 世纪标记 */}
          {centuryMarks.map(year => {
            const pos = calculateEventPosition(year);
            const adjustedX = pos.x - minYear * (zoomLevel * 0.5);
            return (
              <g key={`century-${year}`}>
                <line 
                  x1={adjustedX} 
                  y1="80" 
                  x2={adjustedX} 
                  y2="120" 
                  stroke="var(--timeline-dim)" 
                  strokeWidth="1"
                />
                <text 
                  x={adjustedX} 
                  y="70" 
                  fill="var(--timeline-green)" 
                  fontSize="12" 
                  textAnchor="middle"
                >
                  {year >= 0 ? `${year}` : `${Math.abs(year)}BC`}
                </text>
              </g>
            );
          })}
          
          {/* 公元0年标记 */}
          {minYear < 0 && maxYear > 0 && (
            <g>
              <line 
                x1={Math.abs(minYear) * (zoomLevel * 0.5)} 
                y1="70" 
                x2={Math.abs(minYear) * (zoomLevel * 0.5)} 
                y2="130" 
                stroke="var(--timeline-green)" 
                strokeWidth="2"
              />
              <text 
                x={Math.abs(minYear) * (zoomLevel * 0.5)} 
                y="60" 
                fill="var(--timeline-green)" 
                fontSize="14" 
                fontWeight="bold"
                textAnchor="middle"
              >
                公元0年
              </text>
            </g>
          )}
          
          {/* 历史事件标记 */}
          {events.map(event => {
            const pos = calculateEventPosition(event.year);
            const adjustedX = pos.x - minYear * (zoomLevel * 0.5);
            
            return (
              <g 
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className="event-marker"
                style={{ cursor: 'pointer' }}
              >
                <motion.circle
                  cx={adjustedX}
                  cy="100"
                  r="8"
                  fill={event.color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.text
                  x={adjustedX}
                  y="120"
                  fill="var(--timeline-green)"
                  fontSize="12"
                  textAnchor="middle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ fill: '#ffffff' }}
                >
                  {event.title}
                </motion.text>
                
                {/* 连接线到事件描述 */}
                <line
                  x1={adjustedX}
                  y1="108"
                  x2={adjustedX}
                  y2="150"
                  stroke={event.color}
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              </g>
            );
          })}
        </svg>
        
        {/* 3D效果层 */}
        <div className="time-axis-3d-effect">
          {events.map((event, index) => {
            const pos = calculateEventPosition(event.year);
            const adjustedX = pos.x - minYear * (zoomLevel * 0.5);
            
            return (
              <div
                key={`effect-${event.id}`}
                className="event-particle"
                style={{
                  left: `${adjustedX}px`,
                  top: '100px',
                  backgroundColor: event.color,
                  animationDelay: `${index * 0.2}s`
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeAxis;