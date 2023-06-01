import { useState } from 'react';
import { IAuthData } from '@/services/auth/auth.helper';
export const useAuth = () => {
    const [authData, setAuthData] = useState<IAuthData>({} as IAuthData)



    return { user: authData.user }
}