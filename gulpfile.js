var gulp=require('gulp');
var sass=require('gulp-sass');
var server=require('gulp-webserver');
var mincss=require('gulp-clean-css');
var uglifys=require('gulp-uglify');
var concat=require('gulp-concat');
var url=require('url');
var fs=require('fs');
var path=require('path');

gulp.task('scss',function(){
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('js',function(){
    return gulp.src('./src/js/*.js')
            .pipe(concat('config.js'))
            .pipe(uglifys())
            .pipe(gulp.dest('./src/jst'))
})

gulp.task('server',function(){
    return gulp.src('src')
        .pipe(server({
            port:'3000',
            liverload:true,
            middleware:function(req,res,next){
                var pathname=url.parse(req.url).pathname;
                if(pathname === '/favicon.ico'){
                    return res.end()
                }
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))

            }
        }))
})

gulp.task('watch',function(){
     return gulp.watch("./src/scss/*.scss",gulp.series('scss'))
})

gulp.task('default',gulp.series('js','server','watch'))


gulp.task('css',function(){
    return gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./dist/css'))
})
gulp.task('jss',function(){
    return gulp.src('./src/jst/config.js')
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('build',gulp.series('jss','css'))
