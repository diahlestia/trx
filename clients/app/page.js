"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to login page
        router.push('/login');
    }, [router]);

    return null; 
}

// export default function Page() {
//   return <h1>Hello, Next.js!</h1>
// }