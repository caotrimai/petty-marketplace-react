import styled from 'styled-components'

const SCSellNft = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .wrapper {
    padding: 2rem;
    width: 40rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: var(--text-color);
    background: var(--white);
    border-radius: 2.4rem;
    overflow: hidden;
    position: relative;

  }

  & .actions {
    margin-top: 1rem;

    & input {
      height: 5rem;
      padding: 1rem 2rem;
      font-size: 2rem;
      text-align: right;
      background-color: #eeeaf4;
      border-radius: 2.4rem;

      &:focus {
        outline: none;
        box-shadow: none;
        border: 1px solid #d9d9d9;
      }
    }

    & .ant-input-group-addon {
      background-color: #eeeaf4;
      border-radius: 0 2.4rem 2.4rem 0;
      font-weight: bold;
    }
  }

  & .button {
    margin-top: 1rem;
    padding: 1rem 0;
  }
`

export default SCSellNft