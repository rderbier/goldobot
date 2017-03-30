// Define a grammar called Todo
grammar Todo;
// Parser Rules
// antlr4 -Dlanguage=JavaScript Todo.g4
 
request :   injunction | invite | indirectInjunction  | query | statement EOF; 
injunction : polite? vi=verb? ME?  (query | ((det | A )? object?)) ;
invite : polite? INVITE who=text (((TO 'join'?)|'in') 'group' ingroup=text)? ;
verb : SHOW | ADD | DELETE | HELP ;
object : todo | group;
todo : tasklist text? ;
query : (WQ (HAVEQ|IS)?  IN?) MY? todo ;
tasklist : TASK LIST? ;
group : 'group' (NAMED? groupname=text)? ;


indirectInjunction :  polite? ASK alias=text TO aliasdo=text  ;
polite : 'could you' | 'can you' | 'will you'| 'please' ;

statement : have haveobject=text 	# TaskStatement  
  | text IS IN det? text 			# IsInStatement
  | text 							# UnknowStatement
  ;

have : HAVE | MUST | NEED ;
det : MY | 'the' ;
text : WORD (WORD)* ;

// Lexer Rules

ASK : 'ask' ;
TASK : 'todo' | 'to do' | 'task' | 'tasks' ;
MUST: 'must' ;
NEED: 'need to' ;
HAVE : 'i have to'| 'have to' ;
HAVEQ:  'have i' | 'have i got';
IN : 'in' ;
TO : 'to' ;
NAMED : 'named' | 'called' | 'with title' | 'with name' ;

LIST : 'list' ;
A : 'a' | 'an' ;
 
WQ : 'what' | 'whats';
// verbs
SHOW: 'show' | 'give' | 'display' | 'list' | 'tell' ;
ADD : 'create' | 'add' ; 
DELETE : 'remove' | 'delete' ;
INVITE : 'invite';
HELP: 'help' ;

ME: 'me' ;
MY: 'my' ;
IS: 'is' | 'will be' ;
 


WORD : ('a'..'z')+ ;
 
WHITESPACE : ( '\t' | ' ' | '\r' | '\n'| '\u000C' )+ -> skip ;