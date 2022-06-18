import styled from 'styled-components'

const SCConnectButton = styled.button`
  padding: 1.2rem 3.5rem;
  color: var(--text-color);
  background-color: transparent;
  border-radius: 2rem;
  border: .2rem solid var(--gray-3);
  cursor: pointer;
  font-size: 1.6rem;
  transition: all 0.2s ease-in-out;

  & svg {
    margin-right: 1rem;
  }

  &:hover {
    color: var(--blue);
    background-color: var(--white);
    border: .2rem solid var(--white);
  }
`

export default SCConnectButton