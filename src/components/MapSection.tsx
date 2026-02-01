import { ExternalLink } from 'lucide-react'

interface MapSectionProps {
    address: string
    embedUrl: string
    googleMapsLink: string // New prop
}

export const MapSection = ({ address, embedUrl, googleMapsLink }: MapSectionProps) => {
    return (
        <section className="py-20 bg-background">
            <div className="container px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                            Our Location
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight text-foreground">
                            Visit the <span className="text-primary">Manufacturing Hub</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Located in the industrial heart of Jodhpur, our facility is equipped
                            for high-capacity electrical panel production.
                        </p>

                        <div className="p-6 rounded-xl border border-border bg-card shadow-sm group hover:border-primary/50 transition-colors">
                            <p className="font-bold text-foreground">Headquarters</p>
                            <p className="text-muted-foreground mt-2">{address}</p>
                        </div>
                    </div>

                    {/* Interactive Map Wrapper */}
                    <a
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative h-[450px] w-full rounded-2xl overflow-hidden border border-border shadow-2xl block"
                    >
                        {/* Click Overlay */}
                        <div className="absolute inset-0 z-10 bg-primary/0 group-hover:bg-primary/5 transition-colors flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-sm font-bold text-zinc-950">
                                <ExternalLink size={16} className="text-primary" />
                                Open in Google Maps
                            </div>
                        </div>

                        <iframe
                            src={embedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            className="grayscale-[0.3] contrast-[1.1] brightness-[0.95]"
                        />
                    </a>
                </div>
            </div>
        </section>
    )
}