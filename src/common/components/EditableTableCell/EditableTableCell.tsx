import {ChangeEvent, KeyboardEvent, useState} from "react"
import {InputText} from '../InputText/InputText';
import styles from './EditableTableCell.module.scss';
import {useAppDispatch} from '../../hooks';
import {setAppError} from '../../../app/app-reducer';
import {SvgSelector} from '../SvgSelector';

type EditableTableCellPropsType = {
  title: string
  setTitle: (newTitle: string) => void
  disabled: boolean
}
export const EditableTableCell = ({title, setTitle, disabled}: EditableTableCellPropsType) => {

  const dispatch = useAppDispatch()

  const [visibility, setVisibility] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(false)
  const [titleValue, setTitleValue] = useState<string>(title)
  const [error, setError] = useState<boolean>(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== ' ') {
      setTitleValue(e.currentTarget.value)
    } else {
      dispatch(setAppError({message: 'Поле не может начинаться с пробела'}))
    }
  }

  const offVisibilityHandler = () => {
    if (disabled) {
      return
    } else {
      const titleReplace = titleValue.replace(/^ +| +$|( ) +/g, "$1")
      if (titleReplace !== '') {
        setTitle(titleValue)
        setVisibility(false)
      } else {
        dispatch(setAppError({message: 'Поле не может быть пустым'}))
      }
    }
  }

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && offVisibilityHandler()

  const handleMouseEnter = () => setEditing(true)
  const handleMouseLeave = () => setEditing(false)

  const onVisibilityHandler = () => {
    if (disabled) {
      return
    } else {
      setVisibility(true)
    }
  }

  return <div>
    {visibility
      ?
      <InputText
        className={styles.input}
        value={titleValue}
        onChange={onChangeHandler}
        onKeyUp={onKeyUpHandler}
        onBlur={offVisibilityHandler}
        autoFocus
      />
      :
      <span
        onDoubleClick={onVisibilityHandler}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {title} {editing && <SvgSelector type={'pencil'}/>}
      </span>
    }

  </div>
}