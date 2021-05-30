import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// react-router-dom적용하고픈 최상위 component를 감싸주는 wrapper component
import {BrowserRouter, Route, Switch, Link, NavLink, useParams} from 'react-router-dom';
// HashRouter를 쓰면 /#이 붙음.어떤 페이지로 들어오건간에 Root page에 있는 HTML을 서비스하고 싶으면 Hash를 쓰면됨.

// react router DOM은 여러페이지로 나뉜 사이트에서 효과를 볼수있음
// 라우팅은 사용자가 어떠한 주소로 들어왔을때 주소에 맞는 적당한 페이지를 사용자에게 보내주는것.

function Home(){
  return (
    <div>
      <h2>Home</h2>
      Home...
    </div>
  )
};

var contents=[
  {id:1, title:"HTML", description:"HTML is ..."},
  {id:2, title:"JS", description:"JS is ..."},
  {id:3, title:"React", description:"React is ..."}
]

// useParams의 params안에 topic_id가 있음.
// 이걸로 topic선택을 통제.
function Topic(){
  var params = useParams();
  var topic_id = params.topic_id
  var selected_topic = {
    title:"Sorry",
    description:"Not Found"
  }
  for (var i = 0; i <contents.length;i++){
    if(contents[i].id === Numver(topic_id)){
      selected_topic = contents[i];
      break;
    }
  }
  console.log('params', params, params.topic_id);
  return(
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  )
}

// :topic_id값이 Topic component로 넘어감.
// li tag만들떄는 무조건 key값을 주어서 에러안나게 해야함.
function Topics(){
  var lis = [];
  for(var i=0;i<contents.length;i++){
    lis.push(<li key={contents[i].id}><NavLink to={'topics/'+contents[i].id}>{contents[i]}</NavLink></li>)
  }
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {lis}
      </ul>
      <Route path="/topics/:topic_id">
        <Topic></Topic>
      </Route>
    </div>
  )
};

// <Switch>
// <Route path="/topics/1">HTML is...</Route>
// <Route path="/topics/2">JS is...</Route>
// <Route path="/topics/3">React is...</Route>
// </Switch>

function Contact(){
  return (
    <div>
    <h2>Contact</h2>
      Contact...
    </div>
  )
};

// 정확하게 path가 일치할때만 routing하는 exact.
// Reactrouter trainning페이지 Api Route에서 속성 찾을수있음
// 동적 routing으로 path가 같은, 포함되는 모든 component를 불러낼수있음.
// Switch를쓰면 가장 먼저 걸리는 path만 출력하고 나머지 다 버림..("/"를가지면 그거만 출력됨.)
// "/"인 home을 가장 아래에 두면 문제없음. 위에 두려면exact써야함.
// 다른 모든 이상한 주소를 넣으면 Not Found 출력.
// a href 대신 Link to를쓰면 페이지 초기화를 막고 ajax처럼 동작하게 함.
// navLink를 쓰면 걸리는Link에 class="active"가 걸림."(사용자가 위치 한 곳을 알려줄수있음)"
// .active에 css style을 걸어줄수있음.

function App(){
  return(
    <div>
      <h1>React Router DOM example</h1>
      <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/topics">Topics</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      <Switch>
        <Route exact path="/"><Home></Home></Route>
        <Route path="/topics"><Topics></Topics></Route>
        <Route path="/contact"><Contact></Contact></Route>
        <Route path="/">Not Found</Route>
      </Switch>
    </div>

  )
}

// 이러면 App안에서 BrowserRouter사용가능한 상태가 됨.
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>,document.getElementById('root'))