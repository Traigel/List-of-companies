import styles from './ErrorOutput.module.scss'
import {useEffect, useState} from 'react';
import {SvgSelector} from '../SvgSelector';
import {setAppError} from '../../../app/app-reducer';
import {useAppDispatch, useAppSelector} from '../../hooks';

export const ErrorOutput = () => {

  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.app.error)

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  const onClickHandler = () => {
    dispatch(setAppError({message: ''}))
    clearTimeout(timeoutId)
  }

  useEffect(() => {
    clearTimeout(timeoutId)
    if (error.message) {
      const timeoutId = setTimeout(() => {
        dispatch(setAppError({message: ''}))
      }, 6000)
      setTimeoutId(timeoutId)
    }
  }, [error])

  return <div className={styles.ErrorOutputComponent}>
    {error.message &&
      <div className={styles.error}>
        <div className={styles.h3}>
          {error.message}
        </div>
        <div
          className={styles.cross}
          onClick={onClickHandler}
        >
          <SvgSelector type={'cross'}/>
        </div>
      </div>
    }
  </div>
}