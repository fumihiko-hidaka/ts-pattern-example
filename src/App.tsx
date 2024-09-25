import {Fragment, useState} from 'react'
import './App.css'
import {match} from 'ts-pattern';


type Data =
    | { data: { status: 'loading' } }
    | { data: { status: 'success'; value: string } }
    | { data: { status: 'error'; error: string } };

const data: Data[] = [
    {data: {status: 'loading'}},
    {data: {status: 'success', value: '🎉'}},
    {data: {status: 'error', error: '💥'}},
];

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div>
                <div className="card">
                    <button onClick={() => setCount((count) => (count + 1) % 3)}>
                        count is {count}
                    </button>
                </div>

                <div>
                    <div>
                        <p>普通に頑張ると</p>
                        {(() => {
                            if (count === 0) {
                                return <p>count is 0</p>
                            }

                            if (count === 1) {
                                return <p>count is 1</p>
                            }

                            if (count === 2) {
                                return <p>count is 2</p>
                            }
                        })()}
                        <pre style={{textAlign: 'left'}}>
                    {`
                    {(() => {
                        if (count === 0) {
                            return <p>count is 0</p>
                        }

                        if (count === 1) {
                            return <p>count is 1</p>
                        }

                        if (count === 2) {
                            return <p>count is 2</p>
                        }
                    })()}
                    `}
                </pre>
                    </div>

                    <div>
                        <p>ts-patternで書くと</p>
                        {match(count)
                            .when((value) => value === 0, () => <p>count is 0</p>)
                            .when((value) => value === 1, () => <p>count is 1</p>)
                            .when((value) => value === 2, () => <p>count is 2</p>)
                            .run()
                        }
                        <pre style={{textAlign: 'left'}}>
                    {`
                    {match(count)
                        .when((value) => value === 0, () => <p>count is 0</p>)
                        .when((value) => value === 1, () => <p>count is 1</p>)
                        .when((value) => value === 2, () => <p>count is 2</p>)
                        .run()
                    }
                    `}
                </pre>
                    </div>
                </div>
            </div>

            <hr/>

            <div>
                <p>普通に書くと</p>

                {data.map((data, index) => (
                    <Fragment key={index}>
                        {data.data.status === 'loading' && <p>loading...</p>}
                        {data.data.status === 'success' && <p>success: {data.data.value}</p>}
                        {data.data.status === 'error' && <p>error: {data.data.error}</p>}
                        {/*  動くけど、条件漏れると怖いよ〜〜 */}
                    </Fragment>
                ))}

                <pre style={{textAlign: 'left'}}>
                    {`
                    {data.map((data, index) => (
                        <Fragment key={index}>
                            {data.data.status === 'loading' && <p>loading...</p>}
                            {data.data.status === 'success' && <p>success: {data.data.value}</p>}
                            {data.data.status === 'error' && <p>error: {data.data.error}</p>}
                            {/*  動くけど、条件漏れると怖いよ〜〜 */}
                        </Fragment>
                    ))}
                    `}
                </pre>
            </div>

            <div>
                <p>ts-patternで書くと</p>

                {data.map((data, index) => (
                    <Fragment key={index}>
                        {match(data)
                            .with({data: {status: 'loading'}}, () => <p>loading...</p>)
                            .with({data: {status: 'success'}}, (result) => <p>success: {result.data.value}</p>)
                            .with({data: {status: 'error'}}, (result) => <p>error: {result.data.error}</p>)
                            .exhaustive()
                        }
                    </Fragment>
                ))}

                <pre style={{textAlign: 'left'}}>
                    {`
                    {data.map((data, index) => (
                        <Fragment key={index}>
                            {match(data)
                                .with({data: {status: 'loading'}}, () => <p>loading...</p>)
                                .with({data: {status: 'success'}}, (result) => <p>success: {result.data.value}</p>)
                                .with({data: {status: 'error'}}, (result) => <p>error: {result.data.error}</p>)
                                .exhaustive()
                            }
                        </Fragment>
                    ))}
                    `}
                </pre>
            </div>
        </>
    )
}

export default App
