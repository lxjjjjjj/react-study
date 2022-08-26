import React from 'react'
function Parent() {
    const [query, setQuery] = React.useState('react');
  
    // ✅ Preserves identity until query changes
    const fetchData = React.useCallback(() => {
      const url = 'https://hn.algolia.com/api/v1/search?query=' + query;
      // ... Fetch data and return it ...
    }, [query]);  // ✅ Callback deps are OK
  
    return <Child fetchData={fetchData} />
  }
  
  function Child({ fetchData }) {
    let [data, setData] = React.useState(null);
  
    React.useEffect(() => {
      fetchData().then(setData);
    }, [fetchData]); // ✅ Effect deps are OK
  
    // ...
  }
  // 因为fetchData只有在Parent的query状态变更时才会改变，
  // 所以我们的Child只会在需要的时候才去重新请求数据
  export default Parent