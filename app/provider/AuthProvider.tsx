import dynamic from 'next/dynamic'
import { FC, PropsWithChildren } from 'react'

import { TypeComponentAuthFields } from './private-route.interface'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {
	ssr: false
})

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component: { isAuthUser },
	children
}) => {
	return !isAuthUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole children={children} Component={{ isAuthUser }} />
	)
}

export default AuthProvider
