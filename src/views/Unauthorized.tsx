import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'

type Props = {}

const Unauthorized = (props: Props) => {
  const {t} = useTranslation();
  useEffect(() => {
    document.title = t('unauthorized')

    return () => {
    }
  }, [t])
  return (
    <h1>{t('unauthorized')}</h1>
  )
}

export default Unauthorized