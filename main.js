var fs = require('fs');
var child_process = require('child_process');
var readline = require('readline');

var date = new Date(),
	year = date.getFullYear(),
	month = date.getMonth()+1,
	day = date.getDate();

var setDate1 = function(){
	var str1 = year+'-'+month+'-'+day;
	return str1;
}

var setDate2 = function(){
	var str2 = year+month+day;
	return str2;
}

console.log(date);

function copy(src, dst, filename) {
	if(!fs.existsSync(dst)){
		child_process.execSync('mkdir -p '+dst);
    }
    fs.writeFileSync(dst+'/'+filename, fs.readFileSync(src));
}
function readFile(fileName){
	if(fs.existsSync(fileName)) return fs.readFileSync(fileName,"utf-8");
};

function rexpFile(fileName,oldMsg,newMsg){
	var data = readFile(fileName);
	var exc = new RegExp(oldMsg,"g");
	if(exc.test(data)){
		console.log("已发现目标，等待替换~~~");
		data = data.replace(exc,newMsg);
		fs.writeFileSync(fileName, data);	
		console.log('目标文件替换完毕');
	}
}

function main(argv) {
	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
	rl.question('请输入文件夹名称 ', (answer) => {
	  // TODO: Log the answer in a database
	  var filename = answer;
	  if(answer ==''){
	  	filename=setDate1();
	  }
	  copy('./src/js/index.js', './dist/js','index.js');
	  copy('./src/index.html', './dist','index.html');

	  rexpFile('./dist/js/index.js','<%filename--%>',filename);
	  rexpFile('./dist/index.html','<%filename--%>',filename);

	  console.log('文件名已经替换:', answer);

	  rl.question('是否需要配置share信息（y/n)? ', (answer) => {
	  // TODO: Log the answer in a database
		  switch(answer){
		  	case 'y'||'Y':{
		  		console.log("yes");
		  		rl.question('请输入分享标题：', (answer) => {
					rexpFile('./dist/js/index.js','<%sharetitle--%>',answer);
					rexpFile('./dist/index.html','<%sharetitle--%>',answer);
					rl.question('请输入分享内容：', (answer) => {
						rexpFile('./dist/js/index.js','<%sharecontent--%>',answer);
						rexpFile('./dist/index.html','<%sharecontent--%>',answer);
			  		});
		  		});
		  		
		  		break;
		  	}
		  	case 'n'||'N':{
		  		console.log('no');
		  		break;
		  	}
		  }
		  
		  // rl.close();
		});
	});    
}

main(process.argv.slice(2));