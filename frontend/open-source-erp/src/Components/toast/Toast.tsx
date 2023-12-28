import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { toastState } from '../../recoil/toastState';

import SlAlert from '@shoelace-style/shoelace/dist/react/alert/index.js';

const Toast = () => {
  const toast = useRecoilValue(toastState);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    if (toast.isVisible) {
      setIsVisible(true);

      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 2500);
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

  return (
    <div className={` fixed bottom-5 right-5 `}>
      <SlAlert
        variant={toast.type === 'error' ? 'danger' : 'success'}
        open={isVisible}
        closable
        duration={3000}
        className="w-[260px]"
      >
        {toast.message}
      </SlAlert>
    </div>
  );
};

export default Toast;
