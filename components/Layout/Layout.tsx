import React from 'react'

interface LayoutProps {

}

const Layout: React.FC<LayoutProps> = ({children}) => {
        return (
            <>
            <div className='h-100 w-full overflow-auto'>
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
            </div>
            </>
        );
}

export default Layout