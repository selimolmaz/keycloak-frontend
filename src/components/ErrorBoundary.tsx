import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-8">
          <div className="max-w-2xl w-full border-8 border-black bg-white p-12 text-center">
            <div className="text-8xl font-black mb-8 text-red-600">!</div>
            <h1 className="text-5xl font-black mb-6 tracking-tighter">
              BİR HATA OLUŞTU
            </h1>
            <p className="font-mono text-sm text-gray-600 mb-8">
              Üzgünüz, beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin.
            </p>
            {this.state.error && (
              <div className="mb-8 p-4 bg-zinc-100 border-2 border-zinc-300 text-left">
                <p className="font-mono text-xs text-red-600 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <button
              onClick={() => window.location.href = '/'}
              className="px-12 py-6 bg-black text-white font-black text-lg tracking-wide hover:bg-zinc-800 transition-all"
            >
              ANA SAYFAYA DÖN
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;