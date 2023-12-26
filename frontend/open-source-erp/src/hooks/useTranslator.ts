import { useRecoilValue } from 'recoil';
import { Language } from '../recoil/globalState';

const useTranslator = () => {
  const language = useRecoilValue(Language);

  return language;
};

export default useTranslator;
