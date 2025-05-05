import { ErrorBoundary } from 'react-error-boundary';

function FallbackComponent({ error, resetErrorBoundary }) {
    return (
        <div role="alert">
            <p>문제가 발생했습니다:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>다시 시도</button>
        </div>
    )
}