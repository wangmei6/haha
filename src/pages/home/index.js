import React ,{Component} from 'react'
import { Accordion ,List} from 'antd-mobile';

class Com extends Component{
    onChange = (key) => {
        console.log(key);
      }
    render(){
        return(
           
           <div className='box'>
                <header className='header'>
                <div className='nav'>
                    <div  className="iconfont icon-xiaomilogo"></div>
                    <div>
                        <input/>
                    </div>
                    <div className="iconfont icon-wode"></div>
                </div>
                </header>
                --------------- 
                {/* <div style={{ marginTop: 10, marginBottom: 10 }}>
                <Accordion onChange={this.onChange} defaultActiveKey="0">
                    <Accordion.Panel header="全部" >

                        text text text text text text text text text text text text text text text
                    </Accordion.Panel>
                    </Accordion>
                </div> 
               */}
                
                 <div className='content'>首页内容</div>
        </div>

        )
    }
}




export default Com;