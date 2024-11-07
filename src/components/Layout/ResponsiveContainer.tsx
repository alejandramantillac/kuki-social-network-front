import React, { useState, useEffect, useRef, JSX } from 'react'
import { Tooltip } from '../Tooltip'
import { MoreHorizontalIcon } from 'lucide-react'
import { Button } from '../Button'

interface ResponsiveContainerProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  children: React.ReactNode[]
}

/**
 * ResponsiveContainer component to display children with a "More options" button if needed.
 * @param {ResponsiveContainerProps} props - The properties for the ResponsiveContainer component.
 * @returns {JSX.Element} The rendered ResponsiveContainer component.
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  className,
  orientation = 'horizontal',
  children,
}): JSX.Element => {
  const [visibleChildren, setVisibleChildren] = useState<React.ReactNode[]>([])
  const [moreChildren, setMoreChildren] = useState<React.ReactNode[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateChildren = () => {
      if (containerRef.current) {
        const containerSize =
          orientation === 'horizontal'
            ? containerRef.current.offsetWidth
            : containerRef.current.offsetHeight
        let totalSize = 0
        const visible: React.ReactNode[] = []
        const more: React.ReactNode[] = []

        React.Children.forEach(children, (child, index) => {
          const childSize =
            orientation === 'horizontal'
              ? (containerRef.current?.children[index] as HTMLElement)
                  ?.offsetWidth || 0
              : (containerRef.current?.children[index] as HTMLElement)
                  ?.offsetHeight || 0

          if (totalSize + childSize < containerSize - 70) {
            visible.push(child)
            totalSize += childSize
          } else {
            more.push(child)
          }
        })

        setVisibleChildren(visible)
        setMoreChildren(more)
      }
    }

    updateChildren()
    window.addEventListener('resize', updateChildren)
    return () => {
      window.removeEventListener('resize', updateChildren)
    }
  }, [children, orientation])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <div
      ref={containerRef}
      className={`h-full w-full flex p-2 ${orientation === 'horizontal' ? 'flex-row justify-around' : 'flex-col justify-around'} items-center ${className}`}
    >
      {visibleChildren}

      {moreChildren.length > 0 && (
        <Tooltip text="More options">
          <Button
            variant="none"
            size="sm"
            className="text-border-primary p-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MoreHorizontalIcon className="h-6 w-6" />
          </Button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className={`absolute bg-bg-primary shadow-lg rounded-md mt-2 ${orientation === 'horizontal' ? 'left-0' : 'top-0'}`}
            >
              {moreChildren}
            </div>
          )}
        </Tooltip>
      )}
    </div>
  )
}

export default ResponsiveContainer
