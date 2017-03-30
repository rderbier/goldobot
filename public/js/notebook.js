notebook.js
    match=command.match(/(?:[\w,\s]*)new task/i);
        if(match!=null) {
           getit=true;
           $location.path("/newtask");
        }
    match=command.match(/(?:[\w,\s]*)have to ([\w,\s]*)/i);
    if(match!=null) {
           getit=true;
           $rootScope.newTask={ title: match[1].trim(), type: 'reminder'}

           
           $location.path("/newtask");
        }
    /*
    * invite
    */
    match=command.match(/(?:[\w,\s]*)(invite)(\s[\w]*)(?:(?: to (?:(?:join )*)(?:(?:group )*)*)*)([\w,\s]*)/i);
    if(match!=null) {
           getit=true;
           $rootScope.invite={ alias: match[2].trim(), groupname: match[3].trim()}

           
           $location.path("/invite");
        } 