import Leftbar from '@/components/Leftbar';
import Signup from '@/components/auth/Signup';
import React from 'react';

export default function Login() {
    return (
        <>
        <Leftbar />
        <main className="flex flex-col h-full w-full bg-gray-200 dark:bg-gray-800">
            <Signup />
        </main>
        </>
    );
};

