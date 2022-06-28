import styled from 'styled-components'

const SCNftCard = styled.div`
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  & .value {
    font-weight: bold;
  }

  & .price {
    color: red;
    text-shadow: 0 2px 4px rgb(255 3 78 / 70%);

    & span {
      color: yellow;
      text-shadow: 0 2px 4px rgb(0 0 0 / 70%);
    }
  }
`

export default SCNftCard