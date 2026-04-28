import { FormEvent, useState } from 'react'
import UiInput from '../Ui/UiInput/UiInput'
import UiButton from '../Ui/UiButton/UiButton'
import './Auth.scss'

interface AuthProps {
    onSubmit?: (credentials: { email: string; password: string }) => void
}

function Auth({ onSubmit }: AuthProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')

        if (!email.trim() || !password.trim()) {
            setError('Пожалуйста, заполните все поля.')
            return
        }

        setIsLoading(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            onSubmit?.({ email: email.trim(), password: password.trim() })
        } catch {
            setError('Ошибка авторизации. Попробуйте ещё раз.')
        } finally {
            setIsLoading(false)
        }
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
                <label className="auth-block__field">
                    <span className="auth-block__label">Email</span>
                    <UiInput
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="example@mail.ru"
                        disabled={isLoading}
                    />
                </label>

                <label className="auth-block__field">
                    <span className="auth-block__label">Пароль</span>
                    <UiInput
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="********"
                        disabled={isLoading}
                    />
                </label>

                {error ? <div className="auth-block__error">{error}</div> : null}

                <UiButton type="submit" fullWidth loading={isLoading}>
                    {isLoading ? 'Вход...' : 'Войти'}
                </UiButton>
            </form>
        </section>
    )
}

export default Auth
