import React from 'react'
import { Button } from '../Button'
import { User, Monitor } from 'lucide-react'

type SettingsTabsProps = {
  activeTab: 'account' | 'display'
  setActiveTab: (tab: 'account' | 'display') => void
}

/**
 * SettingsTabs component to display tabs for switching between account and display settings.
 * @param {SettingsTabsProps} props - The properties for the SettingsTabs component.
 * @param {'account' | 'display'} props.activeTab - The currently active tab.
 * @param {(tab: 'account' | 'display') => void} props.setActiveTab - Function to set the active tab.
 * @returns {JSX.Element} The rendered SettingsTabs component.
 */
const SettingsTabs: React.FC<SettingsTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full max-w-xs">
      <Button
        variant={activeTab === 'account' ? 'primary' : 'outline'}
        className={`w-full flex items-center justify-start px-4 py-3 rounded-lg ${
          activeTab === 'account'
            ? 'bg-orange-500 text-white'
            : 'border border-orange-500 text-orange-500'
        }`}
        onClick={() => setActiveTab('account')}
      >
        <User className="mr-2 h-5 w-5" />
        Account
      </Button>
      <Button
        variant={activeTab === 'display' ? 'primary' : 'outline'}
        className={`w-full flex items-center justify-start px-4 py-3 rounded-lg ${
          activeTab === 'display'
            ? 'bg-orange-500 text-white'
            : 'border border-orange-500 text-orange-500'
        }`}
        onClick={() => setActiveTab('display')}
      >
        <Monitor className="mr-2 h-5 w-5" />
        Display
      </Button>
    </div>
  )
}

export default SettingsTabs
