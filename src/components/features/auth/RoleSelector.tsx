import React from 'react';
import { User, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface RoleSelectorProps {
  role: 'student' | 'curator' | 'admin';
  onRoleChange: (role: 'student' | 'curator' | 'admin') => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ role, onRoleChange }) => {
  const { t } = useTranslation('auth');

  return (
    <div className="flex p-1.5 bg-slate-900 rounded-2xl mb-8 shadow-inner" style={{
      border: '2px solid rgb(79, 70, 229)',
      boxShadow: '3px 3px 0px 0px rgb(168, 85, 247)',
    }}>
      <button
        type="button"
        onClick={() => onRoleChange('student')}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all ${
          role === 'student' 
            ? 'bg-indigo-600 text-white' 
            : 'text-slate-400 hover:text-slate-200'
        }`}
        style={role === 'student' ? {
          boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.3)',
        } : {}}
      >
        <User className="w-4 h-4" />
        <span>{t('roles.student', "O'quvchi")}</span>
      </button>
      <button
        type="button"
        onClick={() => onRoleChange('curator')}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all ${
          role === 'curator' 
            ? 'bg-purple-600 text-white' 
            : 'text-slate-400 hover:text-slate-200'
        }`}
        style={role === 'curator' ? {
          boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.3)',
        } : {}}
      >
        <ShieldCheck className="w-4 h-4" />
        <span>{t('roles.curator', 'Kurator')}</span>
      </button>
    </div>
  );
};

export default RoleSelector;
