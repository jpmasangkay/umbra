/**
 * WeatherIcon – renders a weather condition icon from the
 * OpenWeatherMap icon set. The `src` prop is the icon code
 * returned by the API (e.g. "01d" for clear sky day).
 */
import clsx from "clsx"

type Props = {
  /** Icon code from the OWM API (e.g. "01d", "10n") */
  src: string
  className?: string
}

export default function WeatherIcon({src, className}: Props) {
  return (
    <img 
      className={clsx('size-8', className)}
      src={`https://openweathermap.org/img/wn/${src}.png`}
      alt={src} 
    />
  )
}