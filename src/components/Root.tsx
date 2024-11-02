import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from './Button'
import { Input } from './Input'
import { Modal } from './Modal/Modal'
import { ModalBody } from './Modal/ModalBody'
import { ModalFooter } from './Modal/ModalFooter'
import { ModalHeader } from './Modal/ModalHeader'
import { Navbar } from './Navbar/Navbar'
import { NavbarBrand } from './Navbar/NavbarBrand'
import { NavbarDropdown } from './Navbar/NavbarDropdown'
import { NavbarItem } from './Navbar/NavbarItem'
import { NavbarMenu } from './Navbar/NavbarMenu'
import { Footer } from './Footer/Footer'
import { FooterCopyright } from './Footer/FooterCopyright'
import { FooterLinks } from './Footer/FooterLinks'
import { FooterSocial } from './Footer/FooterSocial'
import { Avatar } from './Avatar'
import { Card } from './Card'
import { Dropdown } from './Dropdown'
import { Alert } from './Alert'
import { Badge } from './Badge'
import { Tooltip } from './Tooltip'
import { Spinner } from './Spinner'
import { Tabs } from './Tabs'

export default function Root() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Simulate loading
  setTimeout(() => setLoading(false), 2000)

  const tabs = [
    { label: 'Tab 1', content: <div>Content for Tab 1</div> },
    { label: 'Tab 2', content: <div>Content for Tab 2</div> },
    { label: 'Tab 3', content: <div>Content for Tab 3</div> },
  ]

  return (
    <div>
      <Navbar>
        <NavbarBrand title="MyApp" />
        <NavbarMenu>
          <NavbarItem href="/" active>
            Home
          </NavbarItem>
          <NavbarItem href="/about">About</NavbarItem>
          <NavbarDropdown title="More">
            <NavbarItem href="/settings">Settings</NavbarItem>
            <NavbarItem href="/profile">Profile</NavbarItem>
          </NavbarDropdown>
        </NavbarMenu>
        <Avatar
          src="https://example.com/avatar.jpg"
          alt="User Avatar"
          size="md"
        />
      </Navbar>
      <div className="p-4">
        <h1>Root</h1>
        <Alert message="This is an info alert" type="info" />
        <Badge text="New" color="gray" />
        <Tooltip text="Click to open the modal">
          <Button variant="primary" size="md" onClick={() => setIsOpen(true)}>
            Open Modal
          </Button>
        </Tooltip>
        <Input placeholder="Type something..." className="mt-4" />
        <Tabs tabs={tabs} />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="md" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <Card title="Card 1" description="Description for card 1" />
            <Card title="Card 2" description="Description for card 2" />
            <Card title="Card 3" description="Description for card 3" />
          </div>
        )}
        <Outlet />
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader title="Modal Title" onClose={() => setIsOpen(false)} />
          <ModalBody>
            <p>This is the modal body content.</p>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <Dropdown title="Options">
          <NavbarItem href="/option1">Option 1</NavbarItem>
          <NavbarItem href="/option2">Option 2</NavbarItem>
          <NavbarItem href="/option3">Option 3</NavbarItem>
        </Dropdown>
      </div>
      <Footer>
        <FooterLinks
          title="Resources"
          links={[
            { name: 'Documentation', href: '#' },
            { name: 'Tutorials', href: '#' },
          ]}
        />
        <FooterSocial />
        <FooterCopyright companyName="Kuki" />
      </Footer>
    </div>
  )
}
