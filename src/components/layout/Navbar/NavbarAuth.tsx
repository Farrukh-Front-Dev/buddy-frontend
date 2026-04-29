import React from 'react';
import Button3D from '../../common/Button3D/Button3D';
import { LogIn } from 'lucide-react';

interface NavbarAuthProps {
  isRegistrationOpen: boolean;
  onLogin: () => void;
  onSignup: () => void;
}

const NavbarAuth: React.FC<NavbarAuthProps> = ({ isRegistrationOpen, onLogin, onSignup }) => {
  return (
    <div className="hidden lg:flex items-center space-x-3">
      <Button3D
        variant="secondary"
        className="py-2 px-4 text-xs"
        onClick={onLogin}
      >
        Kirish
      </Button3D>
      {isRegistrationOpen && (
        <Button3D
          variant="primary"
          className="py-2 px-4 text-xs flex items-center space-x-2"
          onClick={onSignup}
        >
          <LogIn className="w-4 h-4" />
          <span>Ro'yxatdan o'tish</span>
        </Button3D>
      )}
    </div>
  );
};

export default NavbarAuth;
