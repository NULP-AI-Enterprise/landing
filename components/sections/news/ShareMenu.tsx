"use client";

import { useState, useEffect, useRef } from 'react';

interface ShareMenuProps {
    title: string;
}

export default function ShareMenu({ title }: ShareMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);

    // Отримуємо поточний URL тільки на клієнті
    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    // Закриваємо меню при кліку поза ним
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Повертаємо іконку назад через 2 сек
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'Telegram',
            icon: 'send',
            color: 'text-blue-400 group-hover:text-blue-300',
            url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
        },
        {
            name: 'Twitter / X',
            icon: 'tag',
            color: 'text-t-tertiary group-hover:text-t-primary',
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        },
        {
            name: 'Facebook',
            icon: 'public',
            color: 'text-blue-600 group-hover:text-blue-500',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        },
        {
            name: 'LinkedIn',
            icon: 'work',
            color: 'text-blue-500 group-hover:text-blue-400',
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`
        }
    ];

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            {/* Анімоване випадаюче меню */}
            <div
                className={`absolute bottom-full right-0 mb-4 w-64 p-2 bg-surface-card/95 backdrop-blur-xl border border-glass-hover rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right ${
                    isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                }`}
            >
                <div className="p-2 pb-3 mb-2 border-b border-glass">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-t-muted ml-2">Поширити</p>
                </div>

                {/* Кнопка копіювання */}
                <button
                    onClick={handleCopy}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-glass transition-all text-t-primary text-sm font-medium group"
                >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${copied ? 'bg-green-500/20 text-green-400' : 'bg-glass text-t-secondary group-hover:text-t-primary'}`}>
                        <span className="material-symbols-outlined text-[18px]">
                            {copied ? 'check' : 'content_copy'}
                        </span>
                    </div>
                    {copied ? 'Посилання скопійовано!' : 'Скопіювати посилання'}
                </button>

                {/* Соцмережі */}
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-glass transition-all text-t-primary text-sm font-medium group"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="w-8 h-8 rounded-lg bg-glass flex items-center justify-center">
                            <span className={`material-symbols-outlined text-[18px] transition-colors ${link.color}`}>
                                {link.icon}
                            </span>
                        </div>
                        {link.name}
                    </a>
                ))}
            </div>

            {/* Головна кнопка (Тригер) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'bg-glass hover:bg-primary/80 hover:text-white text-t-secondary'
                }`}
                aria-label="Поширити новину"
            >
                <span className="material-symbols-outlined text-xl">
                    {isOpen ? 'close' : 'share'}
                </span>
            </button>
        </div>
    );
}