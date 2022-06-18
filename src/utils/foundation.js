export const shortingAddress = (address) => {
  return `${address.slice(0, 4)}...${address.slice(address.length - 4)}`
}

export const shortingName = (name) => {
  const strings = name.split(' ')
  if (strings.length === 1) {
    return strings[0].slice(0, 1)
  }
  return `${strings[0].slice(0, 1)}${strings[1].slice(0, 1)}`
}