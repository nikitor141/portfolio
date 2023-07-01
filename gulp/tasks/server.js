export const server = (done) => {
   app.plugins.browsersync.init({
      server: {
         baseDir: `${app.path.build.html}`
      },
      port: 3000,
      browser: "firefox developer edition",
      ghostMode: true,
      notify: false
   })
}