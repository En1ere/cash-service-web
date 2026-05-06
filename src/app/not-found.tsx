import Link from 'next/link';
import cl from '@/styles/not-found.module.css'

export default function NotFound() {
    return (
        <div className={cl['content-wrapper']}>
            <div className={cl.content}>
                <h2 className={cl.title}>404 - Страница не найдена</h2>
                <p>Такого роута нет</p>
                <Link href="/">← На главную</Link>
            </div>
        </div>
    );
}