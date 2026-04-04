const EmptyState = ({ message }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
      {message}
    </div>
  );
};

export default EmptyState;