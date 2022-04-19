import React, { useEffect, useState } from 'react'
import {Container, Button} from 'react-bootstrap'
import styles from './names.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import { getNameAction } from '../../store/actions/nameAction';
import { getNamesAPI } from '../../api/apis';
import ReceiverMessages from '../../Components/Messages/ReceiverMessages';
import { createMessageAction } from '../../store/actions/messageActions';


const MainPage = () => {

  const getLocalName = localStorage.getItem('currentUserName')
  const localName = getLocalName !== null ? JSON.parse(getLocalName) : ''

  const dispatch: any = useDispatch()

  const names = useSelector((state: any) => state.names)


  const [text, setText] = useState<any>('')

  const [errorValidMessage, setErrorValidMessage] = useState<string>('')


  const [suggestions, setSuggestions] = useState([])
  const [messageData, setMessageData] = useState({
        sender: localName,
        receiver: '',
        title: "Some title",
        text: "Hello, Miron!"
  })

  const onChangeMessageData = (e: any) => {
        setMessageData({
          ...messageData,
          [e.target.name]: e.target.value
        })
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageData({
      ...messageData,
      receiver: e.target.value
    })
    let matches = []
    if(text.length >= 0) {

      matches = names?.names
      if(text.length > 1) {
        matches = names?.names.filter((user: any) => { 
          const regex = new RegExp(`${text}`, 'gi')
          return user.name.match(regex)
        })
      }
    }

    setSuggestions(matches)
    console.log(matches)
  }

  const setNameIntoInputHandler = (name: string) => {
        setMessageData({
          ...messageData,
          receiver: name
        })
        setSuggestions([])
  }

 
  useEffect(() => {
    dispatch(getNameAction())
  }, [dispatch])

  const createMessageHandler = (e: React.MouseEvent<HTMLElement>) => {

    if(!messageData.receiver || !messageData.title || !messageData.text) {
      setErrorValidMessage('All fields are required')
    } else {
      setErrorValidMessage('')
      setMessageData({
        sender: localName,
        receiver: '',
        title: "Some title",
        text: "Hello, Miron!"
      })
    }
    // dispatch(createMessageAction(messageData))

  }

  return (
    <Container className={styles.container}>
      <div className={styles.titleBody}>
      <h3>Hello {localName && localName}.</h3> <br/> 
      <h4>Send a message to someone</h4>
 
        </div>
      <div className={styles.inputBlock}>
      <label htmlFor="receiverInput">Receiver</label>
      <input type='text' 
      className='col-md-12 input mb-1'
      id="receiverInput"
      value={messageData.receiver}
      onChange={onChangeHandler}
      placeholder='Enter the receiver name'
      onBlur={() => setTimeout(() => {
        setSuggestions([])
      }, 1000)}
      />

      <div className={styles.suggestionBlock}>
      {suggestions && suggestions.map((sug: any, index: number) => (
        <div onClick={() => setNameIntoInputHandler(sug.name)} className={'col-md-12 justify-content-md-center' && styles.suggestion} key={index}>
          {sug.name}
        </div>
      ))}
      </div>
      </div>
      <div className={styles.bodyMessage}>
      <div className="form-group">
      <label htmlFor="exampleFormControlInput1">Title</label>
      <input type="text" name='title' onChange={onChangeMessageData} className="col-md-12 input mb-1" id="exampleFormControlInput1" placeholder="Message Title"/>
      </div>  

      <div className="form-group">
      <label htmlFor="exampleFormControlTextarea1">Message</label>
      <textarea name='text' onChange={onChangeMessageData} className="col-md-12 input mb-1" id="exampleFormControlTextarea1" rows={3}></textarea>
      </div>
      </div>
      {errorValidMessage && (
        <div className="alert alert-danger" role="alert">
        {errorValidMessage}
      </div>
      )}
      <Button onClick={createMessageHandler} className={styles.setButton}>Send message</Button>

      <ReceiverMessages/>
    </Container>
  )
}

export default MainPage