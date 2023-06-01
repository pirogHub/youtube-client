import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaUserCircle } from 'react-icons/fa'

import Field from '@/components/ui/Field/Field'
import Button from '@/components/ui/button/Button'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useClosedClickOutside } from '@/hooks/useClosedClickOutside'

import styles from './AuthForm.module.scss'
import { IAuthFields } from './auth-form.interface'
import { validEmail } from './auth.valid'
import stylesIconBtn from '@/styles/iconsButtons.module.scss'

const AuthForm: FC = () => {
	const { ref, setIsShow, isShow } = useClosedClickOutside(false)

	const [authType, setAuthType] = useState<'login' | 'register'>('login')

	const { login, register: registerAction } = useActions()
	const { isLoading } = useAuth()

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<IAuthFields>({
		mode: 'onTouched'
	})

	const onSubmit: SubmitHandler<IAuthFields> = data => {
		if (authType === 'login') {
			login(data)
		} else {
			registerAction(data)
		}
	}

	return (
		<div ref={ref} className={styles.wrapper}>
			<button
				onClick={() => setIsShow(!isShow)}
				className={stylesIconBtn.button}
			>
				<FaUserCircle fill='#a4a4a4' />
			</button>
			{isShow && (
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Field
						{...register('email', {
							required: 'Email обязателен!',
							pattern: {
								value: validEmail,
								message: 'Email не валидный'
							}
						})}
						placeholder='Email'
						error={errors.email}
					/>
					<Field
						{...register('password', {
							required: 'Пароль обязателен!',
							minLength: {
								value: 6,
								message: 'Мин. длина 6 сиволов'
							}
						})}
						type='password'
						placeholder='Пароль'
						error={errors.password}
					/>
					<div className={styles.loginBtnWrapper}>
						<Button
							type={isLoading ? 'button' : 'submit'}
							disabled={isLoading}
							onClick={
								isLoading
									? () => setAuthType('login')
									: undefined
							}
						>
							Войти
						</Button>
					</div>
					<button
						type={isLoading ? 'button' : 'submit'}
						disabled={isLoading}
						className={styles.register}
						onClick={
							isLoading
								? () => setAuthType('register')
								: undefined
						}
					>
						Регистрация
					</button>
				</form>
			)}
		</div>
	)
}

export default AuthForm
