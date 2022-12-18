import {ChangeEvent, useState, KeyboardEvent} from "react"

type EditableTableCellPropsType = {
  title: string
  setTitle: (newTitle: string) => void
  disabled: boolean
}
export const EditableTableCell = ({title, setTitle, disabled}: EditableTableCellPropsType) => {

  const [visibility, setVisibility] = useState<boolean>(false)
  const [titleValue, setTitleValue] = useState<string>(title)
  const [error, setError] = useState<boolean>(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== ' ') {
      setTitleValue(e.currentTarget.value)
      setError(false)
    } else setError(true)
  }

  const offVisibilityHandler = () => {
    if (disabled) {
      return
    } else {
      const titleReplace = titleValue.replace(/^ +| +$|( ) +/g, "$1")
      if (titleReplace !== '') {
        setTitle(titleValue)
        setVisibility(false)
      } else setError(true)
    }
  }

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && offVisibilityHandler()

  const onVisibilityHandler = () => {
    if (disabled) {
      return
    } else {
      setVisibility(true)
    }
  }

  return <td>
    {visibility
      ?
      <input
        value={titleValue}
        onChange={onChangeHandler}
        onKeyUp={onKeyUpHandler}
        onBlur={offVisibilityHandler}
        autoFocus
      />
      :
      <span onDoubleClick={onVisibilityHandler}>{title}</span>
    }

  </td>
}