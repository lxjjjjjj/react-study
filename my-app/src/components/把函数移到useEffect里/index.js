import React, { useState, useEffect } from "react";
import axios from 'axios';

function SearchResults() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('react');

  useEffect(() => {
    function getFetchUrl() {
      return 'https://hn.algolia.com/api/v1/search?query=' + query;
    }

    async function fetchData() {
      const result = await axios(getFetchUrl());
      setData(result.data);
    }

    fetchData();
  }, [query]); // 添加依赖
  // 有时候你可能不想把函数移入effect里。比如，组件内有几个effect使用了相同的函数，
  // 你不想在每个effect里复制黏贴一遍这个逻辑。也或许这个函数是一个prop
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SearchResults


function SearchResultsmore() {
    function getFetchUrl(query) {
      return 'https://hn.algolia.com/api/v1/search?query=' + query;
    }
  
    useEffect(() => {
      const url = getFetchUrl('react');
      // ... Fetch data and do something ...
    }, []); // 🔴 Missing dep: getFetchUrl
  
    useEffect(() => {
      const url = getFetchUrl('redux');
      // ... Fetch data and do something ...
    }, []); // 🔴 Missing dep: getFetchUrl
  
    // ...
  }
  // 在这个例子中，你可能不想把getFetchUrl 移到effects中，因为你想复用逻辑。
  // 另一方面，如果你对依赖很“诚实”，你可能会掉到陷阱里。
  // 我们的两个effects都依赖getFetchUrl，而它每次渲染都不同，所以我们的依赖数组会变得无用
  // 一个可能的解决办法是把getFetchUrl从依赖中去掉。但是，我不认为这是好的解决方式。
  // 这会使我们后面对数据流的改变很难被发现从而忘记去处理。这会导致类似于上面“定时器不更新值”的问题。
  // 相反的，我们有两个更简单的解决办法。
  // 第一个， 如果一个函数没有使用组件内的任何值，
  // 你应该把它提到组件外面去定义，然后就可以自由地在effects中使用：
  // ✅ Not affected by the data flow
  function getFetchUrl(query) {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }
  
  function SearchResultsTwo() {
    useEffect(() => {
      const url = getFetchUrl('react');
      // ... Fetch data and do something ...
    }, []); // ✅ Deps are OK
  
    useEffect(() => {
      const url = getFetchUrl('redux');
      // ... Fetch data and do something ...
    }, []); // ✅ Deps are OK
  
    // ...
  }
  // 你不再需要把它设为依赖，因为它们不在渲染范围内，因此不会被数据流影响。
  // 它不可能突然意外地依赖于props或state。
  // 跟数据流没关系的请求函数或者别的函数应该定义到函数组件外
  

  // 或者把函数写成useCallback函数

  function SearchResultsThree() {
    // ✅ Preserves identity when its own deps are the same
    const getFetchUrl = React.useCallback((query) => {
      return 'https://hn.algolia.com/api/v1/search?query=' + query;
    }, []);  
    // ✅ Callback deps are OK
  
    useEffect(() => {
      const url = getFetchUrl('react');
      // ... Fetch data and do something ...
    }, [getFetchUrl]); // ✅ Effect deps are OK
  
    useEffect(() => {
      const url = getFetchUrl('redux');
      // ... Fetch data and do something ...
    }, [getFetchUrl]); // ✅ Effect deps are OK
  
    // ...
  }
  // useCallback本质上是添加了一层依赖检查。它以另一种方式解决了问题 - 
  // 我们使函数本身只在需要的时候才改变，而不是去掉对函数的依赖。

  // 我们很快发现它遗漏了query依赖：

    function SearchResultsFour() {
        const [query, setQuery] = useState('react');
        const getFetchUrl = React.useCallback(() => { // No query argument
            return 'https://hn.algolia.com/api/v1/search?query=' + query;
        }, []); // 🔴 Missing dep: query
        // ...
    }
    // 我们要感谢useCallback，因为如果query 保持不变，getFetchUrl也会保持不变，
    // 我们的effect也不会重新运行。但是如果query修改了，getFetchUrl也会随之改变，
    // 因此会重新请求数据。这就像你在Excel里修改了一个单元格的值，另一个使用它的单元格会自动重新计算一样。

    // 我想强调的是，到处使用useCallback是件挺笨拙的事。
    // 当我们需要将函数传递下去并且函数会在子组件的effect中被调用的时候，
    // useCallback 是很好的技巧且非常有用。或者你想试图减少对子组件的记忆负担，
    // 也不妨一试。context的dispatch传递 https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
