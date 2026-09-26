import { Waypoints } from 'lucide-react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-icon" aria-hidden="true">
          <Waypoints size={20} />
        </span>
        <div>
          <h1>Algorithm Visualizer</h1>
          <p className="subtitle">See algorithms come to life.</p>
        </div>
      </div>
    </header>
  );
}
