export function ButtonComponent ({
  id,
  title,
  cb
}: { id: string, title: string, cb: Function }) {
  return (
    <button id={id} title={title} onClick={() => cb()}>
      {title}
    </button>
  );
}