import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

type Props = {
    isLoading: boolean
}

const LoadingScreen = (props: Props) => {
    const {isLoading} = props;
  return (
      <div className='spinner'>
          <ClipLoader loading={isLoading} size={100} />
      </div>
  )
}

export default LoadingScreen