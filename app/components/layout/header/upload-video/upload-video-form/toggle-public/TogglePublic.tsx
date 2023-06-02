import { Switch } from '@headlessui/react'
import cn from 'classnames'
import { FC } from 'react'

import styles from './TogglePublic.module.scss'

interface ITogglePublic {
	clickHandler: () => void
	isEnabled: boolean
}

const TogglePublic: FC<ITogglePublic> = ({ clickHandler, isEnabled }) => {
	return (
		<div className={styles.wrapper}>
			<Switch
				checked={isEnabled}
				onChange={clickHandler}
				className={cn(styles.switch, {
					'bg-primary bg-opacity-80': isEnabled,
					'bg-slate-900': !isEnabled
				})}
			>
				<span
					className={cn(styles.point, {
						'translate-x-6 bg-slate-900': isEnabled,
						'translate-x-1 bg-slate-600': !isEnabled
					})}
				/>
			</Switch>
			<span onClick={clickHandler}>Публичное видео</span>
		</div>
	)
}

export default TogglePublic
