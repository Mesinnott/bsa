const gulp = require("gulp")
const fs = require("fs")
const glob = require("glob")
const templates = require("./generator-templates")
const path = './src/components'
gulp.task('componentCompiler', function(callback) {
    let dependencies;
    let componentPath = path + "/**/*-component.js"
    glob( componentPath, {}, function( err, files ) {
        console.log(files)
        if(err) console.error(err);
        let dependencies = files;
        let variableArr = []
        let importCode = dependencies
            .sort((a,b)=>{return a.length-b.length}, 0)
            .map(
                function(fileName, index){
                    fileName = fileName.split(path).join('.')
                    let moduleVarName = `module_${index}`
                    variableArr.push(moduleVarName)
                    return `import { component as ${moduleVarName} } from "${fileName}";`
                }
            )
            .join('\n')
        
        variableArr = JSON.stringify(variableArr)
                        .replace(/"/g, "")
                        .replace(/(,)/g, ",\n\t")
                        .replace('[', '[\n\t')
                        .replace(']', '\n]')
        
        importCode += ` 

// This was written by the componentCompiler task in gulpfile.js
let components = ${variableArr}
const dependencies = components.map(c => { return \`app.components.\${c}\`})
export {
    dependencies
}

`


        fs.writeFile(`${path}/components.js`, importCode, console.log)
        console.log("GULPING")
    })
});

gulp.task('generate', function(){
    if(!process.argv[3].includes("component")) return;
    let name = process.argv[4];
    let fileTypes = ['.scss', '.html', '-component.js']
    new Promise(
        (resolve, reject)=>{
            fs.mkdir(`${path}/${name}`, (err)=>{
                resolve()
            })
        }
    )
    .then(
        function(){
            return Promise.all(
                fileTypes.map(
                    function(fileType){
                        return new Promise(
                            (resolve, reject)=>{
                                let template = fileType.includes(".js")? templates.component(name) : ''
                                fs.writeFile(`${path}/${name}/${name}${fileType}`, template,
                                    function(err){
                                        if(err) throw err;
                                    }
                                )
                            }
                        )
                    }
                )
            )
        }
    )
    .then(
        (response)=>{
            console.log("Generation Complete." + response? response : "")
        }
    )
    .catch(
        error=>{
            console.error(error)
        }
    )
})

gulp.task('default', function(){
    gulp.start('componentCompiler');
    gulp.watch(path + "/**/*-component.js", ['componentCompiler'])
})