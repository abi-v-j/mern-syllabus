import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

function PublicLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header
        onOpenSidebar={() => setSidebarOpen(true)}
        onCloseSidebar={() => setSidebarOpen(false)}
      />
      <Outlet
        context={{
          isSidebarOpen,
          closeSidebar: () => setSidebarOpen(false),
        }}
      />
      <Footer />
    </div>
  );
}

export default PublicLayout;
