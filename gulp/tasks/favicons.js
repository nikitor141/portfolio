export const favicons = () => {
   return app.gulp.src(app.path.src.favicons)
      .pipe(app.gulp.dest(app.path.buildFolder))
}