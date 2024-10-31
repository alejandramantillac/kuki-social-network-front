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

export default function Root() {
  const [isOpen, setIsOpen] = useState(false)

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
      </Navbar>
      <div className="p-4">
        <h1>Root</h1>
        <Button variant="primary" size="md" onClick={() => setIsOpen(true)}>
          Open Modal
        </Button>
        <Input placeholder="Type something..." className="mt-4" />
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
