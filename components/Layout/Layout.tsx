import React from 'react'
import NextHead from 'next/head'

interface LayoutProps {

}

const Layout: React.FC<LayoutProps> = ({children}) => {
        return (
            <>
            <div className='h-100 w-full overflow-auto'>
                <NextHead>
                    <title>Amrita Cyber Security Club</title>
                    <link rel="icon" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZbQeq2N_yvoGcKT7tmTo7leB6djsf_vmKP-32ae0WGLJ4zoJnoQUF-5LPusGYciK6kcA&usqp=CAU" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="theme-color" content="#822699" />
                    <meta name="description" content="Amrita Cyber Security Club is a student-run club that aims to provide a platform for students to learn about cyber security and to build their technical skills." />
                </NextHead>
                <video 
                  src="/bg.mkv"
                    autoPlay
                    loop
                    muted
                    style={{ position: 'fixed', minHeight: '100%', minWidth: '100%', objectFit: 'cover', top: 0, left: 0 }}
                />
                <div className='relative'>
                 
                    {children}
                </div>
                <footer>
                    <div className='flex justify-center relative mt-12'>
                        <p className='text-center text-white'>
                            Made by hackers for hackers
                        </p>
                    </div>
                </footer>
            </div>
            </>
        );
}

export default Layout