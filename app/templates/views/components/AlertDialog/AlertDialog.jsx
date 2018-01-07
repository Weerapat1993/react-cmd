import React from 'react'
import { Dialog, FlatButton } from 'material-ui'

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class AlertDialog extends React.Component {
  constructor() {
    super()

    this.state = {
      open: true,
    }
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
    this.props.onClearError()
  }

  getNotifiaionTitle(error) {
    switch (error) {
      case 'Network Error':
        return 'การเชื่อมต่อล้มเหลว กรุณาเชื่อมต่ออินเตอร์เน็ต'
      case 'Request failed with status code 404':
        return 'การเชื่อมต่อล้มเหลว กรุณาเชื่อมต่ออินเตอร์เน็ต'
      case 'Request failed with status code 422':
        return 'email หรือ password ไม่ถูกต้อง'
      default: 
        return 'มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง'
    }
  }

  render() {
    const { error } = this.props
    const actions = [
      <FlatButton
        label="ตกลง"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ]

    const errorText = this.getNotifiaionTitle(error)

    return (
      <Dialog
        title={'การแจ้งเตือน'}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        {errorText}
      </Dialog>
    )
  }
}