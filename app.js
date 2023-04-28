const  http =   require ( 'http' ) ;
const fs = require('fs');
//curl nos ayuda a manipular protocolos a partir de la terminal 
// HTTP => (request, response)
//postaman probar peticiones con algun protocolo 

http.createServer((request, response)=>{
    const file = request.url == '/'? './WWW/index.html' : `./WWW${request.url}`;

    if(request.url == '/login'){
        let data = [];
        request.on("data",value =>{
            data.push(value);
        }).on("end",()=>{
            let params = Buffer.concat(data).toString();
            console.log(params);
            response.write(params);
            response.end();
        });
    //patron del observador: coloca un objeto listener que esta a la escucha de los eventos y reaccionando a los diferentes cambios que pueda tener un objeto 
   }
    
    //const data = fs.readFileSync('./WWW/index.html');
    fs.readFile(file, (err, data)=>{
        if(err){
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found");
            response.end();
        }
        else{
            
            const extension = request.url.split('.').pop
            switch (extension) {
                case "txt":
                    response.writeHead(200, {"Content-Type": "text/plain"});
                    response.write(data);
                    response.end();
                    break;
                case "html":
                    response.writeHead(200, {"Content-Type": "text/html"});
                    break;
                case "css":
                    response.writeHead(200, {"Content-Type": "text/css"});
                    break;
                case "ico":
                    response.writeHead(200, {"Content-Type": "image/x-icon"})
                    break;
                case "js":
                    response.writeHead(200, {"Content-Type": "text/javascript"})
                    break;
                case "jpeg":
                    response.writeHead(200, {"Content-Type": "image/jpeg"})

                default:
                    response.writeHead(200, {"Content-Type": "text/html"});
                    break;
            }
            
            response.write(data);
            response.end();
    

        }
       

    })
    
}).listen(4444);