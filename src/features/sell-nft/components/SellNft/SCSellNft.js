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
    & button {
      width: 100%;
      height: 4.8rem;
      padding: 0 2.4rem;
      position: relative;
      align-items: center;
      display: inline-flex;
      justify-content: center;
      font-family: inherit;
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 1;
      outline: 0;
      background-color: rgb(31, 199, 212);
      color: white;
      border: 0;
      border-radius: 1.6rem;
      box-shadow: rgb(14 14 44 / 40%) 0px -1px 0px 0px inset;
      transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`

export default SCSellNft