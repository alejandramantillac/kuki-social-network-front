import React, { useState } from 'react'
import { TabsProps } from '../types/types'

/**
 * Tabs component to display a set of tabs with their respective content.
 * @param {TabsProps} props - The properties for the Tabs component.
 * @param {Array<{label: string, content: React.ReactNode}>} props.tabs - The array of tabs, each containing a label and content.
 * @returns {JSX.Element} The rendered Tabs component.
 */
export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div>
      <div className="flex space-x-4 border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 ${activeTab === index ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  )
}
