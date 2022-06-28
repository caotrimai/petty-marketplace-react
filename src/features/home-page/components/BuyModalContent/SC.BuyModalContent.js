import styled from 'styled-components'

const SCBuyModalContent = styled.div`
  padding: 0 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 1.6rem;
    & .value {
      font-weight: bold;
    }
  }
  
  & .submit-button{
    margin-top: 2rem;
    width: 40%;
  }
`

export default SCBuyModalContent