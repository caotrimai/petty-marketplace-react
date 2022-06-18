import {Layout, Col, Row} from 'antd'
import styled from 'styled-components'
import Divider from '~/components/Divider'
import Header from '~/components/Header'

const {Footer, Content} = Layout

const MainContentStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

function DefaultLayout ({children}) {
  return (
    <Layout className='DefaultLayout' style={{minWidth: '45rem'}}>
      <Header/>
      <Divider/>
      <Row>
        <MainContentStyle>
        <Col xs={24} sm={24} md={24} lg={24} xl={18}>
          <Content>{children}</Content>
        </Col>
        </MainContentStyle>
      </Row>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default DefaultLayout