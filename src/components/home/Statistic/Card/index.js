import OverdueMyToDo from './OverdueMyToDo'
import AlertProcessed from './AlertProcessed'
import DeviceOnline from './DeviceOnline'
import DeviceError from './DeviceError'

const card_comp = {
  "overdue_myToDo": OverdueMyToDo,
  "alert_processed": AlertProcessed,
  "DeviceOnline": DeviceOnline,
  "DeviceError": DeviceError
}

export default (props) => {
  const { code } = props
  return (
    <div>
      {card_comp[code] && card_comp[code]()}
    </div>
  )
}