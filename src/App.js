import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import HeaderComponent from './component/HeaderComponent';
import { HomePage } from './container/Dashboard';

import { Layout } from 'antd';
import { Alert } from './container/Alert';

import './App.css';

const { Content } = Layout;

function App() {
  return (

      <Layout>
        <Helmet
          titleTemplate="%s - Ground AI Sound Analysis"
          defaultTitle="Ground AI Sound Analysis"
        >
           <meta name="description" content="Ground AI Sound Analysis application" />
        </Helmet>
        <HeaderComponent/>
        <Content style={{ padding: '0 50px' }}>
          <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path='/alert' component={Alert}/> 
          </Switch>
        </Content>
      </Layout>
  );
}

export default App;
