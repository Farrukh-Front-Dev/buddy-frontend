import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Mail, AtSign, Briefcase } from 'lucide-react';
import { UserData } from '../../../types';
import { useAuthForm } from './useAuthForm';
import { useTranslation } from '../../../hooks/useTranslation';
import BackButton from './BackButton';
import AuthHeader from './AuthHeader';
import RoleSelector from './RoleSelector';
import ErrorMessage from './ErrorMessage';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';
import AuthToggle from './AuthToggle';
import Card3D from '../../common/Card3D/Card3D';

interface AuthPageProps {
  initialMode: 'login' | 'signup';
  onBack: () => void;
  onSuccess: (user: UserData) => void;
  isRegistrationOpen?: boolean;
  isCuratorRegistrationOpen?: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({
  initialMode,
  onBack,
  onSuccess,
  isRegistrationOpen = true,
  isCuratorRegistrationOpen = true
}) => {
  const { mode: urlMode } = useParams<{ mode: string }>();
  const { t } = useTranslation('auth');
  const [mode, setMode] = useState<'login' | 'signup'>(() => {
    if (urlMode === 'login' || urlMode === 'signup') return urlMode as any;
    return initialMode;
  });
  const [role, setRole] = useState<'student' | 'curator' | 'admin'>('student');

  const {
    formData,
    regStep,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
    resetForm
  } = useAuthForm({ mode, role, onSuccess });

  const shadowColor = 'rgb(168, 85, 247)';
  const borderColor = 'rgb(79, 70, 229)';

  // Sync mode with URL
  useEffect(() => {
    const newMode = (urlMode === 'login' || urlMode === 'signup') 
      ? urlMode as 'login' | 'signup' 
      : initialMode;
    setMode(newMode);
    resetForm();
  }, [urlMode, initialMode]);

  // Registration restrictions
  useEffect(() => {
    if (!isRegistrationOpen) {
      setMode('login');
    }
  }, [isRegistrationOpen]);

  useEffect(() => {
    if (!isCuratorRegistrationOpen && role === 'curator') {
      setRole('student');
    }
  }, [isCuratorRegistrationOpen, role]);

  const handleModeToggle = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    resetForm();
  };

  const handleRoleChange = (newRole: 'student' | 'curator' | 'admin') => {
    setRole(newRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-4 relative overflow-hidden">
      {/* Background Glow - matching HomePage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
        <BackButton onClick={onBack} />

        <Card3D 
          borderColor={borderColor}
          shadowColor={shadowColor}
          className="p-6 md:p-10"
        >
          <AuthHeader mode={mode} />

          {mode === 'signup' && isCuratorRegistrationOpen && (
            <RoleSelector role={role} onRoleChange={handleRoleChange} />
          )}

          <ErrorMessage message={error} />

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Step 2: Full Name */}
            {mode === 'signup' && regStep === 2 && (
              <FormInput
                label={t('form.name_label', 'Ismingiz')}
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('form.name_placeholder', 'Abbos Aliyev')}
                icon={User}
              />
            )}

            {/* Username */}
            <FormInput
              label={t('form.username_label', 'Username')}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  document.getElementById('password-input')?.focus();
                }
              }}
              placeholder={t('form.username_placeholder', 'Username')}
              icon={AtSign}
              disabled={mode === 'signup' && regStep === 2}
            />

            {/* Step 2: Email */}
            {mode === 'signup' && regStep === 2 && (
              <FormInput
                label={t('form.email_label', 'Email')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('form.email_placeholder', 'example@buddy.uz')}
                icon={Mail}
                disabled={true}
              />
            )}

            {/* Step 2: Field (Curator only) */}
            {mode === 'signup' && regStep === 2 && role === 'curator' && (
              <FormInput
                label={t('form.field_label', 'Mutaxassisligingiz')}
                name="field"
                value={formData.field}
                onChange={handleInputChange}
                placeholder={t('form.field_placeholder', 'Frontend / UI/UX / Mobile...')}
                icon={Briefcase}
              />
            )}

            {/* Password */}
            <PasswordInput
              value={formData.password}
              onChange={handleInputChange}
              disabled={mode === 'signup' && regStep === 2}
            />

            <SubmitButton
              isLoading={isLoading}
              role={role}
              mode={mode}
              regStep={regStep}
            />
          </form>

          <AuthToggle
            mode={mode}
            onToggle={handleModeToggle}
            isRegistrationOpen={isRegistrationOpen}
          />
        </Card3D>
      </div>
    </div>
  );
};

export default AuthPage;
