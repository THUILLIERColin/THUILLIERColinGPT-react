import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';

function Logout() {
    const { logout } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        logout();
        void router.push('/');
    }, [logout, router]);

    return null;
}

export default Logout;
