import { FC } from 'react'

import styles from './LittleLoader.module.scss'

const LittleLoader: FC = () => {
	return <span className={styles.loader}></span>
}

export default LittleLoader
