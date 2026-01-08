import React from 'react';
import { motion } from 'framer-motion';
import './EventDetail.css';

const EventDetail = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <motion.div
      className="event-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="event-detail"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
      >
        <div className="event-header">
          <div 
            className="event-category"
            style={{ backgroundColor: event.color }}
          >
            {event.category}
          </div>
          <h2>{event.title}</h2>
          <div className="event-year">
            {event.year >= 0 ? `公元 ${event.year} 年` : `公元前 ${Math.abs(event.year)} 年`}
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="event-content">
          <p>{event.description}</p>
          
          <div className="event-context">
            <h4>历史背景</h4>
            <p>
              {event.year < -2000 && "这一时期属于古代文明发展阶段，人类社会正从原始社会向奴隶社会过渡。"}
              {event.year >= -2000 && event.year < 0 && "这一时期属于古典时代，各大文明蓬勃发展，哲学和科学思想兴起。"}
              {event.year >= 0 && event.year < 1000 && "这一时期属于中世纪，宗教力量强大，封建制度盛行。"}
              {event.year >= 1000 && event.year < 1800 && "这一时期属于近代，文艺复兴、宗教改革和启蒙运动相继发生。"}
              {event.year >= 1800 && event.year < 2000 && "这一时期属于现代，工业革命、两次世界大战和科技飞速发展。"}
              {event.year >= 2000 && "这一时期属于当代，信息技术革命和全球化进程加快。"}
            </p>
          </div>
          
          <div className="event-impact">
            <h4>历史影响</h4>
            <p>
              这一事件对当时的社会产生了深远影响，并对后世的发展奠定了重要基础。
              它改变了人们的生活方式、思维模式或社会组织形式，成为历史进程中的重要节点。
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventDetail;