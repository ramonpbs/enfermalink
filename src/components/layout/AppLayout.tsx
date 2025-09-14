import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Adicionamos a borda aqui, na div que só aparece em desktop */}
      <div className="hidden md:block border-r border-gray-200">
        <Sidebar />
      </div>
      
      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}