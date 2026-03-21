# Maintainer: Drew McKenzie <dfmknz@gmail.com>
pkgname=open-borderless
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
source=("git+https://github.com/dfmknz/open-to-borderless.git")
sha256sums=("SKIP")
install="$pkgname.install"

pkgver() {
    cd "$pkgname"
    git describe --tags
}

_reponame="open-to-borderless"

package() {
    install -Dm755 "${srcdir}/${_reponame}/daemon-wrapper.sh" "${pkgdir}/usr/bin/open-borderless-wrapper"
    install -Dm755 "${srcdir}/${_reponame}/daemon.py" "${pkgdir}/usr/bin/open-borderless-daemon"
    install -Dm644 "${srcdir}/${_reponame}/systemd/${pkgname}.service" "${pkgdir}/usr/lib/systemd/user/${pkgname}.service"

    install -d "${pkgdir}/usr/share/${pkgname}/extension"
    cp -r "${srcdir}/${_reponame}/extension/"* "${pkgdir}/usr/share/${pkgname}/extension/"

    install -d "${pkgdir}/usr/share/${pkgname}/docs"
    cp -r "${srcdir}/${_reponame}/docs/"* "${pkgdir}/usr/share/${pkgname}/docs/"
}
