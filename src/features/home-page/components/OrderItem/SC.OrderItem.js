import styled from 'styled-components'

const SCOrderItem = styled.div`
  padding: 2rem;
  margin: 1.5rem;
  background: var(--white);
  box-shadow: 0 3px 16px rgb(47 83 109 / 12%);
  border-radius: 2rem;
  overflow: hidden;
  transition: var(--transition-default);

  &:hover {
    transform: translateY(-.5rem);

    & .image > img {
      width: 80%;
    }
  }

  & .image {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;

    & img {
      width: 75%;
      aspect-ratio: 1 / 1;
      transition: var(--transition-default);
    }
  }

  & .infoRow {
    padding-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  & .name {
    font-size: 1.8rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: var(--blue);
    }
  }

  & .net {
    background-color: var(--blue);
    color: var(--white);
    padding: .5rem 1rem;
    border-radius: 2rem;
    font-size: 1.2rem;
  }
`

export default SCOrderItem