
import React from 'react';
import { motion } from 'framer-motion';

const ConstructionScene: React.FC = () => {
  return (
    <div className="w-full h-[300px] overflow-hidden relative">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 p-4">
        {/* Construction elements with scroll animations */}
        <motion.div 
          className="bg-construction-blue rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        />
        
        <motion.div 
          className="bg-construction-orange rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        />
        
        <motion.div 
          className="bg-construction-blue rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        />
        
        {/* Price tag element */}
        <motion.div 
          className="col-span-3 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-3 bg-construction-orange/20 rounded-full blur-lg"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <div className="bg-white shadow-lg rounded-full h-24 w-24 flex items-center justify-center text-construction-blue text-xl font-bold z-10 relative">
              <span className="text-sm absolute top-4">from</span>
              <span>$99</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-slate-200 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        />
        
        <motion.div 
          className="bg-slate-300 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        />
        
        <motion.div 
          className="bg-slate-200 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
        />
      </div>
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default ConstructionScene;
