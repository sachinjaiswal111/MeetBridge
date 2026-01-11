
import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

function Layout({ children, showSidebar }) {
  return (
    <div className="flex h-dvh overflow-hidden">
      {/* Sidebar only renders if showSidebar is true */}
      {showSidebar && (
        <aside className="hidden md:flex w-64 border-r bg-base-200">
          <Sidebar />
        </aside>
      )}

      {/* Main content area expands if sidebar is hidden */}
      <main className={`flex-1 flex flex-col ${!showSidebar ? 'w-full' : ''}`}>
        <Navbar />
        <section className="flex-1 overflow-y-auto">
          {children}
        </section>
      </main>
    </div>
  );
}

export default Layout
