import Image from 'next/image'

// Simple Login Logo
export const Logo = () => (
    <Image
        src="/assets/logo.png"
        alt="Logo"
        width={200}
        height={150}
        style={{ objectFit: 'contain' }}
    />
)

// Simple Sidebar Icon
export const Icon = () => (
    <Image
        src="/assets/logo.png"
        alt="Icon"
        width={40}
        height={40}
        style={{ objectFit: 'contain' }}
    />
)