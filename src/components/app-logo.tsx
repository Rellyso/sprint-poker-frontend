import { cx } from 'class-variance-authority'

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg'
}

export function AppLogo({ size = 'md' }: AppLogoProps) {
  return (
    <div className={'flex items-center gap-2'}>
      <div
        className={cx(
          size === 'sm' && 'text-lg',
          size === 'md' && 'text-2xl',
          size === 'lg' && 'text-4xl',
          'text-zinc-600 font-bold'
        )}
      >
        <span className="text-zinc-900">Sprint</span>Poker
      </div>
    </div>
  )
}
