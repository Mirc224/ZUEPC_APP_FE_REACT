import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';

type Props = {}

const Missing = (props: Props) => {
    const { t } = useTranslation();
  
    useEffect(() => {
      document.title = t('missingMessage');
    return () => {
    }
  }, [t])

  
    return (
    <h1>{t('missingMessage')}</h1>
  )
}

export default Missing