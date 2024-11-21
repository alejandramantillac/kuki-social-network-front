import React, { useContext, useState, useEffect } from 'react'
import { Badge } from '../Badge'
import { RadioGroup } from '@headlessui/react'
import { Sun, Moon } from 'lucide-react'
import { Button } from '../Button'
import { ThemeContext } from '../../context/ThemeContext'

/**
 * DisplaySettings component to manage and display theme settings.
 * @returns {JSX.Element} The rendered DisplaySettings component.
 */
const DisplaySettings: React.FC = () => {
  const themeContext = useContext(ThemeContext)
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (themeContext) {
      setSelectedTheme(themeContext.theme)
    }
  }, [themeContext])

  if (!themeContext) {
    return null // or handle the error appropriately
  }

  const { setTheme } = themeContext

  /**
   * Handles the theme change event.
   * @param {string} value - The selected theme value.
   */
  const handleThemeChange = (value: string) => {
    setSelectedTheme(value as 'light' | 'dark')
  }

  /**
   * Handles the save button click event.
   */
  const handleSave = () => {
    setTheme(selectedTheme)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-text-tertiary">
        Display Settings
      </h2>
      <div className="mb-6">
        <Badge
          text="Display Mode"
          color="gray"
          className="text-sm font-medium text-text-secondary mb-2 block"
        />
        <RadioGroup
          value={selectedTheme}
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
                <Sun className="h-4 w-4 mr-2 text-text-secondary" />
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
                <Moon className="h-4 w-4 mr-2 text-text-secondary" />
              </>
            )}
          </RadioGroup.Option>
        </RadioGroup>
      </div>
      <Button onClick={handleSave} variant="primary">
        Save
      </Button>
    </div>
  )
}

export default DisplaySettings
