import { useState } from 'react'
import './Header.scss'

const navItems = [
    { id: 1, label: 'Главная', href: '#' },
    { id: 2, label: 'О нас', href: '#' },
    { id: 3, label: 'Профиль', href: '#' },
]

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <header className="header">
            <div className="header__container">
                <a href="#" className="header__logo">
                    Logo
                </a>

                <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
                    <ul className="header__list">
                        {navItems.map((item) => (
                            <li key={item.id} className="header__item">
                                <a href={item.href} className="header__link" onClick={closeMenu}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button
                    className={`header__burger ${isMenuOpen ? 'header__burger--open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Меню"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    )
}
