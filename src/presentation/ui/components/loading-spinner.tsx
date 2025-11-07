interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({
  message = "로딩 중...",
}: LoadingSpinnerProps) {
  return <div>{message}</div>;
}
