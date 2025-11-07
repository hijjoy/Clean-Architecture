interface LoadMoreButtonProps {
  hasNextPage: boolean;
  loading: boolean;
  onLoadMore?: () => void;
}

export function LoadMoreButton({
  hasNextPage,
  loading,
  onLoadMore,
}: LoadMoreButtonProps) {
  if (loading) {
    return null;
  }

  if (hasNextPage) {
    return (
      <div>
        <button onClick={onLoadMore}>더 보기</button>
      </div>
    );
  }

  return (
    <div>
      <p>모든 영화를 불러왔습니다.</p>
    </div>
  );
}
