import React from 'react'
class Article extends React.Component {
    state = {
      article: null
    };
    componentDidMount() {
      this.fetchData(this.props.id);
    }
    async fetchData(id) {
      const article = await API.fetchArticle(id);
      this.setState({ article });
    }
    // ...
  }
export default Article

// 你很可能已经知道，上面的代码埋伏了一些问题。它并没有处理更新的情况。
// 所以第二个你能够在网上找到的经典例子是下面这样的：
class Article extends Component {
    state = {
      article: null
    };
    componentDidMount() {
      this.fetchData(this.props.id);
    }
    componentDidUpdate(prevProps) {
      if (prevProps.id !== this.props.id) {
        this.fetchData(this.props.id);
      }
    }
    async fetchData(id) {
      const article = await API.fetchArticle(id);
      this.setState({ article });
    }
    // ...
  }

  // 这显然好多了！但依旧有问题。有问题的原因是请求结果返回的顺序不能保证一致。
  // 比如我先请求 {id: 10}，然后更新到{id: 20}，但{id: 20}的请求更先返回。
  // 请求更早但返回更晚的情况会错误地覆盖状态值。
  // 这被叫做竞态，这在混合了async / await（假设在等待结果返回）和自顶向下数据流的代码中非常典型（props和state可能会在async函数调用过程中发生改变）。

  // Effects并没有神奇地解决这个问题，尽管它会警告你如果你直接传了一个async 函数给effect。（我们会改善这个警告来更好地解释你可能会遇到的这些问题。）

  // 如果你使用的异步方式支持取消，那太棒了。你可以直接在清除函数中取消异步请求。

  // 或者，最简单的权宜之计是用一个布尔值来跟踪它

  // 最简单的权宜之计是用一个布尔值来跟踪它

    function Article({ id }) {
    const [article, setArticle] = useState(null);

    useEffect(() => {
        let didCancel = false;

        async function fetchData() {
        const article = await API.fetchArticle(id);
        if (!didCancel) {
            setArticle(article);
        }
        }

        fetchData();

        return () => {
        didCancel = true;
        };
    }, [id]);

    // ...
    }

    // 在class组件生命周期的思维模型中，副作用的行为和渲染输出是不同的。
    // UI渲染是被props和state驱动的，并且能确保步调一致，但副作用并不是这样。这是一类常见问题的来源。

    // 而在useEffect的思维模型中，默认都是同步的。副作用变成了React数据流的一部分。
    // 对于每一个useEffect调用，一旦你处理正确，你的组件能够更好地处理边缘情况。