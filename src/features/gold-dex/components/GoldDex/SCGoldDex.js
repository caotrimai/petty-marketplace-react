import styled from 'styled-components'

const SCGoldDex = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .wrapper {
    width: 33rem;
    display: flex;
    flex-direction: column;

    color: var(--text-color);
    background: var(--white);
    border-radius: 2.4rem;
    overflow: hidden;
    position: relative;

    & .header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1rem 2.4rem;
      text-align: center;

      & .title {
        width: 100%;
        font-weight: bold;
      }

      & .description {
        width: 100%;
        text-align: center;
        font-size: 1.4rem;
      }
    }

    & .body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1rem 2.4rem;

      & .swap {
        display: flex;
        justify-content: center;
        & .icon-swap {
          position: relative;
          margin: 2rem 1rem 1rem 1rem;
          color: rgb(31, 199, 212);
          font-size: 3rem;
          cursor: pointer;
        }
      }

      & .icon-loading {
        @keyframes spin {
          0%   {transform: rotate(0);}
          100% {transform: rotate(360deg);}
        }
        animation: spin 1s linear infinite;
        &+span{
          margin-left: 1rem;
        }
      }

      & input {
        height: 5rem;
        margin-top: .5rem;
        padding: 1rem 2rem;
        font-size: 2rem;
        text-align: right;
        background-color: #eeeaf4;
        border-radius: 2.4rem;
      }
      
      & .fee{
        padding: .5rem 1rem;
        font-size: 1.4rem;
        text-align: right;
        font-style: italic;
        color: var(--primary-color);
      }
      
      & .button{
        margin-top: 3rem;
        padding: 1rem 0;
        & button{
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
    }
  }
`

export default SCGoldDex