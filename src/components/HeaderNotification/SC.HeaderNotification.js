import styled from 'styled-components'

const SCHeaderNotification = styled.div`
  .content {
    margin-top: 1rem;
    position: relative;
    width: 100%;
    overflow: hidden;
    color: var(--text-color);
    &:before, &:after {
      content: '.';
      color: transparent;
      padding: 0 2rem;
      position: absolute;
      z-index: 2;
      top: 0;
      bottom: 0;
    }
    &:before {
      background: linear-gradient(90deg, #fff 0%, #fff 30%, #ffffffcf 60%, transparent 100%);
    }
    &:after {
      right: 0;
      background: linear-gradient(270deg, #fff 0%, #fff 30%, #ffffffcf 60%, transparent 100%);
    }
  }
  .message {
    display: inline-block;
    padding: 0 2rem;
    &+.message {
      border-left: 1px solid var(--gray-2);
    }
  }
`

export default SCHeaderNotification