import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoMdSend } from 'react-icons/io'

import Field from '@/components/ui/Field/Field'

import { ICommentDto } from '@/types/comment.interface'

import { commentApi } from '@/store/api/comment.api'

import styles from './Comments.module.scss'

const AddCommentFrom: FC<{ videoId: number }> = ({ videoId }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ICommentDto>({
		mode: 'onChange'
	})

	const [writeComment, { isLoading }] = commentApi.useCreateCommentMutation()
	const [deleteComment, { isLoading: isLoading_delete }] =
		commentApi.useDeleteCommentMutation()

	const onSubmit: SubmitHandler<ICommentDto> = async data => {
		writeComment({ ...data, videoId })
			.unwrap()
			.then(() => reset())
		reset()
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className='relative'>
				<Field
					{...register('message', {
						required: 'Коментарий не может быть пустым'
					})}
					placeholder='Введите комментарий'
					error={errors.message}
				/>

				<button
					className='text-xl absolute right-2 top-1.5 text-purple'
					disabled={isLoading}
				>
					<IoMdSend />
				</button>
			</div>
		</form>
	)
}

export default AddCommentFrom
