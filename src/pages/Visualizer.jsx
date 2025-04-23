import { useState } from 'react';
import { motion } from 'framer-motion';
import '../pagestyles/visualizer.css';

export function Visualizer() {
  const [expanded, setExpanded] = useState(false);
  const data = ["Block 1", "Block 2", "Block 3", "Block 4", "Block 5", "Block 6", "Block 7", "Block 8",
    "Block 2", "Block 3", "Block 4", "Block 5", "Block 6", "Block 7", "Block 8"];

  return (
    <div className="visualizer-outer" onDoubleClick={() => setExpanded(!expanded)}>
      <motion.div
        className={`visualizer-inner ${expanded ? 'expanded' : 'collapsed'}`}
        layout
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={`blocks-wrapper ${expanded ? 'grid-view' : 'scroll-view'}`}
          layoutRoot
          transition={{ duration: 0.5 }}
        >
          {data.map((item, index) => (
            <motion.div
              className="block-box"
              key={index}
              layout="position"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
