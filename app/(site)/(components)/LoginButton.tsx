'use client'

import { useSession, signIn } from 'next-auth/react'

const LoginButton = () => {
    return (
        <button onClick={() => signIn()}>Login</button>
    )
}


export default LoginButton