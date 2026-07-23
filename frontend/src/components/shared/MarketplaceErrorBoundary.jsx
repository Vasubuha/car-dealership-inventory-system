import React from 'react';
import { ShieldAlert, RotateCcw } from 'lucide-react';

export default class MarketplaceErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Marketplace Module Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8 text-center bg-slate-50">
          <div className="max-w-md p-8 bg-white border border-slate-200 rounded-3xl shadow-lg flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-900">
              Marketplace Section Unavailable
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              An unexpected error occurred while rendering this module. Rest of the marketplace navigation remains fully operational.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Marketplace</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
