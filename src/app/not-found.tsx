import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <section className='container-app flex min-h-[70vh] items-center justify-center py-16'>
            <div className='card-ui w-full max-w-xl p-10 text-center'>
                <h1 className='text-4xl font-bold text-white'>Page not found</h1>
                <p className='mt-4 text-slate-300'>
                    The page you are looking for does not exist.
                </p>
                <Link href='/' className='btn-primary mt-8'>
                    Go Home
                </Link>
            </div>
        </section>
    )
}