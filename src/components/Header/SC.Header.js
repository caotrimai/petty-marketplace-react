import styled from 'styled-components'

const SCHeader = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  font-size: 2rem;
  flex-direction: row;
  justify-content: space-between;
  height: 72px;
  top: 0;
  position: sticky;
  z-index: 10;
  background-color: var(--white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: top 0.5s ease 0s;
  & .logo{
    font-size: 2.6rem;
    font-weight: bold;
    cursor: default;
  }
  & .menu{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.8rem;
    & .menuItem{
      margin-left: 1rem;
      cursor: pointer;
      &:hover{
        color: var(--primary-color);
      }
    }
    & .active{
      & .menuItem {
        color: var(--primary-color);
        font-weight: bold;
      }
    }
  }
`

export default SCHeader 