import NextTopLoader from 'nextjs-toploader';

export default function Toploader() {
    return (
        <NextTopLoader
            color="oklch(0.55 0.18 250)"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing='ease'
            speed={200}
            shadow='0 0 10px #2299DD,0 0 5px #2299DD'
        />
    )
}