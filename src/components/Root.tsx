import { useEffect, useState } from 'react'
import { Navbar } from './Navbar/Navbar'
import { MainLayout } from './Layout/MainLayout'
import { Outlet } from 'react-router-dom'

export default function Root() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  /**
   * <Footer>
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
   */

  return (
    <div className="bg-bg-secondary">
      <Navbar isMobile={isMobile} />
      <MainLayout isMobile={isMobile}>
        <Outlet />
      </MainLayout>
    </div>
  )
}
