export interface INewVersionProps {
  onIgnoreHandler: () => void;
  onRetry: () => void;
  loading: boolean;
  updateUrl: string[];
}
