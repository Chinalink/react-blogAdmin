/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-11 18:01:15
 * @LastEditTime: 2020-07-11 21:32:48
 */ 
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom'
import { main as mainConfig } from './router/config';
import { RenderRoutes } from './router';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      {/* <Switch>通过查找所有的子<Route>并渲染与当前URL匹配的第一个<Route>的内容 */}
      <Switch>
        <RenderRoutes routes={mainConfig} />
      </Switch>
    </BrowserRouter>
  );
}

// function Topic(props) {
//   const match = useRouteMatch()
//   console.log('TopicMatch=>', match)
//   console.log('Topic=>', props);
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>
// }

// function Topics(props) {
//   const match = useRouteMatch()
//   console.log('match=>', match)
//   return (
//     <div>
//       <h2>Topics</h2>
//       <ul>
//         <li><Link to={`${match.url}/components`}>Components</Link></li>
//         <li><Link to={`${match.url}/props-v-state`}>Props v. State</Link></li>
//       </ul>
//       {/*
//         Topics页面有自己的<Switch>，其中包含更多的路线，建立在/topics路径之上
//         您可以将第二个<Route>视为所有主题的“索引”页面，或者当未选择任何主题时显示的页面
//       */}
//       <Switch>
//         <Route path={`${match.path}/:topicId`}>
//           <Topic />
//         </Route>
//         <Route path={match.path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//       </Switch>
//     </div>
//   );
// }

export default App;
