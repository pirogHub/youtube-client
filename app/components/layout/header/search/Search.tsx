import { FC } from 'react'
import { BiSearchAlt } from 'react-icons/bi'

import VideoItem from '@/components/ui/video-item/VideoItem'

import { useSearch } from '@/hooks/useSearch'

import styles from './Search.module.scss'

const Search: FC = () => {
	const { handleSearch, isError, isLoading, isSuccess, data, searchTerm } =
		useSearch()

	return (
		<div className={styles.search_top}>
			<label>
				<input
					type='text'
					placeholder='Поиск видео...'
					value={searchTerm}
					onChange={handleSearch}
				/>
				<BiSearchAlt />
			</label>
			{isSuccess && (
				<div className={styles.result}>
					{data?.length ? (
						data.map(v => <VideoItem isSmall item={v} />)
					) : (
						<div className='text-white'>Видео не найдены</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Search
