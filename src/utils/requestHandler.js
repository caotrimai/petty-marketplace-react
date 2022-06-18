export const handleRequest = (promise) => {
  return promise
    .then((response) => ([response, undefined]))
    .catch((error) => ([undefined, error]))
}

export default handleRequest