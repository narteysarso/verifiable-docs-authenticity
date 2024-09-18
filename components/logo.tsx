import Image from 'next/image'

export default function Logo() {
    return (
        <div className="flex flex-auto items-center text-2xl font-bold text-foreground">
            <Image
                src="/logo.png"
                alt='Veridocx Logo'
                width={64}
                height={64}
            />
            <small className='text-sm font-medium leading-none sm:hidden md:inline-block'>
                VeriDocx
            </small>
        </div>
    )
}
