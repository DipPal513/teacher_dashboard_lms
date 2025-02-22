"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from './login/page';
import Cookies from 'js-cookie';

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        const cookie = Cookies.get("token");
        if (cookie) {
            router.push('/dashboard');
        }
    }, [router]);

    return (
        <div>
            <LoginPage />
        </div>
    );
}
