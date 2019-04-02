import React, { Component } from 'react';
import {Switch,Route,NavLink,Redirect} from 'react-router-dom'
import Home from '@/pages/home';
import Kind from '@/pages/kind';
import Cart from '@/pages/cart';
import User from '@/pages/user';

class App extends Component {
  render() {
    return (
     <div className='container'>
         <Switch>
                <Route path='/home' component={Home}></Route>
                <Route path='/kind' component={Kind}></Route>
                <Route path='/cart' component={Cart}></Route>
                <Route path='/user' component={User}></Route>
         </Switch>
         <footer className='footer'>
              <ul>
                 <NavLink to='/home'><div className="iconfont icon-ziyuan"></div><div>首页</div></NavLink>
                 <NavLink to='/kind'><div className="iconfont icon-fenlei"></div><div>分类</div></NavLink>
                 <NavLink to='/cart'><div className="iconfont icon-gouwuche"></div><div>购物车</div></NavLink>
                 <NavLink to='/user'><div className="iconfont icon-wode"></div><div>我的</div></NavLink>
               </ul>
         </footer>
     </div>
    )
  }
}

export default App;
