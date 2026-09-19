export function AppErrorComponent({ error }: { error: unknown }) {
  const msg = error instanceof Error ? error.message : String(error);
  return (
    <div style={{ padding: 24, fontFamily: "monospace", background: "#0b1014", color: "#e8e4d4", minHeight: "100vh" }}>
      <h1 style={{ color: "#d4452a" }}>IRON FRONTLINE</h1>
      <p>{msg}</p>
    </div>
  );
}
