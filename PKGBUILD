# Maintainer: Drew McKenzie <dfmknz@gmail.com>
pkgname=open-borderless
pkgver=1.2
pkgrel=1
pkgdesc="Open links in borderless windows with click + modifier keys on Hyprland"
arch=("any")
url="https://github.com/dfmknz/open-to-borderless"
license=("MIT")
depends=("python" "hyprland")
optdepends=(
    "chromium: Default browser for borderless windows"
    "google-chrome: Alternative browser"
)
source=("https://github.com/dfmknz/open-to-borderless/archive/refs/tags/v${pkgver}.tar.gz")
sha256sums=("SKIP")
install="$pkgname.install"

package() {
    install -Dm755 "${srcdir}/open-to-borderless-${pkgver}/daemon-wrapper.sh" "${pkgdir}/usr/bin/open-borderless-wrapper"
    install -Dm755 "${srcdir}/open-to-borderless-${pkgver}/daemon.py" "${pkgdir}/usr/bin/open-borderless-daemon"
    install -Dm644 "${srcdir}/open-to-borderless-${pkgver}/systemd/${pkgname}.service" "${pkgdir}/usr/lib/systemd/user/${pkgname}.service"

    install -d "${pkgdir}/usr/share/${pkgname}/extension"
    cp -r "${srcdir}/open-to-borderless-${pkgver}/extension/"* "${pkgdir}/usr/share/${pkgname}/extension/"

    install -d "${pkgdir}/usr/share/${pkgname}/docs"
    cp -r "${srcdir}/open-to-borderless-${pkgver}/docs/"* "${pkgdir}/usr/share/${pkgname}/docs/"
}
