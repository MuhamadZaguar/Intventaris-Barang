import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    // You can also log the error to an error reporting service here
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow">
            <h2 className="text-2xl font-bold text-red-600">Terjadi kesalahan pada aplikasi</h2>
            <p className="mt-2 text-sm text-gray-600">Silakan cek console untuk detail error.</p>
            <pre className="mt-4 text-xs text-gray-700 overflow-auto bg-gray-100 p-3 rounded">
              {this.state.error?.toString()}
              {this.state.info?.componentStack}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
