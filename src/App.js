import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import styled from 'styled-components'
import {publicRoutes} from "~/routes";
import {DefaultLayout} from "~/layout";

const SCApp = styled.div`
  position: relative;
  max-width: 100%;
  height: 100%;
`

function App() {
  return (
    <Router>
      <SCApp className='App'>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment
            }

            return <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page/>
                </Layout>
              }
            />
          })}
        </Routes>
      </SCApp>
    </Router>
  );
}

export default App;
