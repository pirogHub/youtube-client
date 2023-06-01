import type { AppProps } from 'next/app'
import NextProgressBar from 'nextjs-progressbar'
import AuthProvider from 'provider/AuthProvider'
import { TypeComponentAuthFields } from 'provider/private-route.interface'
import { Provider } from 'react-redux'
import ReduxToastrLib from 'react-redux-toastr'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/store/store'

import '@/styles/globals.scss'

type TypeAppProps = AppProps & TypeComponentAuthFields

export default function App({ Component, pageProps }: TypeAppProps) {
	return (
		<>
			<NextProgressBar
				color='#ff7652'
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<ReduxToastrLib
						newestOnTop={false}
						preventDuplicates
						progressBar
						closeOnToastrClick
						timeOut={3000}
						transitionIn='fadeIn'
						transitionOut='fadeOut'
					/>
					<AuthProvider Component={Component}>
						<Component {...pageProps} />
					</AuthProvider>
				</PersistGate>
			</Provider>
		</>
	)
}
