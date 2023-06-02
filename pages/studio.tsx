import { NextPageAuth } from 'provider/private-route.interface'
import { FC } from 'react'

import Studio from '@/components/pages/studio/Studio'

const StudioPage: NextPageAuth = () => {
	return <Studio />
}
StudioPage.isAuthUser = true

export default StudioPage
