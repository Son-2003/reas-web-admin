import { useTranslation } from "react-i18next";
import Switch from 'react-switch';

export default function LanguageSwitch() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="flex items-center space-x-2 pr-4">
    <Switch
      onChange={toggleLanguage}
      checked={i18n.language === 'vi'}
      offColor="#888"
      onColor="#0d6efd"
      uncheckedIcon={
        <div className="flex items-center justify-center h-full w-full">
          <img
            src="src/assets/images/us.png"
            alt="US Flag"
            className="h-4 w-4 object-cover"
          />
        </div>
      }
      checkedIcon={
        <div className="flex items-center justify-center h-full w-full">
          <img
            src="src/assets/images/vietnam.png"
            alt="Vietnam Flag"
            className="h-4 w-4 object-cover"
          />
        </div>
      }
      height={26}
      width={50}
      handleDiameter={20}
      borderRadius={12}
      className="react-switch"
    />
  </div>
  )
}