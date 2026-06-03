"use client";

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <label className="theme-switch" aria-label="Toggle theme">
            <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
            />
            <div className="theme-switch__container">
                <div className="theme-switch__clouds" />
                <div className="theme-switch__stars-container" />
                <div className="theme-switch__circle-container">
                    <div className="theme-switch__sun-moon-container">
                        <div className="theme-switch__moon">
                            <div className="theme-switch__spot" />
                            <div className="theme-switch__spot" />
                            <div className="theme-switch__spot" />
                        </div>
                    </div>
                </div>
            </div>
        </label>
    );
}
