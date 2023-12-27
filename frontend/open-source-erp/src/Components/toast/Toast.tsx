import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { toastState } from '../../recoil/toastState';
import { useTheme } from '../../hooks/useTheme';

const Toast = () => {
  const toast = useRecoilValue(toastState);
  const [isVisible, setIsVisible] = useState(false);
  const { getColorClasses, theme } = useTheme()
  const primary = getColorClasses('primary')

  useEffect(() => {
    let timeoutId: number;

    if (toast.isVisible) {
      setIsVisible(true);

      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [toast]);

  useEffect(() => {
    if (!toast.isVisible && isVisible) {
      const transitionTimeout = setTimeout(() => setIsVisible(false), 300);

      return () => clearTimeout(transitionTimeout);
    }
  }, [toast.isVisible, isVisible]);

  if (!isVisible) return null;
  console.log({ theme })

  return (
    <div className={theme}>
      <div
        className={` fixed bottom-5 right-5 w-[260px] p-3 rounded shadow-lg transition-all duration-300 ease-out ${primary} ${toast.type === 'error' ? ' border-t-4 border-red-700' : ' border-t-4 border-green-700'
          } ${toast.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {toast.message}
      </div>
    </div>
  );
};

export default Toast;
