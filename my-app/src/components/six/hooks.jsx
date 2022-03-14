import { useState, useEffect } from 'react'
export default FetchGame = ({ id }) => {
  // if (!id) {
  //   return '请选择一个游戏';
  // }
  // 报错
  //这也就是React官方文档中所说的：不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。
​  //解决这个问题最直接的办法就是按照官方文档所说的，确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们：

  const [game, setGame] = useState({ 
    name: '',
    description: '' 
  });
  
  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch(`/api/game/${id}`);
      const fetchedGame = await response.json();
      setGame(fetchedGame);
    };
    fetchGame();
  }, [id]);
  
  if (!id) {
    return '请选择一个游戏';
  }
  // 改成在这里写if
  return (
    <div>
      <div>Name: {game.name}</div>
      <div>Description: {game.description}</div>
    </div>
  );
}