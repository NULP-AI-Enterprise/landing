"use client";

import { useState, useEffect } from 'react';

const API_BASE = '/department-web-api';
type TabType = 'teachers' | 'universities' | 'projects' | 'news';

export default function AdminDashboard({ initialTeachers, initialUnis, initialProjects, initialNews }: any) {

    const [isAuthorized, setIsAuthorized] = useState(false);

    const [activeTab, setActiveTab] = useState<TabType>('teachers');

    const [teachers, setTeachers] = useState(initialTeachers || []);
    const [universities, setUniversities] = useState(initialUnis || []);
    const [projects, setProjects] = useState(initialProjects || []);
    const [news, setNews] = useState(initialNews || []);

    const [isLoading, setIsLoading] = useState(false);

    const [modal, setModal] = useState<{open: boolean, type: TabType, data: any, file: File | null}>({
        open: false, type: 'teachers', data: {}, file: null
    });


    const handleAuthError = (res: Response) => {
        const isHtml = res.headers.get('content-type')?.includes('text/html');
        // Редіректимо на логін тільки якщо 401/403, редірект або HTML-відповідь (зазвичай сторінка логіну)
        if (res.status === 401 || res.status === 403 || res.redirected || (isHtml && res.url.includes('/login'))) {
            window.location.href = 'https://app.thesis-i.com/department-web-api/login';
            return true;
        }
        return false;
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Стукаємо у ваш auth-controller
                const res = await fetch(`${API_BASE}/admin/options`, {
                    method: 'OPTIONS',
                    headers: {
                        // Цей заголовок каже Spring Security не показувати сіре вікно браузера
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    credentials: 'include'
                });

                // Якщо бекенд повернув помилку (401/403) або зробив редірект на сторінку логіну
                if (!res.ok || res.redirected || res.url.includes('/login')) {
                    const LOGIN_URL = process.env.NODE_ENV === 'development'
                        ? 'https://app.thesis-i.com/department-web-api/login' // Локально через наш налаштований проксі
                        : 'https://app.thesis-i.com/department-web-api/login';

                    window.location.href = LOGIN_URL;
                    return;
                }

                // Якщо код тут, значить бекенд відповів 200 OK!
                setIsAuthorized(true);
            } catch (err) {
                // Якщо сервер впав або немає інтернету - безпечно кидаємо на логін
                const LOGIN_URL = process.env.NODE_ENV === 'development'
                    ? 'https://app.thesis-i.com/department-web-api/login'
                    : 'https://app.thesis-i.com/department-web-api/login';
                window.location.href = LOGIN_URL;
            }
        };

        checkAuth();
    }, []);


    const refreshData = async () => {
        try {
            const res = await fetch(`${API_BASE}/${activeTab}/v1?pageNumber=1&pageSize=1000`, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include'
            });

            if (handleAuthError(res)) return; // Якщо під час оновлення впала сесія - на логін
            if (!res.ok) {
                console.error(`Fetch failed with status: ${res.status}`);
                return;
            }

            const data = await res.json();
            if (activeTab === 'teachers') setTeachers(data.content || []);
            else if (activeTab === 'universities') setUniversities(data.content || []);
            else if (activeTab === 'projects') setProjects(data.content || []);
            else if (activeTab === 'news') setNews(data.content || []);
        } catch (e) { console.error("Refresh failed", e); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Видалити цей запис?")) return;
        try {
            const res = await fetch(`${API_BASE}/${activeTab}/v1/${id}`, {
                method: 'DELETE',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                credentials: 'include'
            });

            if (handleAuthError(res)) return;

            if (res.ok) refreshData();
        } catch (e) { alert("Помилка видалення"); }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const { type, data, file } = modal;
        const method = data.id ? 'PUT' : 'POST';
        const url = data.id ? `${API_BASE}/${type}/v1/${data.id}` : `${API_BASE}/${type}/v1`;

        try {
            const formData = new FormData();

            // Створюємо копію даних для відправки
            let finalData = { ...data };

            if (file) {
                let fileKey = 'photo'; // Завжди 'photo' згідно з Swagger (але для новин - 'img')
                if (type === 'teachers') {
                    finalData.photoUrl = null;
                } else if (type === 'projects') {
                    if (finalData.hero) {
                        finalData = {
                            ...finalData,
                            hero: { ...finalData.hero, bgImage: null }
                        };
                    }
                } else if (type === 'news') {
                    finalData.img = null;
                    fileKey = 'img';
                } else if (type === 'universities') {
                    finalData.photo = null;
                }
                formData.append(fileKey, file);
            }

            formData.append('data', new Blob([JSON.stringify(finalData)], { type: 'application/json' }));

            const res = await fetch(url, {
                method,
                body: formData,
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                credentials: 'include'
            });

            if (handleAuthError(res)) return;

            if (res.ok) {
                setModal({ ...modal, open: false, file: null });
                refreshData();
            } else {
                alert(`Помилка: ${res.status}`);
            }
        } catch (e) { alert("Помилка підключення"); }
        finally { setIsLoading(false); }
    };

    // --- Helpers для масивів (теги через кому) ---
    const handleArrayChange = (field: string, value: string) => {
        const arr = value.split(',').map(s => s.trim()).filter(s => s !== '');
        setModal({ ...modal, data: { ...modal.data, [field]: arr } });
    };

    const handleAddItem = (field: string, defaultItem: any) => {
        const currentArray = modal.data[field] || [];
        setModal({ ...modal, data: { ...modal.data, [field]: [...currentArray, defaultItem] } });
    };

    const handleUpdateItem = (field: string, index: number, key: string, value: any) => {
        const currentArray = [...(modal.data[field] || [])];
        currentArray[index] = { ...currentArray[index], [key]: value };
        setModal({ ...modal, data: { ...modal.data, [field]: currentArray } });
    };

    const handleRemoveItem = (field: string, index: number) => {
        const currentArray = [...(modal.data[field] || [])];
        currentArray.splice(index, 1);
        setModal({ ...modal, data: { ...modal.data, [field]: currentArray } });
    };

    if (!isAuthorized) {
        return (
            <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-500 min-h-screen bg-surface">
                <span className="material-symbols-outlined animate-spin text-primary text-5xl mb-4">progress_activity</span>
                <p className="text-t-secondary font-bold uppercase tracking-widest text-xs">Перевірка доступу...</p>
            </div>
        );
    }

    const currentList = activeTab === 'teachers' ? teachers :
        activeTab === 'universities' ? universities :
            activeTab === 'projects' ? projects : news;

    return (
        <div className="animate-in fade-in duration-700">
            {/* ТАБИ */}
            <div className="flex flex-wrap gap-4 mb-10 border-b border-glass pb-4">
                {[
                    { id: 'teachers', label: 'Викладачі' },
                    { id: 'universities', label: 'Партнери' },
                    { id: 'projects', label: 'Проєкти' },
                    { id: 'news', label: 'Новини' }
                ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)} className={`px-6 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-t-muted hover:text-t-primary'}`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* КНОПКА ДОДАТИ */}
            <button onClick={() => {
                let defaultData: any = { language: 'uk' };
                if (activeTab === 'teachers') defaultData = { language: 'uk', links: {}, subjects: [], researchTopics: [], hobbies: [], scientificWorks: [] };
                else if (activeTab === 'projects') defaultData = { language: 'uk', slug: '', hero: { links: {} }, details: {}, features: [], team: [] };
                else if (activeTab === 'news') defaultData = { language: 'uk', createdAt: new Date().toISOString().split('T')[0] };
                setModal({ open: true, type: activeTab, data: defaultData, file: null });
            }}
                    className="mb-8 px-6 py-4 bg-[#80E9D4] text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
                <span className="material-symbols-outlined">add</span> Додати запис
            </button>

            {/* ТАБЛИЦЯ ДАНИХ */}
            <div className="bg-surface-card border border-glass rounded-[2.5rem] overflow-hidden shadow-2xl overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead className="bg-glass text-[10px] uppercase tracking-[0.2em] text-t-muted">
                    <tr>
                        <th className="p-6">Головна інформація</th>
                        <th className="p-6">Деталі</th>
                        <th className="p-4 text-center">Мова</th>
                        <th className="p-6 text-right">Дії</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                    {(currentList || []).map((item: any, idx: number) => (
                        <tr key={item.id || idx} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="p-6 font-bold text-t-primary group-hover:text-primary transition-colors">{item.fullName || item.title || item.hero?.title || 'Без назви'}</td>
                            <td className="p-6 text-t-secondary text-sm">{item.jobPosition || item.country || item.slug || item.createdAt}</td>
                            <td className="p-4 text-center"><span className="text-[10px] font-black uppercase px-2 py-1 bg-glass rounded border border-glass-hover text-primary">{item.language || 'N/A'}</span></td>
                            <td className="p-6 text-right flex justify-end gap-3">
                                <button onClick={() => setModal({ open: true, type: activeTab, data: item, file: null })} className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-t-primary transition-all"><span className="material-symbols-outlined text-sm">edit</span></button>
                                <button onClick={() => handleDelete(item.id)} className="p-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-t-primary transition-all"><span className="material-symbols-outlined text-sm">delete</span></button>
                            </td>
                        </tr>
                    ))}
                    {currentList.length === 0 && (<tr><td colSpan={4} className="p-10 text-center text-t-muted">Записів не знайдено</td></tr>)}
                    </tbody>
                </table>
            </div>

            {/* МОДАЛЬНЕ ВІКНО ФОРМИ */}
            {modal.open && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
                    <div className="bg-surface border border-glass-hover p-6 md:p-10 rounded-[3rem] w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl relative">
                        <button onClick={() => setModal({ ...modal, open: false })} className="absolute top-8 right-8 text-t-muted hover:text-t-primary transition-colors">
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>

                        <h2 className="text-3xl font-bold mb-10 tracking-tight">{modal.data.id ? 'Редагувати' : 'Додати'} запис</h2>

                        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* ================= ФОРМА: НОВИНИ ================= */}
                            {modal.type === 'news' && (
                                <>
                                    <div className="md:col-span-2 space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Заголовок</label><input required className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.title || ''} onChange={e => setModal({...modal, data: {...modal.data, title: e.target.value}})} /></div>
                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Дата (createdAt)</label><input required type="date" className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.createdAt ? modal.data.createdAt.substring(0, 10) : ''} onChange={e => setModal({...modal, data: {...modal.data, createdAt: e.target.value}})} /></div>
                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Мова</label><select className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.language || 'uk'} onChange={e => setModal({...modal, data: {...modal.data, language: e.target.value}})}><option value="uk">Українська (uk)</option><option value="en">English (en)</option></select></div>
                                    <div className="md:col-span-2 space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Короткий опис</label><textarea rows={3} className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.desc || ''} onChange={e => setModal({...modal, data: {...modal.data, desc: e.target.value}})} /></div>
                                    <div className="md:col-span-2 space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Зображення (img)</label><input type="file" accept="image/*" onChange={e => setModal({...modal, file: e.target.files?.[0] || null})} className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:brightness-110" />{modal.data.img && <p className="text-xs text-t-muted mt-2">Поточне: {modal.data.img}</p>}</div>
                                </>
                            )}

                            {/* ================= ФОРМА: ПРОЄКТИ ================= */}
                            {modal.type === 'projects' && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Slug (Унікальне посилання)</label>
                                        <input required className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.slug || ''} onChange={e => setModal({...modal, data: {...modal.data, slug: e.target.value}})} />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Мова</label>
                                        <select className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.language || 'uk'} onChange={e => setModal({...modal, data: {...modal.data, language: e.target.value}})}>
                                            <option value="uk">Українська (uk)</option>
                                            <option value="en">English (en)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Hero: Назва проєкту</label>
                                        <input required className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.hero?.title || ''} onChange={e => setModal({...modal, data: {...modal.data, hero: {...modal.data.hero, title: e.target.value}}})} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Hero: Лабораторія</label>
                                        <div className="relative">
                                            <select
                                                className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary appearance-none cursor-pointer"
                                                value={modal.data.hero?.lab || ''}
                                                onChange={e => setModal({...modal, data: {...modal.data, hero: {...modal.data.hero, lab: e.target.value}}})}
                                            >
                                                <option value="" disabled className="bg-surface-card text-t-muted">Оберіть лабораторію...</option>
                                                <option value="AI HUB" className="bg-surface-card">AI HUB</option>
                                                <option value="AI Lab" className="bg-surface-card">AI Lab</option>
                                                <option value="Robotics Lab" className="bg-surface-card">Robotics Lab</option>
                                                <option value="Data Science Lab" className="bg-surface-card">Data Science Lab</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-t-secondary">
                                                <span className="material-symbols-outlined">expand_more</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Hero: Категорія</label>
                                        <div className="relative">
                                            <select
                                                className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary appearance-none cursor-pointer"
                                                value={modal.data.hero?.category || ''}
                                                onChange={e => setModal({...modal, data: {...modal.data, hero: {...modal.data.hero, category: e.target.value}}})}
                                            >
                                                <option value="" disabled className="bg-surface-card text-t-muted">Оберіть категорію...</option>
                                                <option value="international" className="bg-surface-card">Міжнародні (international)</option>
                                                <option value="national" className="bg-surface-card">Державні (national)</option>
                                                <option value="industrial" className="bg-surface-card">Комерційні (industrial)</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-t-secondary">
                                                <span className="material-symbols-outlined">expand_more</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Hero: Опис</label>
                                        <textarea rows={2} className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.hero?.desc || ''} onChange={e => setModal({...modal, data: {...modal.data, hero: {...modal.data.hero, desc: e.target.value}}})} />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Hero: Фонове зображення (bgImage)</label>
                                        <input type="file" accept="image/*" onChange={e => setModal({...modal, file: e.target.files?.[0] || null})} className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:brightness-110" />
                                        {modal.data.hero?.bgImage && <p className="text-xs text-t-muted mt-2">Поточне: {modal.data.hero.bgImage}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Hero Link: Портал</label>
                                        <input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.hero?.links?.portal || ''} onChange={e => setModal({...modal, data: {...modal.data, hero: {...modal.data.hero, links: {...modal.data.hero.links, portal: e.target.value}}}})} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Hero Link: GitHub</label>
                                        <input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.hero?.links?.github || ''} onChange={e => setModal({...modal, data: {...modal.data, hero: {...modal.data.hero, links: {...modal.data.hero.links, github: e.target.value}}}})} />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Details: Виклик (Challenge)</label>
                                        <textarea rows={2} className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.details?.challenge || ''} onChange={e => setModal({...modal, data: {...modal.data, details: {...modal.data.details, challenge: e.target.value}}})} />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Details: Рішення (Solution)</label>
                                        <textarea rows={2} className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.details?.solution || ''} onChange={e => setModal({...modal, data: {...modal.data, details: {...modal.data.details, solution: e.target.value}}})} />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Details: Результати (Results)</label>
                                        <textarea rows={2} className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.details?.results || ''} onChange={e => setModal({...modal, data: {...modal.data, details: {...modal.data.details, results: e.target.value}}})} />
                                    </div>

                                    <div className="md:col-span-2 p-6 rounded-[2rem] bg-white/[0.02] border border-glass space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Функціонал (Features)</h3>
                                            <button type="button" onClick={() => handleAddItem('features', { title: '', desc: '' })} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-primary/20 text-primary px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined text-sm">add</span> Додати фічу</button>
                                        </div>
                                        {(modal.data.features || []).map((feature: any, idx: number) => (
                                            <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-glass-hover rounded-2xl bg-black/40 group">
                                                <button type="button" onClick={() => handleRemoveItem('features', idx)} className="absolute -top-3 -right-3 bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><span className="material-symbols-outlined text-[14px]">delete</span></button>
                                                <div className="space-y-1"><label className="text-[10px] text-t-muted uppercase">Назва (Title)</label><input className="w-full bg-glass border border-glass-hover p-3 rounded-xl outline-none text-t-primary text-sm" value={feature.title || ''} onChange={e => handleUpdateItem('features', idx, 'title', e.target.value)} /></div>
                                                <div className="space-y-1"><label className="text-[10px] text-t-muted uppercase">Опис (Desc)</label><input className="w-full bg-glass border border-glass-hover p-3 rounded-xl outline-none text-t-primary text-sm" value={feature.desc || ''} onChange={e => handleUpdateItem('features', idx, 'desc', e.target.value)} /></div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="md:col-span-2 p-6 rounded-[2rem] bg-white/[0.02] border border-glass space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Команда (Team)</h3>
                                            <button type="button" onClick={() => handleAddItem('team', { name: '', role: '', desc: '' })} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-primary/20 text-primary px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined text-sm">add</span> Додати учасника</button>
                                        </div>
                                        {(modal.data.team || []).map((member: any, idx: number) => (
                                            <div key={idx} className="relative grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-glass-hover rounded-2xl bg-black/40 group">
                                                <button type="button" onClick={() => handleRemoveItem('team', idx)} className="absolute -top-3 -right-3 bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><span className="material-symbols-outlined text-[14px]">delete</span></button>
                                                <div className="space-y-1"><label className="text-[10px] text-t-muted uppercase">Ім'я</label><input className="w-full bg-glass border border-glass-hover p-3 rounded-xl outline-none text-t-primary text-sm" value={member.name || ''} onChange={e => handleUpdateItem('team', idx, 'name', e.target.value)} /></div>
                                                <div className="space-y-1"><label className="text-[10px] text-t-muted uppercase">Роль</label><input className="w-full bg-glass border border-glass-hover p-3 rounded-xl outline-none text-t-primary text-sm" value={member.role || ''} onChange={e => handleUpdateItem('team', idx, 'role', e.target.value)} /></div>
                                                <div className="space-y-1"><label className="text-[10px] text-t-muted uppercase">Опис (Desc)</label><input className="w-full bg-glass border border-glass-hover p-3 rounded-xl outline-none text-t-primary text-sm" value={member.desc || ''} onChange={e => handleUpdateItem('team', idx, 'desc', e.target.value)} /></div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                            {/* ================= ФОРМА: ВИКЛАДАЧІ ================= */}
                            {modal.type === 'teachers' && (
                                <>
                                    <div className="md:col-span-2 space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Повне ПІБ</label><input required className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.fullName || ''} onChange={e => setModal({...modal, data: {...modal.data, fullName: e.target.value}})} /></div>
                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Посада</label><input required className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.jobPosition || ''} onChange={e => setModal({...modal, data: {...modal.data, jobPosition: e.target.value}})} /></div>
                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Ступінь</label><input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.degree || ''} onChange={e => setModal({...modal, data: {...modal.data, degree: e.target.value}})} /></div>
                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Мова</label><select className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.language || 'uk'} onChange={e => setModal({...modal, data: {...modal.data, language: e.target.value}})}><option value="uk">Українська (ua)</option><option value="en">English (en)</option></select></div>
                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Порядок (index)</label><input type="number" className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.orderNumber || 0} onChange={e => setModal({...modal, data: {...modal.data, orderNumber: parseInt(e.target.value)}})} /></div>
                                    <div className="md:col-span-2 space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Опис / Біографія</label><textarea rows={4} className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.description || ''} onChange={e => setModal({...modal, data: {...modal.data, description: e.target.value}})} /></div>

                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Дисципліни (через кому)</label><input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.subjects?.join(', ') || ''} onChange={e => handleArrayChange('subjects', e.target.value)} /></div>
                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Хобі (через кому)</label><input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.hobbies?.join(', ') || ''} onChange={e => handleArrayChange('hobbies', e.target.value)} /></div>
                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Теми досліджень (через кому)</label><input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.researchTopics?.join(', ') || ''} onChange={e => handleArrayChange('researchTopics', e.target.value)} /></div>
                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Наукові інтереси</label><input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.scientificInterests || ''} onChange={e => setModal({...modal, data: {...modal.data, scientificInterests: e.target.value}})} /></div>

                                    {/* БЛОК ПОСИЛАНЬ */}
                                    <div className="md:col-span-2 p-6 rounded-[2rem] bg-white/[0.02] border border-glass space-y-4">
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Контакти та соцмережі</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Email</label>
                                                <input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.links?.email || ''} onChange={e => setModal({...modal, data: {...modal.data, links: {...modal.data.links, email: e.target.value}}})} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">LinkedIn</label>
                                                <input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.links?.linkedin || ''} onChange={e => setModal({...modal, data: {...modal.data, links: {...modal.data.links, linkedin: e.target.value}}})} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Facebook</label>
                                                <input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.links?.facebook || ''} onChange={e => setModal({...modal, data: {...modal.data, links: {...modal.data.links, facebook: e.target.value}}})} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Особистий сайт (Site)</label>
                                                <input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.links?.site || ''} onChange={e => setModal({...modal, data: {...modal.data, links: {...modal.data.links, site: e.target.value}}})} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Wikipedia (Wiki)</label>
                                                <input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.links?.wiki || ''} onChange={e => setModal({...modal, data: {...modal.data, links: {...modal.data.links, wiki: e.target.value}}})} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">ORCID ID</label>
                                                <input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.orcidId || ''} onChange={e => setModal({...modal, data: {...modal.data, orcidId: e.target.value}})} />
                                            </div>


                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">ResearchGate</label>
                                                <input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.links?.researchGate || ''} onChange={e => setModal({...modal, data: {...modal.data, links: {...modal.data.links, researchGate: e.target.value}}})} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Scopus</label>
                                                <input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.links?.scopus || ''} onChange={e => setModal({...modal, data: {...modal.data, links: {...modal.data.links, scopus: e.target.value}}})} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Посада в компанії</label>
                                                <input className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.links?.companyPosition || ''} onChange={e => setModal({...modal, data: {...modal.data, links: {...modal.data.links, companyPosition: e.target.value}}})} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Фото (Завантажити)</label><input type="file" accept="image/*" onChange={e => setModal({...modal, file: e.target.files?.[0] || null})} className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:brightness-110" />{modal.data.photoUrl && <p className="text-xs text-t-muted mt-2">Поточне: {modal.data.photoUrl}</p>}</div>


                                    <div className="md:col-span-2 p-6 rounded-[2rem] bg-white/[0.02] border border-glass space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Наукові праці</h3>
                                            <button type="button" onClick={() => handleAddItem('scientificWorks', { name: '', authors: [], journal: '', url: '', year: new Date().getFullYear() })} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-primary/20 text-primary px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined text-sm">add</span> Додати працю</button>
                                        </div>

                                        {(modal.data.scientificWorks || []).map((work: any, idx: number) => (
                                            <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 gap-4 p-5 border border-glass-hover rounded-2xl bg-black/40 group">
                                                <button type="button" onClick={() => handleRemoveItem('scientificWorks', idx)} className="absolute -top-3 -right-3 bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><span className="material-symbols-outlined text-[14px]">delete</span></button>

                                                <div className="md:col-span-2 space-y-1">
                                                    <label className="text-[10px] text-t-muted uppercase">Назва статті / роботи</label>
                                                    <input className="w-full bg-glass border border-glass-hover p-3 rounded-xl outline-none text-t-primary text-sm focus:border-primary" value={work.name || ''} onChange={e => handleUpdateItem('scientificWorks', idx, 'name', e.target.value)} />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] text-t-muted uppercase">Автори (через кому)</label>
                                                    <input className="w-full bg-glass border border-glass-hover p-3 rounded-xl outline-none text-t-primary text-sm focus:border-primary" value={work.authors?.join(', ') || ''} onChange={e => {
                                                        const arr = e.target.value.split(',').map(a => a.trim()).filter(a => a !== '');
                                                        handleUpdateItem('scientificWorks', idx, 'authors', arr);
                                                    }} />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] text-t-muted uppercase">Журнал / Видання</label>
                                                    <input className="w-full bg-glass border border-glass-hover p-3 rounded-xl outline-none text-t-primary text-sm focus:border-primary" value={work.journal || ''} onChange={e => handleUpdateItem('scientificWorks', idx, 'journal', e.target.value)} />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] text-t-muted uppercase">URL Посилання</label>
                                                    <input className="w-full bg-glass border border-glass-hover p-3 rounded-xl outline-none text-t-primary text-sm focus:border-primary" value={work.url || ''} onChange={e => handleUpdateItem('scientificWorks', idx, 'url', e.target.value)} />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] text-t-muted uppercase">Рік публікації</label>
                                                    <input type="number" className="w-full bg-glass border border-glass-hover p-3 rounded-xl outline-none text-t-primary text-sm focus:border-primary" value={work.year || ''} onChange={e => handleUpdateItem('scientificWorks', idx, 'year', parseInt(e.target.value))} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* ================= ФОРМА: УНІВЕРСИТЕТИ ================= */}
                            {modal.type === 'universities' && (
                                <>
                                    <div className="md:col-span-2 space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Назва університету</label><input required className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.title || ''} onChange={e => setModal({...modal, data: {...modal.data, title: e.target.value}})} /></div>
                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Країна</label><input required className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.country || ''} onChange={e => setModal({...modal, data: {...modal.data, country: e.target.value}})} /></div>
                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Мова</label><select className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.language || 'uk'} onChange={e => setModal({...modal, data: {...modal.data, language: e.target.value}})}><option value="uk">Українська (ua)</option><option value="en">English (en)</option></select></div>
                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Посилання на сайт</label><input required className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary" value={modal.data.link || ''} onChange={e => setModal({...modal, data: {...modal.data, link: e.target.value}})} /></div>
                                    <div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-t-muted ml-2">Логотип (Завантажити)</label><input type="file" accept="image/*" onChange={e => setModal({...modal, file: e.target.files?.[0] || null})} className="w-full bg-glass border border-glass-hover p-4 rounded-2xl outline-none focus:border-primary text-t-primary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:brightness-110" />{modal.data.photo && <p className="text-xs text-t-muted mt-2">Поточне: {modal.data.photo}</p>}</div>
                                </>
                            )}

                            {/* КНОПКИ ДІЙ */}
                            <div className="md:col-span-2 pt-10 flex gap-4">
                                <button type="button" onClick={() => setModal({ ...modal, open: false })} className="flex-grow py-5 rounded-2xl border border-glass-hover font-bold uppercase text-xs tracking-widest hover:bg-glass transition-all">Скасувати</button>
                                <button type="submit" disabled={isLoading} className="flex-grow py-5 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-widest hover:brightness-110 shadow-lg shadow-primary/20 transition-all disabled:opacity-50">
                                    {isLoading ? 'Збереження...' : 'Зберегти зміни'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}