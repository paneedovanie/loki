export default () => {
  const files = require.context('../subscribers', true, /.js$/)
  files.keys().forEach(file => {
    const Subscriber = files(file).default || files(file),
      subscriber = new Subscriber,
      functions = Object.getOwnPropertyNames(Object.getPrototypeOf(subscriber))

    for (const fnName of functions) {
      if (fnName === constructor) continue
      window.events.on(subscriber.suffix + fnName, subscriber[fnName])
    }
  })
}