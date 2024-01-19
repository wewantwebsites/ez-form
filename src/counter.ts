export function setupCounter(element: HTMLButtonElement, counter = 0) {

  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }

  element.addEventListener('click', (e) => {
      const v = e.shiftKey ? -1 : 1;
      setCounter(counter += v)
  })

  setCounter(counter)
}
