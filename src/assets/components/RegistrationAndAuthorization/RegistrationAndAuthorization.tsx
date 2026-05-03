import { FormEvent, useState } from 'react'
import UiButton from '../Ui/UiButton/UiButton'
import './Auth.scss'

interface AuthProps {
    onSubmit?: (credentials: { email: string; password: string }) => void
}

function Auth({ onSubmit }: AuthProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <section className="auth-block">
            <div className="auth-block__header">
                <h2 className="auth-block__title">Вход в кабинет</h2>
                <p className="auth-block__subtitle">
                    Введите email и пароль для доступа к сервису.
                </p>
            </div>
            <form className="auth-block__form" onSubmit={handleSubmit}>
                <UiButton type="submit" fullWidth loading={isLoading}>
                    {isLoading ? 'Вход...' : 'Войти'}
                </UiButton>
                <UiButton type="submit" fullWidth loading={isLoading}>
                    {isLoading ? 'Регистрация...' : 'Регистрация'}
                </UiButton>
            </form>
        </section>
    )
}

export default Auth
