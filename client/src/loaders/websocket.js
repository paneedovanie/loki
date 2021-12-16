const ws = new WebSocket(location.origin.replace(/^http/, 'ws'))

export default () => {
  ws.onopen = () => {
    const message = messageSending({ action: 'ADD_CLIENT' })
    ws.send(message)
  }
  window.events.on('ws-send', (message) => {
    message = messageSending(message)
    ws.send(message)
  })
  ws.onmessage = (message) => {
    message = messageReceiving(message.data)

    window.events.emit(`ws-message_${message.action}`, message.data, ws)
  }
  return ws
}

const messageSending = (message) => {
  if (typeof message === 'string') return message

  return JSON.stringify(message)
}

const messageReceiving = (message) => {
  try {
    return JSON.parse(message)
  } catch (err) {
    return message
  }
}
