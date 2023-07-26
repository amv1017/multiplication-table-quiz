export default function Answer({ value, onChange }) {
  return (
    <input
      type="number"
      value={value}
      className="w-24 h-fit bg-slate-400 rounded-lg mx-3 outline-none text-center"
      onChange={onChange}
    />
  )
}
