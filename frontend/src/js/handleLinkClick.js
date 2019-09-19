import { navigate } from 'gatsby'

export function handleLinkClick(event, link) {
    event.preventDefault();

    const element = event.currentTarget;
    const href = element.getAttribute('href')
    const siteUrl = 'thelionking.co.uk'
    const currentUrl = window.location.pathname

    console.log(link)

    // If href is a for the site itself exit
    if (href.indexOf(siteUrl) > 0 || (href.substring(0, 1) === '/' && href.substring(0, 2) !== '//')) {
        // Proceed with link as normal
        navigate(href);
    } else {

        let atg = false
        let atgBristol = false
        let atgEdinburgh = false
        let atgWales = false
        let atgBradford = false

        if (link.classList.contains('interstitial-timed')) {
            atg = true
        } else if (link.classList.contains('interstitial-timed-bristol')) {
            atgBristol = true
        } else if (link.classList.contains('interstitial-timed-wales')) {
            atgWales = true
        } else if (link.classList.contains('interstitial-timed-edinburgh')) {
            atgEdinburgh = true
        } else if (link.classList.contains('interstitial-timed-bradford')) {
            atgBradford = true
        }

        // Redirect to interstitial with correct state
        navigate("/interstitial/", {
            state: {
                href: href,
                previousUrl: currentUrl,
                atg,
                atgBristol,
                atgEdinburgh,
                atgWales,
                atgBradford
            }
        });
    }
}