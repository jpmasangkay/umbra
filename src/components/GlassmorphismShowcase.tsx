/**
 * GlassmorphismShowcase – demonstrates the complete card system
 * with gradient borders, backdrop blur, and hover effects.
 */
import Card from './cards/Card'
import { Cloud, Droplets, Wind, Eye, Gauge, AlertCircle } from 'lucide-react'

export default function GlassmorphismShowcase() {
  const showcaseCards = [
    {
      title: 'Current Weather',
      icon: Cloud,
      content: '22°C',
      description: 'Partly Cloudy',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      title: 'Humidity',
      icon: Droplets,
      content: '65%',
      description: 'Moderate',
      color: 'from-emerald-400 to-teal-400'
    },
    {
      title: 'Wind Speed',
      icon: Wind,
      content: '12 km/h',
      description: 'Light breeze',
      color: 'from-indigo-400 to-blue-400'
    },
    {
      title: 'Visibility',
      icon: Eye,
      content: '10 km',
      description: 'Excellent',
      color: 'from-purple-400 to-pink-400'
    },
    {
      title: 'Pressure',
      icon: Gauge,
      content: '1013 mb',
      description: 'Stable',
      color: 'from-orange-400 to-amber-400'
    },
    {
      title: 'Alerts',
      icon: AlertCircle,
      content: 'None',
      description: 'All clear',
      color: 'from-green-400 to-emerald-400'
    }
  ]

  return (
    <div className="w-full space-y-8 py-6">
      {/* Header */}
      <div className="space-y-2 px-4 lg:px-6">
        <h1 className="text-3xl font-bold tracking-tight">Glassmorphism Card System</h1>
        <p className="text-muted-foreground">
          Frosted glass aesthetic with gradient borders, backdrop blur effects, and smooth hover animations
        </p>
      </div>

      {/* Feature Description */}
      <div className="px-4 lg:px-6">
        <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong>Backdrop Blur:</strong> 10px frosted glass effect</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong>Gradient Borders:</strong> Animated color transitions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong>Hover Effects:</strong> Smooth lift and glow animations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong>Dark Mode:</strong> Optimized for light and dark themes</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Weather Cards Grid */}
      <div className="px-4 lg:px-6">
        <h2 className="text-lg font-semibold mb-4">Weather Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {showcaseCards.map((item) => {
            const Icon = item.icon
            return (
              <Card 
                key={item.title}
                title={item.title}
                glassmorphic={true}
                childrenClassName="flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.content}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-20`}>
                    <Icon className="w-6 h-6 text-muted-foreground opacity-60" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Comparison Section */}
      <div className="px-4 lg:px-6">
        <h2 className="text-lg font-semibold mb-4">Card Variants</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Glassmorphic variant */}
          <Card
            title="Glassmorphic Card"
            glassmorphic={true}
            childrenClassName="space-y-3"
          >
            <p className="text-sm text-muted-foreground">
              This card features the full glassmorphism treatment with gradient borders, backdrop blur, and hover effects.
            </p>
            <div className="flex gap-2 pt-2">
              <div className="h-2 flex-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-50"></div>
              <div className="h-2 flex-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-50"></div>
            </div>
          </Card>

          {/* Standard variant */}
          <Card
            title="Standard Card"
            glassmorphic={false}
            childrenClassName="space-y-3"
          >
            <p className="text-sm text-muted-foreground">
              This card uses the traditional design with solid background and border. Useful for content that needs more contrast.
            </p>
            <div className="flex gap-2 pt-2">
              <div className="h-2 flex-1 bg-accent rounded-full opacity-50"></div>
              <div className="h-2 flex-1 bg-accent rounded-full opacity-50"></div>
            </div>
          </Card>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="px-4 lg:px-6">
        <h2 className="text-lg font-semibold mb-4">Hover to See Effects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            title="Lift Effect"
            glassmorphic={true}
            childrenClassName="space-y-2"
          >
            <p className="text-sm text-muted-foreground">
              Hover over this card to see the smooth lift animation and enhanced glow effect.
            </p>
            <div className="text-xs text-muted-foreground/60 italic">Hover to activate</div>
          </Card>

          <Card
            title="Gradient Border"
            glassmorphic={true}
            childrenClassName="space-y-2"
          >
            <p className="text-sm text-muted-foreground">
              The gradient border animates smoothly, creating a dynamic glow effect around the card.
            </p>
            <div className="text-xs text-muted-foreground/60 italic">Always animated</div>
          </Card>
        </div>
      </div>
    </div>
  )
}
