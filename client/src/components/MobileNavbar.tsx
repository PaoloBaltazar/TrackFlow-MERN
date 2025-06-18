
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/UserMenu';
import { Menu } from 'lucide-react';

interface MobileNavbarProps {
  onMenuClick: () => void;
}

export const MobileNavbar = ({ onMenuClick }: MobileNavbarProps) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="p-2"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <UserMenu profileOnly />
      </div>
    </div>
  );
};
