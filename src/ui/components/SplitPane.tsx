import React, { useState, useRef, useEffect } from 'react';

interface SplitPaneProps {
  direction: 'horizontal' | 'vertical';
  children: React.ReactNode[];
  className?: string;
  defaultSizes?: number[];
  minSizes?: number[];
}

export const SplitPane: React.FC<SplitPaneProps> = ({
  direction,
  children,
  className = '',
  defaultSizes,
  minSizes = [100, 100]
}) => {
  const [sizes, setSizes] = useState<number[]>(defaultSizes || [50, 50]);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerSize = direction === 'horizontal' ? containerRect.width : containerRect.height;
    const position = direction === 'horizontal' ? e.clientX - containerRect.left : e.clientY - containerRect.top;
    
    const firstPaneSize = Math.max(minSizes[0], Math.min(position, containerSize - minSizes[1]));
    const secondPaneSize = containerSize - firstPaneSize;
    
    const firstPanePercent = (firstPaneSize / containerSize) * 100;
    const secondPanePercent = (secondPaneSize / containerSize) * 100;
    
    setSizes([firstPanePercent, secondPanePercent]);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const flexStyle = direction === 'horizontal' 
    ? { flexDirection: 'row' as const }
    : { flexDirection: 'column' as const };

  return (
    <div
      ref={containerRef}
      className={`flex ${className}`}
      style={flexStyle}
    >
      <div style={{ flex: `${sizes[0]} 1 0` }}>
        {children[0]}
      </div>
      
      <div
        className={`
          ${direction === 'horizontal' 
            ? 'w-1 bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 cursor-col-resize' 
            : 'h-1 bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 cursor-row-resize'
          }
          ${isDragging ? 'bg-blue-500' : ''}
          transition-colors duration-200
        `}
        onMouseDown={handleMouseDown}
      />
      
      <div style={{ flex: `${sizes[1]} 1 0` }}>
        {children[1]}
      </div>
    </div>
  );
};