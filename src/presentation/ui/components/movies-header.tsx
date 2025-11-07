interface MoviesHeaderProps {
  loading: boolean;
  onRefresh?: () => void;
}

export function MoviesHeader({ loading, onRefresh }: MoviesHeaderProps) {
  return (
    <div>
      <h2>인기 영화</h2>
      <button onClick={onRefresh} disabled={loading}>
        새로고침
      </button>
    </div>
  );
}
