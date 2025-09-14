import { Link } from 'react-router-dom';
import { Home, Users, UserPlus, Calendar } from 'lucide-react';

interface SidebarProps {
  onLinkClick?: () => void;
}

export function Sidebar({ onLinkClick }: SidebarProps) {
  return (
    <aside className="w-56 h-full bg-gray-900 text-white p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8 flex items-center gap-2 px-2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>EnfermaLink</span>
      </div>
      <nav>
        <ul className="space-y-2">
          <li><Link to="/" onClick={onLinkClick} className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"><Home className="h-5 w-5" /> Início</Link></li>
          <li><Link to="/pacientes" onClick={onLinkClick} className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"><Users className="h-5 w-5" /> Pacientes</Link></li>
          <li><Link to="/novo-paciente" onClick={onLinkClick} className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"><UserPlus className="h-5 w-5" /> Novo Paciente</Link></li>
          <li><Link to="/agendamentos" onClick={onLinkClick} className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"><Calendar className="h-5 w-5" /> Agendamentos</Link></li>
        </ul>
      </nav>
    </aside>
  );
}