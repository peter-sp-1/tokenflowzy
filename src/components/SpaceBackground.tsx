import React from 'react';
import { motion } from 'framer-motion';

interface SpaceBackgroundProps {
  color?: string;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ color = '#8B5CF6' }) => {
  const shapes = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    points: generatePolygonPoints(i),
    initialPosition: {
      x: Math.random() * 80 + 10, // Keep within 10-90% of the screen width
      y: Math.random() * 80 + 10, // Keep within 10-90% of the screen height
      rotate: Math.random() * 360,
    },
  }));

  function generatePolygonPoints(index: number) {
    // Different polygon shapes
    const shapes = [
      '0,0 30,0 15,30', // triangle
      '0,0 30,0 30,30 0,30', // square
      '0,15 15,0 30,15 15,30', // diamond
      '15,0 30,15 15,30 0,15', // octagon-like
      '0,0 30,0 25,30 5,30', // trapezoid
      '0,15 15,0 30,15 20,30 10,30' // pentagon-like
    ];
    return shapes[index % shapes.length];
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.svg
          key={shape.id}
          className="absolute"
          width="90"
          height="90"
          viewBox="0 0 30 30"
          style={{
            left: `${shape.initialPosition.x}%`,
            top: `${shape.initialPosition.y}%`,
          }}
          initial={{
            opacity: 0.2,
            rotate: shape.initialPosition.rotate,
            scale: 0.8,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            x: [-100, 100],
            y: [-80, 80],
            rotate: [shape.initialPosition.rotate, shape.initialPosition.rotate + 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.5, 1],
          }}
        >
          <motion.polygon
            points={shape.points}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            style={{
              filter: 'blur(2px) drop-shadow(0 0 8px ' + color + ')',
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      ))}
    </div>
  );
};

export default SpaceBackground;
