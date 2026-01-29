import React, { useState, useId } from 'react';
import './CloudItem.scss';

const CloudItem = ({
  path,
  color,
  label,
  style,
  onClick,
  className,
  viewBox = "0 0 350 250"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const uniqueId = useId();
  const filterId = `cloud-filter-${uniqueId}`;
  const gradientId = `cloud-gradient-${uniqueId}`;


  return (
    <button
      type="button"
      style={style}
      className={`cloud-btn ${isHovered ? 'is-hovered' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={onClick}
      aria-label={`播放情緒音檔：${label}`}
    >
      <div className="cloud-content-wrapper">
        <svg viewBox={viewBox} className="cloud-svg" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence type="fractalNoise" baseFrequency="0.2" numOctaves="3" seed="6558" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" result="displacedShape" />
              <feGaussianBlur in="displacedShape" stdDeviation="2" result="softenedCloudBody" />
              <feGaussianBlur in="displacedShape" stdDeviation="4" result="preShadowBlur" />
              <feColorMatrix in="preShadowBlur" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 50 0" result="solidSilhouette" />
              <feGaussianBlur in="solidSilhouette" stdDeviation={isHovered ? 15 : 6} result="blurredShadow" />
              <feOffset in="blurredShadow" dx="0" dy={isHovered ? 15 : 2} result="offsetShadow" />
              <feFlood floodColor="#6C96A3" floodOpacity={isHovered ? 0.3 : 0} result="shadowColor" />
              <feComposite in="shadowColor" in2="offsetShadow" operator="in" result="finalShadow" />
              <feMerge>
                <feMergeNode in="finalShadow" />
                <feMergeNode in="softenedCloudBody" />
              </feMerge>
            </filter>
            {/* 雲朵透明度控制 */}
            <linearGradient id={gradientId} x1="0%" y1="55%"
              x2="0%" y2="100%"
              gradientUnits="objectBoundingBox">
              <stop offset="0" stopColor={color} stopOpacity="0.95" />
              <stop
                offset="1"
                stopColor={color}
                stopOpacity={isHovered ? 0.1 : 0.1}
                style={{ transition: 'stop-opacity 0.3s ease' }}
              />
            </linearGradient>
          </defs>
          <path d={path} fill={`url(#${gradientId})`} filter={`url(#${filterId})`} className="cloud-path" />
        </svg>
        <span className="cloud-label fs-4 fw-bold">{label}</span>
      </div>
      <div className={`cloud-action text-primary-05 ${isHovered ? 'visible' : ''}`}>
        <span className='me-2'>
          ▶
        </span>
        試聽更多
      </div>
    </button>
  );
};

export default CloudItem;