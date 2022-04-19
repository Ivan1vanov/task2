import React from 'react'
import styles from './message.module.scss'
import {Card} from 'react-bootstrap'
import { IMessageResponse } from '../../../store/types/messageActionTypes';
import moment from 'moment'

interface IMessageProps {
    message: IMessageResponse
}

const MessageComponent: React.FC<any> = ({message}) => {
  return (

        <Card className={styles.card}>
            <div className={styles.fromTo}>
              
              <div>
              <strong>From:</strong> {message.sender}
              </div>

              <div>
              {moment(message.createdAt).fromNow()}
              </div>

            </div>
            <div className={styles.fromTo}>
              <strong>To:</strong>  {message.receiver}
            </div>
            <div className={styles.textContainer}>
              <strong>{message.title}</strong>
            </div>
            <div className={styles.textContainer}>
                <p>{message.text}</p>
            </div>
            {/* <div className={styles.textContainer}>
                <strong>time: </strong> 
            </div> */}
        </Card>
  )
}

export default MessageComponent