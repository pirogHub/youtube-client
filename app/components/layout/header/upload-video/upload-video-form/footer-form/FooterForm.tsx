import cn from 'classnames'
import { FC } from 'react'
import { MdCheckCircle, MdUpload } from 'react-icons/md'

import Button from '@/components/ui/button/Button'

import styles from './FooterForm.module.scss'

interface IFooterForm {
	isUploaded: boolean
	percent: number
}
const FooterForm: FC<IFooterForm> = ({ isUploaded, percent }) => {
	return (
		<div className={styles.footer}>
			<div
				className={cn(styles.status, {
					[styles['icons-uploaded']]: isUploaded
				})}
			>
				<MdUpload className={styles['upload-icon']} />
				<MdCheckCircle className={styles['check-icon']} />
				<span>
					{isUploaded ? 'Видео загружено' : `Загрузка ${percent}%...`}
				</span>
			</div>
			<div>
				<Button>Сохранить</Button>
				{/* компонетнент с этой кнопкой внутри формы будет. поэтому форма будет ловить нажатие этой кнопки*/}
			</div>
		</div>
	)
}

export default FooterForm
