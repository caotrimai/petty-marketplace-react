import {faCheck, faClose} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Button, Input} from 'antd'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import accountThunk from '~/features/account/redux/accountThunk'
import {toastMessage} from '~/features/common/redux/commonSlice'
import SCNameInputForm from './SCNameInputForm'

export default function NameInputForm ({
  onSaveSuccess,
  onSaveCancel,
}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.account.user)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSaveName = async () => {
    try {
      setLoading(true)
      const userUpdate = {...user, display_name: name}
      await dispatch(accountThunk.updateUser(userUpdate))
      onSaveSuccess && onSaveSuccess()
    } catch (e) {
      console.error(e)
      dispatch(toastMessage( 'Error when update user'))
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSaveName = () => {
    setName('')
    onSaveCancel && onSaveCancel()
  }

  return (
    <SCNameInputForm className='NameInputForm'>
      <Input
        className='nameInput'
        placeholder='Input you name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        size='sm'
        className='save'
        onClick={handleSaveName}
        icon={<FontAwesomeIcon icon={faCheck}/>}
        loading={loading}
      >
        Save
      </Button>
      {!loading && (
        <Button
        size='sm'
        className='cancel'
        onClick={handleCancelSaveName}
        icon={<FontAwesomeIcon icon={faClose}/>}
        >
          Cancel
        </Button>
      )}
    </SCNameInputForm>
  )
}