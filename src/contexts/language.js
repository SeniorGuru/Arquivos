import * as React from 'react' ;

import { dictionaryList } from '../constants/lang';

const LanguageContext = React.createContext({}) ;

const LanguageProvider = ({children}) => {
  const [sysLang, setSysLang] = React.useState(dictionaryList.en) ;

  const onChangeLanguage = (option) => {
    setSysLang(dictionaryList[option])
  }

  return (
    <LanguageContext.Provider
      value={{
        sysLang,
        onChangeLanguage,
        langOpts : Object.keys(dictionaryList)
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider ;

export const useTranslate = () => (
  React.useContext(LanguageContext)
)