// Error: The default export is not a React Component in "/admin/[slug]/page"

// Call Stack
// 25

// Show 25 ignore-listed frame(s)
// 1
// 2
// This error happened while generating the page. Any console logs will be displayed in the terminal window

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
