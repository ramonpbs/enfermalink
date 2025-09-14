import { Link } from 'react-router-dom';
import { Home, Users, UserPlus, Calendar } from 'lucide-react';

interface SidebarProps {
  onLinkClick?: () => void;
}

export function Sidebar({ onLinkClick }: SidebarProps) {
  return (
    <aside className="w-56 h-full bg-gray-900 text-white p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8 flex items-center gap-2 px-2">
        {/* SVG substituído pela tag img abaixo */}
        <img src="/vite.svg" alt="EnfermaLink Logo" width="40" height="40" />
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
