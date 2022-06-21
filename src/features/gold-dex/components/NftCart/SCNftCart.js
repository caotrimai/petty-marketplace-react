import styled from 'styled-components'

const SCNftCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & .fields{
    width: 16rem;
  }
  & .field{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-transform: capitalize;
    & span+span{
      font-weight: bold;
    }
  }
  
`

export default SCNftCard