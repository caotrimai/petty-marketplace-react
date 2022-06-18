import styled from 'styled-components'

const SCNameInputForm = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: row;
  & .nameInput{
    margin-right: 1rem;
  }
  & button{
    margin-left: .5rem;
    border-radius: 2rem;
    color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    &.save{
      background-color: var(--green);
    }
    &.cancel{
      background-color: var(--gray-3);
    }
    &:hover{
      opacity: .8;
      color: var(--white);
      border: 1px solid transparent;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    & svg{
      margin-right: .5rem;
      font-size: 1.8rem;
    }
  }
`

export default SCNameInputForm