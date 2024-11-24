import React from 'react'
import { TabsProps } from '../types/props'
import { AnimatePresence, motion } from 'framer-motion'

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab }) => {
  return (
    <div>
      <div className="flex flex-wrap justify-around border-b w-full overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-3 text-sm sm:text-base sm:px-4 whitespace-nowrap ${
              activeTab === index
                ? 'border-b-2 border-primary text-primary'
                : 'text-text-secondary'
            } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={tab.onClick}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {tabs[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
