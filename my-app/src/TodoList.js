import React, { Fragment } from 'react';
import './style.scss';

class TodoList extends React.Component{
    constructor(props) {
        super(props); // props 在 react 里 固定写法。super说明要继承父类。
        // state 负责存储数据
        this.state = {
            inputValue: '',
            list:[]
        };
    }

    render() {
        return (
            // jsx 语法，必须在 最外层 包一个 元素。
            // 可以使用 Fragment占位符 代替 div，且不会显示。
            // <div>
            <Fragment>
                <div>
                    {/* 会聚焦到 id='insertArea' 的 element 里 */}
                    <label htmlFor='insertArea'>input</label>
                    <input 
                    id='insertArea'
                    // class 会被认为是 类，会混合，不建议这样用。
                    // class='input'
                    // 使用 className
                    className='input'
                    value={this.state.inputValue}
                    // this 已经变了，需要 bind 回去 需要的 this
                    onChange={this.handleInputChange.bind(this)}
                    />
                    <button onClick={this.handleButtonClick.bind(this)}>go</button></div> 
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (<li 
                                        key={index} 
                                        onClick={this.handleItemDelete.bind(this, index)}
                                        // 不转译页面设置
                                        // eg. 输入框输入 <h1>hello</h1>
                                        dangerouslySetInnerHTML={{__html: item}}
                                    ></li>);
                        })
                    }
                </ul>
            </Fragment>
            // </div>
        );
    }

    handleInputChange(e) {
        // this.state.inputValue = e.target.value; 
        // 不能直接改变state里边的数据，必须调用 setState() 方法。
        this.setState({
            inputValue: e.target.value
        });
    }

    handleButtonClick() {
        this.setState({
            //     拼接之前的数组
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        });
    }

    handleItemDelete(index) {
        // Immutable
        // state 不允许我们做任何的改变，非要改的话，就 copy 一个副本，然后去替换。
        const list = [...this.state.list];
        list.splice(index, 1);
        this.setState({
            list: list
        });
    }
}

export default TodoList;