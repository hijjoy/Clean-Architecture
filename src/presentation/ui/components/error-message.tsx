interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div>
      <div>
        <h3>오류가 발생했습니다</h3>
        <p>{error}</p>
        {onRetry && <button onClick={onRetry}>다시 시도</button>}
      </div>
    </div>
  );
}