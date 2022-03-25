import { useTranslation } from 'react-i18next'

type Props = {}

const Unauthorized = (props: Props) => {
  const {t} = useTranslation();
  return (
    <h1>{t('unauthorized')}</h1>
  )
}

export default Unauthorized