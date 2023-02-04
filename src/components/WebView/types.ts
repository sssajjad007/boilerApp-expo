export interface IWebviewProps {
  url: string;
  title: string;
  cache?: boolean;
  loadingImmediately?: boolean;
  fadeDelay?: number;
  isModal?: boolean;
  pageSheet?: boolean;
}
