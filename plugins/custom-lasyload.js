export default async ({ app }) => {
  await app.router.afterEach((to, from) => {
    window.addEventListener('scroll', function oneway(e) {
      if (window.pageYOffset >= 10) {
        const replaseImage = (target, from, to) => {
          Array.prototype.forEach.call(
            document.querySelectorAll(target),
            (img) => {
              img.setAttribute(to, img.getAttribute(from))
              img.onload = () => {
                img.removeAttribute(from)
              }
            }
          )
        }
        replaseImage('img[data-src]', 'data-src', 'src')
        replaseImage('source[data-srcset]', 'data-srcset', 'srcset')
        window.removeEventListener('scroll', oneway)
      }
    })
  })
}
