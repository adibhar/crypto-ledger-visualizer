import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBlockchain, reset } from '../api/blockchain';
import '../pagestyles/visualizer.css';

export function Visualizer() {
  const [expanded, setExpanded] = useState(false);
  const [blockData, setBlockData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);


  const fetchData = async () => {
    try {
      const data = await getBlockchain();
      setBlockData(data);
    } catch (err) {
      console.error('Error getting blockchain:', err);
      setBlockData([]);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const resetChain = async () => {
    try {
      await reset();
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const closeZoom = () => setSelectedIndex(null);

  return (

    <div>
      <div
        className="visualizer-outer"
        onDoubleClick={() => {
          if (selectedIndex === null) {
            setExpanded(!expanded);
          }
        }}
      >
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
            {blockData.map((block, index) => (
              <motion.div
                className="block-box"
                key={block.id}
                onClick={() => setSelectedIndex(index)}
                layout="position"
                transition={{ duration: 0.4 }}
              >
                <div><strong>Block #{block.index}</strong></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              className="zoom-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeZoom}
            >
              <motion.div
                className="zoom-content"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Block #{blockData[selectedIndex]?.index}</h2>
                <p><strong>Hash:</strong> {blockData[selectedIndex]?.hash}</p>
                <p><strong>Previous:</strong> {blockData[selectedIndex]?.prev_hash}</p>
                {/* <p><strong>Nonce:</strong> {blockData[selectedIndex]?.nonce}</p> */}
                <p><strong>Transactions:</strong> {blockData[selectedIndex]?.Transactions?.length ?? 0}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <button
                    onClick={() => setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))}
                    disabled={selectedIndex === 0}
                  >
                    Prev
                  </button>

                  <button
                    onClick={() => setSelectedIndex((prev) => (prev < blockData.length - 1 ? prev + 1 : prev))}
                    disabled={selectedIndex === blockData.length - 1}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>



      </div>

      <div className="reset-button-container">
          <button onClick={resetChain} className="reset-button">
            RESET
          </button>
        </div>
    </div>




  );
}
