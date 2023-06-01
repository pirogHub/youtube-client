import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaUserCircle } from 'react-icons/fa'

import Field from '@/components/ui/Field/Field'
import Button from '@/components/ui/button/Button'

import { useAuth } from '@/hooks/useAuth'
import { useClosedClickOutside } from '@/hooks/useClosedClickOutside'

import styles from './AuthForm.module.scss'
import { IAuthFields } from './auth-form.interface'
import { validEmail } from './auth.valid'
import stylesIconBtn from '@/styles/iconsButtons.module.scss'

const AuthForm: FC = () => {
	const { ref, setIsShow, isShow } = useClosedClickOutside(false)

	const [authType, setAuthType] = useState<'login' | 'register'>('login')

	// const {isLoading} = useAuth()

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<IAuthFields>({
		mode: 'onTouched'
	})

	const onSubmit: SubmitHandler<IAuthFields> = data => {
		if (authType === 'login') {
		} else {
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
						<Button onClick={() => setAuthType('login')}>
							Войти
						</Button>
					</div>
					<button
						className={styles.register}
						onClick={() => setAuthType('register')}
					>
						Регистрация
					</button>
				</form>
			)}
		</div>
	)
}

export default AuthForm
