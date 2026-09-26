export default function OperationPanel({ message }: { message: string }) {
  return (
    <div className="panel operation-panel" role="status" aria-live="polite">
      <span className="operation-dot" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
