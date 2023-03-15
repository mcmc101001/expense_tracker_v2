'use client'

import { signOut } from 'next-auth/react'

const LogoutButton = () => {
    return <button onClick={() => signOut({callbackUrl: "https://localhost:3000"}) }>Logout</button>
}


export default LogoutButton