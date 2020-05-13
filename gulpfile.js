var gulp         = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    spritesmith  = require('gulp.spritesmith'),
    stylus       = require('gulp-stylus'),
    babel        = require('gulp-babel'),


https://project-a0dfe.firebaseapp.com

    gulp.task('stylus', function() {
        return gulp.src('app/spritegenerator/styles/style.sass')
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('app/styles'))
    });


    gulp.task('sprite', function() {
        var spriteData = gulp.src('app/spritegenerator/images/*.*').pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css',
            cssFormat: 'css',
            padding: 2,
            algorithm: 'binary-tree',
            //cssTemplate: 'stylus.template.mustache',
            cssVarMap: function(sprite) {
                sprite.name = 's-' + sprite.name
            }
        }));

   return spriteData.pipe(gulp.dest('app')) // путь, куда сохраняем картинку
    // путь, куда сохраняем стили
});


    gulp.task('sassconcat', function() {
        return gulp.src(['app/sass/**/*.sass'])
        .pipe(concat('main.sass'))
        .pipe(gulp.dest('app/sass'));
    });


gulp.task('sass', function() { // Создаем таск Sass
    return gulp.src('app/sass/main.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
    });


gulp.task('cssconcat', function() {
    return gulp.src(['app/css/**/*.css'])
    .pipe(concat('dist.css'))
    .pipe(gulp.dest('app/css'));
});


gulp.task('cssmin', function() {
    return gulp.src('app/css/dist.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('dist/css')); // Выгружаем в папку app/css
    });


gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app 
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function() { // Опционально для jQuery & Magnific Popup
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        //.pipe(babel())
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
    });


gulp.task('watch', ['browser-sync', 'cssmin', 'scripts'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});


gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});


gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
        	interlaced: true,
        	progressive: true,
        	svgoPlugins: [{removeViewBox: false}],
        	use: [pngquant()]
        })))
        .pipe(gulp.dest('dist')); // Выгружаем на продакшен
    });


gulp.task('build', ['img', 'sass', 'scripts'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
    	'app/css/main.css',
    	'app/css/libs.min.css'
    	])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));
});


gulp.task('clear', function () {
	return cache.clearAll();
})


gulp.task('default', ['watch']);


/*gulp.task('js-test',  function() {
    return gulp.src('app/index.html')
    .pipe(inject.before('</head>', 
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/2.1.0/mocha.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/2.1.0/mocha.js"></script><script>mocha.setup(\'bdd\');</script><script src="https://cdnjs.cloudflare.com/ajax/libs/chai/2.0.0/chai.js"></script><script>var assert = chai.assert;var expect = chai.expect;</script>'))
    .pipe(inject.after('<script type="text/javascript" src="js/main.js"></script>', 
        '<script src="js/99_test.js"></script><div id="mocha"></div><script>mocha.run();</script>'))
    .pipe(rename('index_test.html'))
    .pipe(gulp.dest('app'));
});
*/


gulp.task('babel', function () {
	return gulp.src('src/app.js')
	.pipe(babel())
	.pipe(gulp.dest('dist'));
});


gulp.task('js-clean', function() {
    return del.sync('app/js/**/main.js');
});


gulp.task('js-concat', ['js-clean'], function() {
    return gulp.src(['app/js/**/*.js', '!app/js/**/99_test.js'])
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(gulp.dest('app/js'));
});


gulp.task('lint', function() {
    return gulp.src(['app/**/*.js', '!app/**/main.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
