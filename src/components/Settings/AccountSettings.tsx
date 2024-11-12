import React, { useState, useEffect } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { TextArea } from '../TextArea'
import { Badge } from '../Badge'
import { Pencil, Save, Lock } from 'lucide-react'
import userService from '../../services/userService'

type EditableFields = 'username' | 'bio' | 'fullname' | 'email'

/**
 * AccountSettings component to display and edit user account information.
 * @returns {JSX.Element} The rendered AccountSettings component.
 */
const AccountSettings: React.FC = () => {
  const [isEditing, setIsEditing] = useState<Record<EditableFields, boolean>>({
    username: false,
    bio: false,
    fullname: false,
    email: false,
  })
  const [userInfo, setUserInfo] = useState<Record<EditableFields, string>>({
    username: '',
    bio: '',
    fullname: '',
    email: '',
  })

  // Fetch user information when the component mounts
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await userService.getCurrentUser()
        setUserInfo({
          fullname: user.fullName,
          username: user.username,
          bio: user.biography,
          email: user.email,
        })
      } catch (error) {
        console.error('Error fetching user info:', error)
      }
    }

    fetchUserInfo()
  }, [])

  // Toggle edit mode for a specific field
  const handleEdit = (field: EditableFields) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] })
  }

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  // Save the updated user information
  const handleSave = async (field: EditableFields) => {
    try {
      await userService.updateCurrentUser({ [field]: userInfo[field] })
      setIsEditing({ ...isEditing, [field]: false })
    } catch (error) {
      console.error('Error updating user info:', error)
    }
  }

  // Render an editable field
  const renderField = (field: EditableFields, label: string) => (
    <div className="mb-6">
      <Badge text={label} color="gray" />
      <div className="mt-1 flex items-center">
        {isEditing[field] ? (
          field === 'bio' ? (
            <TextArea
              name={field}
              id={field}
              value={userInfo[field]}
              onChange={handleChange}
              className="flex-grow"
              rows={4}
            />
          ) : (
            <Input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              id={field}
              value={userInfo[field]}
              onChange={handleChange}
              className="flex-grow"
            />
          )
        ) : (
          <p className="py-2 px-3 bg-gray-100 rounded-md w-full">
            {userInfo[field]}
          </p>
        )}
        {field === 'username' || field === 'email' ? (
          <Lock className="h-4 w-4 ml-2 text-gray-500" />
        ) : (
          <Button
            onClick={() =>
              isEditing[field] ? handleSave(field) : handleEdit(field)
            }
            variant="none"
            size="sm"
            className="ml-2"
          >
            {isEditing[field] ? (
              <Save className="h-4 w-4" />
            ) : (
              <Pencil className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account Information</h2>
      {renderField('fullname', 'Full Name')}
      {renderField('username', 'Username')}
      {renderField('email', 'Email')}
      {renderField('bio', 'Biography')}
    </div>
  )
}

export default AccountSettings
