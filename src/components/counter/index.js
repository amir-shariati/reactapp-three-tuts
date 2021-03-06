import React, {useState} from "react";


export function Counter({initialCount}) {
    const [count, setCount] = useState(initialCount);
    return (
        <div>
            Count: {count}
            <button onClick={() => setCount(initialCount)}>Reset</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
        </div>
    );
}