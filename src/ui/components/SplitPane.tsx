import React, { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

interface SplitPaneProps {
  direction: 'horizontal' | 'vertical';
  children: ReactNode;
  className?: string;
  initialSplit?: number;
  minSize?: number;
  maxSize?: number;
}

export const SplitPane: React.FC<SplitPaneProps> = ({
  direction,
  children,
  className = '',
  initialSplit = 50,
  minSize = 10,
  maxSize = 90,
}) => {
  const [split, setSplit] = useState(initialSplit);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);

  const childrenArray = React.Children.toArray(children);
  if (childrenArray.length !== 2) {
    throw new Error('SplitPane must have exactly 2 children');
  }

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerSize = direction === 'horizontal' 
      ? containerRect.width 
      : containerRect.height;
    
    const mousePosition = direction === 'horizontal'
      ? e.clientX - containerRect.left
      : e.clientY - containerRect.top;

    const newSplit = (mousePosition / containerSize) * 100;
    const clampedSplit = Math.max(minSize, Math.min(maxSize, newSplit));
    
    setSplit(clampedSplit);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, direction]);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    height: '100%',
    width: '100%',
  };

  const firstPaneStyle: React.CSSProperties = {
    [direction === 'horizontal' ? 'width' : 'height']: `${split}%`,
    [direction === 'horizontal' ? 'height' : 'width']: '100%',
    overflow: 'hidden',
    position: 'relative',
  };

  const secondPaneStyle: React.CSSProperties = {
    [direction === 'horizontal' ? 'width' : 'height']: `${100 - split}%`,
    [direction === 'horizontal' ? 'height' : 'width']: '100%',
    overflow: 'hidden',
    position: 'relative',
  };

  const separatorStyle: React.CSSProperties = {
    backgroundColor: isDragging ? 'hsl(var(--p))' : 'hsl(var(--b3))',
    cursor: direction === 'horizontal' ? 'col-resize' : 'row-resize',
    [direction === 'horizontal' ? 'width' : 'height']: '6px',
    [direction === 'horizontal' ? 'height' : 'width']: '100%',
    position: 'relative',
    transition: 'all 0.2s ease',
    zIndex: 10,
    borderRadius: '3px',
    opacity: isDragging ? 1 : 0.5,
  };

  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: direction === 'horizontal' ? '2px' : '100%',
    height: direction === 'horizontal' ? '100%' : '2px',
    backgroundColor: isDragging ? 'hsl(var(--p))' : 'transparent',
    borderRadius: '1px',
    transition: 'all 0.2s ease',
  };

  return (
    <div
      ref={containerRef}
      className={`${className} ${isDragging ? 'select-none' : ''} transition-all duration-300`}
      style={containerStyle}
    >
      <div style={firstPaneStyle}>
        {childrenArray[0]}
      </div>
      
      <div
        ref={separatorRef}
        style={separatorStyle}
        onMouseDown={handleMouseDown}
        className={`hover:bg-[hsl(var(--p))] hover:opacity-100 hover:shadow-[0_0_10px_rgba(99,102,241,0.3)]`}
      >
        <div style={handleStyle} className="opacity-0 group-hover:opacity-100" />
      </div>
      
      <div style={secondPaneStyle}>
        {childrenArray[1]}
      </div>
    </div>
  );
};