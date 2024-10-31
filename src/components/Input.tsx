import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({ label, icon, className, ...props }) => {
  return (
                <div className="space-y-2">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 ${
            icon ? 'pl-10' : ''
          } ${className}`}
          {...props}
        />
      </div>
    </div>
  )
}