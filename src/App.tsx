import React, { useState } from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Transition from './components/Transition/transition';
import Input from './components/Input/input';
import Search from './components/Input/search';
import AutoComplete, { DataSourceType } from './components/Input/autoComplete';
import Icon from './components/Icon/icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Upload, { UploadFile } from './components/Upload/upload';

library.add(fas);

interface heroProps {
  value: string;
  no: number;
}

const App: React.FC = () => {
  const [show, setShow] = useState(true);
  const [inputTestValue, setInputTestValue] = useState('');
  const [clearVlaue, setClearVlaue] = useState('');
  const [seachValue, setSeachValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoComValue, setAutoComValue] = useState('');

  const defaultFileList: UploadFile[] = [
    { uid: '1', name: '文件1.docx', size: 22220, status: 'done' },
    { uid: '2', name: '文件1.docx', size: 22220, status: 'error' },
    {
      uid: '3',
      name: '文件1.docx',
      size: 22220,
      precent: 20,
      status: 'uploading',
    },
  ];
  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // const handleFetch = (query: string) => {
  //   return options.filter((item) => item.includes(query));
  // };

  // const handleFetch = (query: string) => {
  //   return objOptions.filter((item) => item.value.includes(query));
  // };

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({
          value: item.login,
          ...item,
        }));
      })
      .catch((error) => error('Fetch Error: ', error));
  };

  const handleSelect = (item: DataSourceType) => {
    const itemCopy = item as DataSourceType<heroProps>;
  };

  const renderItem = (item: DataSourceType) => {
    return <div>Name: {item.value}</div>;
  };

  const handleFileChange = (file: File) => {
    console.log('上传', file);
  };

  const onUploadProgress = (percentage: number, file: File) => {
    console.log('percentage', percentage);
    console.log('file', file);
  };

  return (
    <div className="App" style={{ margin: '100px' }}>
      <div>
        <h3>Button component</h3>
        <Button disabled>123</Button>
        <Button
          onClick={() => {
            alert(123);
          }}
          btnType="primary"
        >
          123
        </Button>
        <Button
          btnType="danger"
          onClick={() => {
            console.log('inputTestValue', inputTestValue.length);
          }}
        >
          Danger
        </Button>
        <Button size="lg">123</Button>
        <Button btnType="primary" size="lg">
          <Icon theme="light" icon="search"></Icon>
        </Button>
        <Button btnType="link" href="http://www.baidu.com" disabled>
          Bai Du
        </Button>
        <Button btnType="link" target="_blank" href="http://www.baidu.com">
          Bai Du
        </Button>
        <h3>Menu component</h3>
        <Menu
          defaultIndex={'0'}
          className="test"
          mode="vertical"
          defaultOpenSubMenus={['3']}
        >
          <MenuItem disabled>1</MenuItem>
          <MenuItem>2</MenuItem>
          <MenuItem>3</MenuItem>
          <SubMenu title="一级菜单">
            <MenuItem>MenuItem2</MenuItem>
            <MenuItem>MenuItem3</MenuItem>
          </SubMenu>
        </Menu>
        <h3>Transition component</h3>
        <Button onClick={() => setShow(!show)}>toggle article</Button>
        {/* <Transition animation="zoom-in-left" in={show} timeout={300}>
        <div>
          <h4>article title</h4>
          <p>article content</p>
          <p>article content</p>
          <p>article content</p>
          <p>article content</p>
          <p>article content</p>
        </div>
      </Transition> */}
        <Transition
          wrapper={true}
          animation="zoom-in-left"
          in={show}
          timeout={300}
        >
          <Button btnType="primary" size="lg">
            transition button
          </Button>
        </Transition>
        <h3>输入框</h3>
        <Input
          placeholder="测试1"
          size="lg"
          value={inputTestValue}
          onChange={(e) => setInputTestValue(e.target.value)}
        ></Input>
        <Input placeholder="禁用" disabled></Input>
        <Input placeholder="password" size="sm" type="password"></Input>
        <h5>带有内置前后元素</h5>
        <Input
          prefixEle={<Icon theme="primary" icon="user"></Icon>}
          placeholder="用户名"
          size="lg"
          value={inputTestValue}
          onChange={(e) => setInputTestValue(e.target.value)}
        ></Input>
        <Input
          suffixEle="RMB"
          placeholder="金额"
          size="sm"
          disabled
          value={inputTestValue}
          onChange={(e) => setInputTestValue(e.target.value)}
        ></Input>
        <Input
          prefixEle="前"
          suffixEle="后"
          placeholder="用户名"
          size="sm"
          value={inputTestValue}
          onChange={(e) => setInputTestValue(e.target.value)}
        ></Input>
        <h5>可清空输入内容</h5>
        <Input
          placeholder="用户名"
          clearAble
          value={clearVlaue}
          onChange={(e) => setClearVlaue(e.target.value)}
        ></Input>
        <h5>带有前后元素</h5>
        <p style={{ width: '300px' }}>
          <Input
            size="lg"
            addonBefore="123"
            addonAfter="789"
            placeholder="用户名"
          ></Input>
        </p>
        <p style={{ width: '200px' }}>
          <Input
            addonAfter={<Icon theme="primary" icon="spinner"></Icon>}
            placeholder="用户名"
            disabled
          ></Input>
        </p>
        <p style={{ width: '200px' }}>
          <Input
            size="sm"
            addonBefore={<Icon theme="danger" icon="cloud-moon"></Icon>}
            placeholder="用户名"
          ></Input>
        </p>
        <h5>搜索功能</h5>
        <p style={{ width: '200px' }}>
          <Search
            size="sm"
            value={seachValue}
            loading={isLoading}
            placeholder="search component"
            onSearch={() => handleSearch()}
            onChange={(e) => setSeachValue(e.target.value)}
          ></Search>
        </p>
        <h3>AutoComplete</h3>
        <AutoComplete
          value={autoComValue}
          fetchSuggestions={handleFetch}
          onSelect={handleSelect}
          renderOptions={renderItem}
          debounce
        ></AutoComplete>
      </div>
      <div>
        <h3>上传组件</h3>
        <Upload
          action="http://jsonplaceholder.typicode.com/posts"
          defaultFileList={defaultFileList}
          onChange={handleFileChange}
          onProgress={onUploadProgress}
          headers={{ Token: '123' }}
          data={{ param1: '0' }}
          accept=".jpg,.docx"
          multiple={true}
        >
          <div>上传</div>
        </Upload>
      </div>
    </div>
  );
};

export default App;
