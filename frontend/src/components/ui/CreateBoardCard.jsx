export default function CreateBoardCard() {
  return (
    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[250px] hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
        <span className="text-slate-400 text-3xl group-hover:text-blue-600">+</span>
      </div>
      <span className="text-slate-500 font-semibold group-hover:text-blue-600">Create New Board</span>
    </div>
  );
}
