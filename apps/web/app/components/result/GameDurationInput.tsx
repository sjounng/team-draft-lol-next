interface GameDurationInputProps {
  gameDuration: string;
  onChange: (value: string) => void;
}

export default function GameDurationInput({
  gameDuration,
  onChange,
}: GameDurationInputProps) {
  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
        게임 시간
      </h2>
      <div>
        <label className="block text-sm text-[var(--text-muted)] mb-1">
          게임 시간 (MM:SS)
        </label>
        <input
          type="text"
          value={gameDuration}
          onChange={(e) => onChange(e.target.value)}
          placeholder="25:30"
          className="input w-full md:w-1/3"
          pattern="[0-9]{1,2}:[0-9]{2}"
        />
        <p className="text-xs text-[var(--text-muted)] mt-1">
          예: 25:30 (25분 30초)
        </p>
      </div>
    </div>
  );
}
