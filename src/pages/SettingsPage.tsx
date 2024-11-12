import React, { useState } from 'react'
import SettingsTabs from '../components/Settings/SettingsTabs'
import AccountSettings from '../components/Settings/AccountSettings'
import DisplaySettings from '../components/Settings/DisplaySettings'

/**
 * SettingsPage component to display the settings page with tabs for account and display settings.
 * @returns {JSX.Element} The rendered SettingsPage component.
 */
const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'display'>('account')

  return (
    <div className="min-h-screen bg-bg-secondary p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-bg-primary rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/4 p-4 bg-bg-secondary">
            <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="w-full sm:w-3/4 p-4 sm:p-6 lg:p-8">
            {activeTab === 'account' && <AccountSettings />}
            {activeTab === 'display' && <DisplaySettings />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
