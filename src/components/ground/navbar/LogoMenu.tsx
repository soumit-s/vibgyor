import VibgyorLogo from '@/components/common/logo';
import DownArrow from '@/components/svg/DownArrow1.svg';

const LogoMenu = () => (
  <div className='border border-outline rounded-lg flex items-center hover:bg-outline hover:cursor-pointer transition'>
    <div className='w-10 h-10 outline outline-1 outline-outline rounded-lg flex items-center justify-center'>
      <VibgyorLogo className='m-auto' />
    </div>
    <DownArrow className="w-4 h-4 stroke-foreground" />
  </div>
);

export default LogoMenu;