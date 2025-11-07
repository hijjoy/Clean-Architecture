interface ErrorFallbackProps {
  message?: string;
}

export function ErrorFallback({ message = "오류가 발생했습니다." }: ErrorFallbackProps) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}