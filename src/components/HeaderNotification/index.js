import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {animated, useSpring} from 'react-spring'
import {decreaseMessageShowTime} from '~/features/common/redux/commonSlice'
import SCHeaderNotification from './SC.HeaderNotification'

export default function HeaderNotification () {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.common.headerMessages)
  const [key, setKey] = useState(1)
  
  const scrolling = useSpring({
    from: {transform: 'translate(100%,0)'},
    to: {transform: 'translate(-100%,0)'},
    config: {duration: 25000},
    reset: true,
    onRest: () => {
      setKey(key + 1)
      if(messages.length > 0) {
        dispatch(decreaseMessageShowTime())
      }
    },
  })

  return (
    <SCHeaderNotification className='HeaderNotification'>
      <div className='content'>
        <animated.div style={scrolling}>
          {messages.map(({message, type}) => (
            <div className={`message ${type}`} key={message}>
              {message}
            </div>))}
        </animated.div>
      </div>
    </SCHeaderNotification>
  )
}