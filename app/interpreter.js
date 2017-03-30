
// command interpreter

var antlr4 = require('antlr4');
var TodoLexer = require('./generated-parser/TodoLexer.js');
var TodoParser = require('./generated-parser/TodoParser.js');
var TodoListenerCustom = require('./generated-parser/TodoListenerCustom.js');

module.exports = function (user,command, req,res) {
	console.log("Trying to understand  "+command);
   
    var input = command;
    var chars = new antlr4.InputStream(input);
    var lexer = new TodoLexer.TodoLexer(chars);
    var tokens  = new antlr4.CommonTokenStream(lexer);
    var parser = new TodoParser.TodoParser(tokens);
    parser.buildParseTrees = true;
    var listener = new TodoListenerCustom.TodoListenerCustom();
    var tree = parser.request();
    console.log("Parsed: "+ tree.toStringTree());
    
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener,tree);
    var response = listener.getResult();
    
    if (response.verb=="SHOW" ) {
    	if (response.object=="todo") {
    		response.page="todos";
    	} else if (response.object=="group") {
    		response.page="groups";
    	}

    }
    if (response.verb=="ADD" ) {
    	if (response.object=="todo") {
    		response.page="newtask";
    	} else if (response.object=="group") {
    		response.page="newgroup";
    	}

    }
    if (response.verb=="INVITE" ) {
        
            response.page="invite";

    }
    //console.log("Parsed: "+ JSON.stringify(response));
	res.json(response);
   }


      
         
