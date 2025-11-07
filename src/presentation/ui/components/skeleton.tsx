interface SkeletonProps {
  message?: string;
}

export function Skeleton({ message = "불러오는 중..." }: SkeletonProps) {
  return <div>{message}</div>;
}
