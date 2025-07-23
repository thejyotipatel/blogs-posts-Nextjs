'use client'
import Navbar from '@/app/(components)/Navbar'

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'main-wrapper'}>
      <main className={'main-content'}>
        <Navbar />
        {children}
      </main>
    </div>
  )
}
export default DashboardWrapper
