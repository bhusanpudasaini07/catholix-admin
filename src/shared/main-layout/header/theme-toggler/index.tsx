
import { useTheme } from 'next-themes'
import { Toggle } from "@/shared/components/ui/toggle"
import { SunIcon, MoonIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme()

    const [isClient, setIsClient] = useState(false)

    const isDark = theme === 'dark'

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark')
    }

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null

    return (
        <Toggle pressed={isDark} onPressedChange={toggleTheme}>
            {isDark ? <SunIcon /> : <MoonIcon />}
        </Toggle>
    )
}

export default ThemeToggler