import { cx } from "class-variance-authority";

interface CardProps {
  isSelected?: boolean;
  disabled?: boolean;
  style?: {
    borderColor?: string;
  };
  onClick?: () => void;
  children?: React.ReactNode;
}

export function VoteCard({
  isSelected = false,
  disabled = false,
  style,
  children,
  ...props
}: CardProps) {
  return (
    <button
      {...props}
      className={cx(
        'flex flex-col items-center justify-center w-10 h-14 text-2xl font-bold border-2 transition-transform duration-100 ease-out',
        isSelected ? 'transform -translate-y-2.5' : '',
        'bg-white text-black border-gray-300',
        isSelected
          ? 'border-primary'
          : '',
        disabled
          ? 'text-gray-400 border-gray-300 bg-gray-50 cursor-not-allowed'
          : 'cursor-pointer',
        'rounded-lg',
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}