import React, { useState } from 'react'
import { Badge } from '../Badge'
import { RadioGroup } from '@headlessui/react'
import { Sun, Moon } from 'lucide-react'

/**
 * DisplaySettings component to manage and display theme settings.
 * @returns {JSX.Element} The rendered DisplaySettings component.
 */
const DisplaySettings: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  /**
   * Handles the theme change event.
   * @param {string} value - The selected theme value.
   */
  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Display Settings</h2>
      <div className="mb-6">
        <Badge
          text="Display Mode"
          color="gray"
          className="text-sm font-medium text-gray-700 mb-2 block"
        />
        <RadioGroup
          value={theme}
          onChange={handleThemeChange}
          className="flex flex-col space-y-1"
        >
          <RadioGroup.Option
            value="light"
            as="div"
            className="flex items-center space-x-2"
          >
            {({ checked }) => (
              <>
                <div
                  className={`w-4 h-4 rounded-full ${checked ? 'bg-primary' : 'bg-gray-300'}`}
                />
                <Badge
                  text="Light Mode"
                  color="gray"
                  className="flex items-center cursor-pointer"
                />
                <Sun className="h-4 w-4 mr-2" />
                Light Mode
              </>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option
            value="dark"
            as="div"
            className="flex items-center space-x-2"
          >
            {({ checked }) => (
              <>
                <div
                  className={`w-4 h-4 rounded-full ${checked ? 'bg-primary' : 'bg-gray-300'}`}
                />
                <Badge
                  text="Dark Mode"
                  color="gray"
                  className="flex items-center cursor-pointer"
                />
                <Moon className="h-4 w-4 mr-2" />
                Dark Mode
              </>
            )}
          </RadioGroup.Option>
        </RadioGroup>
      </div>
    </div>
  )
}

export default DisplaySettings
