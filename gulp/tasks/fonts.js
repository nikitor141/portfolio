import fs from 'fs';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
   return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
         }))
      )
      .pipe(fonter({
         formats: ['ttf']
      }))
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
   return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
         })
      ))
      .pipe(fonter({
         formats: ['woff']
      }))
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      .pipe(ttf2woff2())
      .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontsStyle = () => {
   //Файл стилей подключения шрифтов
   let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
   //Проверяем, существуют ли файлы шрифтов
   fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
      if (fontsFiles) {
         //Проверяем, существует ли файл стилей для подключения шрифтов
         if (!fs.existsSync(fontsFile)) {
            //Если файла нет, создаём его
            fs.writeFile(fontsFile, '', cb);
            let newFileOnly;
            for (var i = 0; i < fontsFiles.length; i++) {
               //Записываем подключения шрифтов в файл стилей
               let fontFileName = fontsFiles[i].split('.')[0];
               if (newFileOnly !== fontFileName) {
                  let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                  let fontStyle = fontFileName;
                  fontStyle = (fontStyle.toLowerCase().includes('italic')) ? 'italic' : 'normal';
                  let fontWeight = fontFileName;
                  if (fontWeight.toLowerCase().includes('thin')) {
                     fontWeight = 100;
                  } else if (fontWeight.toLowerCase().includes('extralight')) {
                     fontWeight = 200;
                  } else if (fontWeight.toLowerCase().includes('light')) {
                     fontWeight = 300;
                  } else if (fontWeight.toLowerCase().includes('medium')) {
                     fontWeight = 500;
                  } else if (fontWeight.toLowerCase().includes('semibold')) {
                     fontWeight = 600;
                  } else if (fontWeight.toLowerCase().includes('bold')) {
                     fontWeight = 700;
                  } else if (fontWeight.toLowerCase().includes('extrabold') || fontWeight.toLowerCase().includes('heavy')) {
                     fontWeight = 800;
                  } else if (fontWeight.toLowerCase().includes('black')) {
                     fontWeight = 900;
                  } else {
                     fontWeight = 400;
                  }
                  fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`, cb);
                  newFileOnly = fontFileName;
               }
            }
         } else {
            //Если файл есть, выводим сообщение
            console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!");
         }
      }
   });
   return app.gulp.src(`${app.path.srcFolder}`);
   function cb() { }

}