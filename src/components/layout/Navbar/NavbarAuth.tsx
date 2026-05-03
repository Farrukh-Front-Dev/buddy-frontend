import React from 'react';
import Button3D from '../../common/Button3D/Button3D';
import { LogIn } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface NavbarAuthProps {
  isRegistrationOpen: boolean;
  onLogin: () => void;
  onSignup: () => void;
}

const NavbarAuth: React.FC<NavbarAuthProps> = ({ isRegistrationOpen, onLogin, onSignup }) => {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:flex items-center gap-2.5">
      <Button3D
        variant="secondary"
        className="py-3 px-4 text-[12px] font-bold"
        onClick={onLogin}
      >
        {t('nav.login', 'Sign In')}
      </Button3D>
      {isRegistrationOpen && (
        <Button3D
          variant="primary"
          className="py-3 px-4 text-[12px] font-bold flex items-center gap-2"
          onClick={onSignup}
        >
          <LogIn className="w-4 h-4" />
          <span>{t('nav.signup', 'Sign Up')}</span>
        </Button3D>
      )}
    </div>
  );
};

export default NavbarAuth;
