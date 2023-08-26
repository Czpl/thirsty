import { useState } from 'react';
import { TNotificationBarProps } from './../../types/appTypes';

import './notificationBar.scss';

function NotificationBar(props: TNotificationBarProps){
  const [dismissed, setDismissed] = useState(false);
  if(dismissed) return null;
  return(
    <div className={`notificationBar ${dismissed ? 'dismissed' : null}`} onClick={() => setDismissed(true)}>
      {props.message}
    </div>
  )
}

export default NotificationBar;