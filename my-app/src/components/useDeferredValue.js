import React, { Suspense, useState, useDeferredValue } from 'react';
function SearchResults(props) {
    return (
      <>
        {props.query ? <div>no match for {props.query}</div> : null}
      </>
    );
  }

export default function App() {
  const [query, setQuery] = useState('');
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={query} />
      </Suspense>
    </>
  );
}

// export default function App() {
//     const [query, setQuery] = useState('');
//     const deferredQuery = useDeferredValue(query);
//     return (
//       <>
//         <label>
//           Search albums:
//           <input value={query} onChange={e => setQuery(e.target.value)} />
//         </label>
//         <Suspense fallback={<h2>Loading...</h2>}>
//           <SearchResults query={deferredQuery} />
//         </Suspense>
//       </>
//     );
//   }
  

